<template>
    <button class="swatch-wrapper" :style="`background: ${background}; color: ${color};`">
        <slot>{{title}}</slot>
    </button>
</template>

<script setup lang="ts">
    defineProps({
        title: {
            type: String,
        },
        background: {
            type: String,
            default: 'var(--color-primary)',
        },
        color: {
            type: String,
            default: 'var(--color-on-primary)',
        },
    })
</script>

<style lang="sass" scoped>
    .swatch-wrapper
        font-size: .8rem
        font-family: inherit
        font-weight: inherit
        text-align: left
        line-height: 1.5
        display: flex
        height: 3rem
        align-items: center
        justify-content: flex-start
        padding: .75rem 1rem
        border-radius: var(--radius-m)
        background: var(--color-primary)
        color: var(--color-on-primary)
        border: 1px solid rgb(var(--color-background-soft))
</style>