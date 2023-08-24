<template>
    <section class="hero">
        <div class="limiter">
            <h1>{{ title }}</h1>
        </div>
    </section>
</template>

<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>

<style lang="sass" scoped>
    section.hero
        height: 500px
        width: 100%
        background-color: rgb(var(--color-background-soft))
        background-image: url('/public/images/background.png')
        background-blend-mode: overlay
        border-bottom: 2px solid rgb(var(--color-primary))

        .limiter
            height: 100%
            text-align: center
            display: flex
            align-items: center
            justify-content: center

            h1
                font-size: 3rem
                font-family: var(--font-heading)
                color: rgb(var(--color-heading))
                margin: 0
                padding: 0
                line-height: 1.2
</style>