<template>
    <div class="app-container">
        <RouterView />
        <nav>
            <ul>
                <li>
                    <RouterLink to="/revisit">Revisit</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">Share</RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="scss">
.app-container {
    min-height: 100dvh;
    min-height: 100vh;
    width: 100%;
    nav {
        background: var(--color-background);
        border-top: 1px solid var(--color-border);
        position: fixed;
            bottom: 0;
            left: 0;
        width: 100%;
        ul {
            display: flex;
                align-items: center;
                justify-content: space-around;
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                color: var(--color-text);
                a {
                    color: inherit;
                    line-height: 3;
                    text-decoration: none;
                    &.router-link-active {
                        font-weight: bolder;
                        text-transform: uppercase;
                    }
                }
            }
        }
    }
}
</style>
