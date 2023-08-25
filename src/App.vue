<template>
    <header>
        <div class="nav-row">
            <div class="limiter main">
                <RouterLink to="/" style="padding: 0">
                    <img src="/images/iodine_logo.svg" alt="Iodine UI Logo" title="Iodine UI home" class="logo">
                    Iodine UI
                </RouterLink>
    
                <div class="spacer"></div>
    
                <RouterLink to="/about">Installation</RouterLink>
                <RouterLink to="/about">Get Started</RouterLink>
                <RouterLink to="/environment">Environment</RouterLink>
                <RouterLink to="/components">Components</RouterLink>

                <div class="divider"></div>
    
                <button class="theme-toggle" :title="`Switch to ${theme === 'dark' ? 'light theme' : 'dark theme'}`" @click="toggleTheme">
                    <div class="icon" v-show="theme === 'dark'">light_mode</div>
                    <div class="icon" v-show="theme === 'light'">dark_mode</div>
                </button>
            </div>
        </div>

        <div class="mega-menu" v-if="false">
            <div class="limiter">
                <RouterLink to="/about">
                    <img src="/images/button.svg" alt="Button" class="image">
                    <div class="text">Buttons</div>
                </RouterLink>
                <RouterLink to="/about">
                    <img src="/images/input.svg" alt="Text Input" class="image">
                    <div class="text">Inputs</div>
                </RouterLink>
                <RouterLink to="/about">
                    <img src="/images/checkbox.svg" alt="Checkbox" class="image">
                    <div class="text">Toggles</div>
                </RouterLink>
                <RouterLink to="/about">
                    <img src="/images/radio.svg" alt="Radio" class="image">
                    <div class="text">Radio Buttons</div>
                </RouterLink>
                <RouterLink to="/about">
                    <img src="/images/loader.svg" alt="Loader" class="image">
                    <div class="text">Loaders</div>
                </RouterLink>
                <RouterLink to="/about">
                    <img src="/images/popup.svg" alt="Popup" class="image">
                    <div class="text">Modals</div>
                </RouterLink>
                <RouterLink to="/about">
                    <img src="/images/datepicker.svg" alt="Datepicker" class="image">
                    <div class="text">Date picker</div>
                </RouterLink>
            </div>
        </div>
    </header>

    <main>
        <RouterView />
    </main>

    <footer>
        <div class="links-row"></div>
        <div class="copyright-row">
            <div class="limiter">
                <div class="flex gap-2 v-center">
                    <span>&copy; {{ new Date().getFullYear() }} Freuwort</span>
                    <div class="spacer"></div>
                    <span>Licensed under the MIT license</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, watch } from 'vue'

    const theme = ref('dark')

    const toggleTheme = () => {
        theme.value = (theme.value === 'light') ? 'dark': 'light'
    }

    // Watch for theme changes
    watch(theme, (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme)
    }, { immediate: true })
</script>

<style lang="sass" scoped>
    header
        display: flex
        flex-direction: column
        position: fixed
        top: 0
        left: 0
        width: 100%
        z-index: 1000

        .nav-row
            display: flex
            align-content: center
            width: 100%
            backdrop-filter: blur(10px) saturate(0%)
            border-bottom: 2px solid var(--color-primary)
            position: relative

            &::after
                content: ''
                position: absolute
                bottom: 0
                left: 0
                width: 100%
                height: 100%
                background: var(--color-background)
                opacity: 0.7
        
        .main.limiter
            height: var(--height-header)
            display: flex
            align-items: center
            gap: 2rem
            position: relative
            z-index: 1

            .logo
                height: 2.5rem

            a
                display: flex
                gap: 1rem
                padding: .5rem 1rem
                align-items: center
                color: var(--color-text)
                text-decoration: none
                font-size: .9rem
                font-family: var(--font-heading)
                transition: color 50ms ease-in-out

                &:hover
                    color: var(--color-primary)

            .divider
                width: 1px
                height: 2rem
                background-color: var(--color-background-soft)

            .theme-toggle
                display: flex
                align-items: center
                justify-content: center
                width: 2rem
                height: 2rem
                padding: 0
                border-radius: 50%
                border: none
                cursor: pointer
                transition: all 50ms ease-in-out
                color: var(--color-text)
                background: var(--color-background-soft)

                &:hover,
                &:focus
                    outline: none
                    background: var(--color-primary)
                    color: var(--color-on-primary)

                .icon
                    font-family: var(--font-icon)
                    font-size: 1.1rem
                    line-height: 1

        .mega-menu
            width: 100%
            background-color: #00000090
            backdrop-filter: blur(10px) saturate(0%)
            border-bottom: 2px solid var(--color-primary)

            > .limiter
                display: grid
                grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))
                gap: 3rem
                align-items: flex-start
                justify-content: space-between
                padding-block: 3rem

            a
                flex: 1
                display: flex
                flex-direction: column
                color: var(--color-text)
                text-decoration: none
                border-radius: var(--radius-l)

                &:hover
                    background: var(--color-primary)

                    .image
                        border-color: var(--color-primary)

                .text
                    width: 100%
                    padding: .5rem 1rem
                    font-family: var(--font-heading)

                .image
                    width: 100%
                    aspect-ratio: 1.586
                    background: var(--color-background)
                    border-radius: inherit
                    border: 2px solid var(--color-background-soft)

    main
        padding-block: var(--height-header)
        
    footer
        width: 100%
        background-color: var(--color-background)
        border-top: 2px solid var(--color-background-soft)

        .links-row
            height: 12rem

        .copyright-row
            height: 4rem
            display: flex
            align-items: center
            font-size: 0.8rem
            background: var(--color-background-soft)
</style>
