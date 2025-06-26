<script setup>
    import { onMounted, ref } from 'vue';
    import db from '@/singleton/database';

    const download = () => {
        db.getAll().then((data) => {
            if (!data || !data.length) {
                console.error('No data available for download');
                alert('No data available for download');
                return;
            };

            const header = ['createdAt', 'emotion', 'journal'];
            const rows = data.map(entry =>
                [entry.createdAt, entry.emotion, entry.journal]
                    .map(field => field === undefined ? '' : field)
                    .map(field => field === null ? '' : field)
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

    const triggerRestore = () => {
        fileInput.value.click();
    };

    const fileInput = ref(null);
    const storage = {
        available: ref(null),
        used: ref(null),
    };

    onMounted(async () => {
        if (navigator.storage && navigator.storage.estimate) {
            const estimate = await navigator.storage.estimate();
            const used = estimate.usage || 0;
            const quota = estimate.quota || 0;
            const toMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2) + 'MB';
            const toGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
            const display = (bytes) => bytes > 1024 * 1024 * 1024 ? toGB(bytes) : toMB(bytes);
            storage.available.value = display(quota);
            storage.used.value = display(used);
        }
    });
</script>

<template>
    <div class="container-settings">
        <h1>
            Settings
        </h1>

        <h2>Backup</h2>
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

        <h2>Storage</h2>
        <p>{{ storage.used }} / {{ storage.available }}</p>
    </div>
</template>

<style lang="scss" scoped>
.container-settings {
    padding: 0 1rem;
    h1 {
        border-bottom: 1px solid var(--color-border);
    }
    h2 {
        margin-top: 1em;
    }
}
</style>
