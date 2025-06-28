<script setup>
    const isPwa = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone;
</script>

<template>
    <div class="app-container"
        :class="{ pwa: isPwa }"
    >
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
        <div id="pwa-spacer" v-if="isPwa"></div>
    </div>
</template>

<style lang="scss">
.app-container {
    --nav-height: 3rem;
    padding: 0 0 var(--nav-height);
    width: 100%;
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
.app-container.pwa {
    --pwa-spacer-height: 34px;
    padding: 0 0 calc(var(--nav-height) + var(--pwa-spacer-height));
    nav#nav-bottom {
        position: fixed;
            bottom: var(--pwa-spacer-height);
    }
    div#pwa-spacer {
        background: var(--color-background);
        height: var(--pwa-spacer-height);
        position: fixed;
            bottom: 0;
            left: 0;
        width: 100%;
    }
}
</style>
