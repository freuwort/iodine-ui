<template>
    <button class="radius-wrapper" :style="`border-radius: ${radius};`">
        <slot>{{ title }}</slot>
    </button>
</template>

<script setup lang="ts">
    defineProps({
        title: {
            type: String,
        },
        radius: {
            type: String,
            default: 'var(--radius-m)',
        },
    })
</script>

<style lang="sass" scoped>
    .radius-wrapper
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
        background: rgb(var(--color-background-soft))
        color: rgb(var(--color-heading))
        border: none
</style>