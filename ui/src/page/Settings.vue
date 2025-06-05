<script setup>
    import db from '@/singleton/database';

    const download = () => {
        db.getAll().then((data) => {
            if (!data || !data.length) {
                console.error('No data available for download');
                return
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
</script>

<template>
    <div class="container-settings">
        <h1>
            Settings
        </h1>
        <button @click="download">
            Download Backup
        </button>
    </div>
</template>

<style lang="scss" scoped>
.container-settings {
    padding: 1rem;
}
</style>
