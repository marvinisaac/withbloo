<script setup>
    import { ref } from 'vue';
    import db from '@/singleton/database';

    const download = () => {
        db.getAll().then((data) => {
            if (!data || !data.length) {
                console.error('No data available for download');
                alert('No data available for download');
                return;
            };

            const header = ['createdAt', 'emotion'];
            const rows = data.map(entry =>
                [entry.createdAt, entry.emotion]
                    .map(field => `"${String(field).replace(/"/g, '""')}"`)
                    .join(',')
            );
            const csvContent = [header.join(','), ...rows].join('\r\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const formattedDate = (new Date())
                .toISOString()
                .replaceAll(':', '-');
            const filename = `withbloo-backup-${formattedDate}.csv`;
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
    
    const restore = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.log('No file selected for import.');
            alert('No file selected for import.');
            return;
        }

        const text = await file.text();
        const lines = text.trim().split('\r\n');
        const [header, ...rows] = lines;
        const columns = header.split(',')
            .map(h => h.replace(/"/g, '').trim());

        const restoreCount = ref(0);
        for (const row of rows) {
            if (!row.trim()) continue;
            const values = row.split(',')
                .map(v => v.replace(/^"|"$/g, '')
                .replace(/""/g, '"'));
            const entry = {};
            columns.forEach((field, index) => {
                entry[field] = values[index];
            });
            const restoredId = await db.add(entry);
            if (restoredId) {
                restoreCount.value++;
            } else {
                console.error('Failed to restore entry:', entry);
            }
        }
        alert(`Imported ${restoreCount.value} out of ${rows.length} entries successfully.`);
        event.target.value = '';
    };

    const fileInput = ref(null);
    const triggerRestore = () => {
        fileInput.value.click();
    };
</script>

<template>
    <div class="container-settings">
        <h1>
            Settings
        </h1>
        <button @click="download">
            Download Backup
        </button>
        <br/>
        <button @click="triggerRestore">
            Restore Backup
        </button>
        <input
            type="file"
            ref="fileInput"
            accept=".csv,text/csv"
            style="display: none"
            @change="restore"
        />
    </div>
</template>

<style lang="scss" scoped>
.container-settings {
    padding: 1rem;
}
</style>
