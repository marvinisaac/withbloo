<script setup>
    import { ref } from 'vue';
    import { transformToData } from '@/singleton/imageProcessor';
    import JSZip from 'jszip';
    import db from '@/singleton/database';
    
    const fileInput = ref(null);

    const getImageData = async(zip, image) => {
        if (!image) {
            return null;
        }

        const file = await zip.file(`images/${image}`).async('blob');
        return await transformToData(file, 1);
    }

    const restore = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected for import.');
            return;
        }

        const zip = await JSZip.loadAsync(file);
        const entriesFile = zip.file('entries.json');
        if (!entriesFile) {
            alert('entries.json not found in ZIP.');
            return;
        }

        const entriesText = await entriesFile.async('string');
        let entries;
        try {
            entries = JSON.parse(entriesText);
        } catch (e) {
            alert('Invalid entries.json format.');
            return;
        }

        let restoreCount = 0;
        for (const entry of entries) {
            const result = await db.entry.add({
                createdAt: entry.createdAt,
                emotion: entry.emotion,
                image: await getImageData(zip, entry?.image),
                journal: entry.journal,
            });
            if (result) restoreCount++;
        }
        alert(`Imported ${restoreCount} out of ${entries.length} entries successfully.`);
        event.target.value = '';
    };

    const triggerRestore = () => {
        fileInput.value.click();
    };
</script>

<template>
    <div class="restore-container">
        <button @click="triggerRestore" type="button">
            Restore Backup
        </button>
        <input
            @change="restore"
            accept=".zip,application/zip"
            ref="fileInput"
            title="zipRestore"
            type="file"
        />
    </div>
</template>

<style lang="scss" scoped>
    input {
        display: none;
    }
</style>
