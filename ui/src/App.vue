<script setup>
    import { onMounted, ref } from 'vue';

    const isOnline = ref(true);
    const isIosPwa = window.matchMedia('(display-mode: standalone)').matches
        && /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const updateConnectionStatus = () => {
        isOnline.value = navigator.onLine;
    }

    onMounted(async () => {
        updateConnectionStatus();
    })

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
</script>

<template>
    <div class="app-container"
        :class="{ pwa: isIosPwa, offline: !isOnline }"
    >
        <div id="offline-spacer">
            <p>Offline Mode</p>
        </div>
        <RouterView />
        <nav id="nav-bottom">
            <ul>
                <li>
                    <RouterLink to="/revisit">Revisit</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">Share</RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings">Settings</RouterLink>
                </li>
            </ul>
        </nav>
        <div id="pwa-spacer" v-if="isIosPwa"></div>
    </div>
</template>

<style lang="scss">
.app-container {
    --nav-height: 3rem;
    padding: 0 0 var(--nav-height);
    width: 100%;
    div#offline-spacer {
        display: none;
    }
    nav {
        background: var(--color-background);
        height: var(--nav-height);
        width: 100%;
        z-index: 1000;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                color: var(--color-text);
                a {
                    color: inherit;
                    display: inline-block;
                    height: var(--nav-height);
                    line-height: var(--nav-height);
                    text-align: center;
                    text-decoration: none;
                    width: 100%;
                    &.router-link-active {
                        background: var(--color-text);
                        color: var(--color-background);
                        font-weight: bolder;
                        text-transform: uppercase;
                    }
                }
            }
        }
    }
    nav#nav-bottom {
        border-top: 1px solid var(--color-border);
        position: fixed;
            bottom: 0;
            left: 0;
        ul {
            display: flex;
                align-items: center;
            li {
                width: calc(100% / 3);
            }
        }
    }
}
.app-container.offline {
    --offline-banner-height: 1.5rem;
    padding-top: var(--offline-banner-height);
    div#offline-spacer {
        background: red;
        color: var(--color-text);
        display: block;
        position: fixed;
            left: 0;
            top: 0;
        text-align: center;
        width: 100%;
        p {
            font-size: 0.75rem;
            font-weight: bolder;
            line-height: 2;
            text-transform: uppercase;
        }
    }
}
.app-container.pwa {
    --ios-bottom: 20px;
    nav#nav-bottom {
        border-bottom: 1px solid var(--color-border);
        position: fixed;
            bottom: var(--ios-bottom);
    }
    div#pwa-spacer {
        background: var(--color-background);
        height: var(--ios-bottom);
        position: fixed;
            bottom: 0;
            left: 0;
        width: 100%;
    }
}
</style>
