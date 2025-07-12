<script setup>
    import { onMounted, ref } from 'vue';
    import Backup from '@/component/Backup.vue';
    import Restore from '@/component/Restore.vue';
    
    const formatTimestamp = (t) => {
        const date = new Date(t * 1000);
        const year = date.getFullYear();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        return `${year} ${month} ${day} ${hour}:${min}`;
    }

    const buildDate = import.meta.env.VITE_BUILD_DATE;
    const buildVersion = import.meta.env.VITE_BUILD_VERSION;
    const cachedFileCount = ref(0);
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
        
        const cache = await caches.open('withbloo-cache');
        const cachedKeys = await cache.keys();
        cachedFileCount.value = cachedKeys.length;
    });
</script>

<template>
    <div class="container-settings">
        <h1>
            Settings
        </h1>

        <h2>Backup</h2>
        <div class="button-container">
            <Backup />
            <Restore />
        </div>

        <h2>Debug</h2>
        <p>Cached files:
            <span>
                {{ cachedFileCount }}
            </span>
        </p>
        <p>Storage:
            <span>
                {{ storage.used }} / {{ storage.available }}
            </span>
        </p>
        <p>Version:
            <span>
                v0.0.{{ buildVersion.slice(0, 6) }} ({{ formatTimestamp(buildDate) }})
            </span>
        </p>
    </div>
</template>

<style lang="scss" scoped>
.container-settings {
    padding: 0 1rem;
    .button-container {
        display: flex;
            gap: 1rem;
        button,
        :deep(button) {
            background: transparent;
            border: var(--color-border) 1px solid;
            border-radius: 0.5rem;
            color: inherit;
            cursor: pointer;
            font-size: inherit;
            line-height: 2;
            padding: 0 0.5rem;
            text-align: center;
        }
    }
    h1 {
        border-bottom: 1px solid var(--color-border);
    }
    h2 {
        margin-top: 1em;
    }
    p {
        span {
            font-family: 'Courier New', Courier, monospace;
            font-size: 14px;
        }
    }
}
</style>
