<template>
    <div class="pi-outer-container">
        <div class="pi-slot-container" ref="trigger" @click="isOpen = !isOpen">
            <slot></slot>
        </div>

        <Teleport to="body">
            <div class="pi-iconpicker pi-container" v-show="isOpen" :style="`left: ${pos.x}px; top: ${pos.y}px;`">
                <div class="icon-picker">
                    <div class="icon" v-for="icon in icons.filter(e => e.category === 'action')" :key="icon.icon" @click="selectIcon(icon.icon)">{{icon.icon}}</div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    import icons from '@/components/data/material_symbols'



    const emits = defineEmits([
        'select',
    ])

    const isOpen = ref(false)
    const trigger = ref({} as HTMLElement)
    const pos = ref({x: 0, y: 0})

    const observer = new IntersectionObserver((e) => {
        console.log(e)
    })

    const resizeObserver = new ResizeObserver((e) => {
        console.log(e)
    })

    onMounted(() => {
        setTimeout(() => {
            // observer.observe(trigger.value)
            // resizeObserver.observe(trigger.value)
            // window.addEventListener('resize', () => {
            //     let t = trigger.value.getBoundingClientRect()
            //     pos.value.x = t.x + t.width / 2
            //     pos.value.y = t.y + t.height / 2
            // })
            // window.addEventListener('scroll', () => {
            //     let t = trigger.value.getBoundingClientRect()
            //     pos.value.x = t.x + t.width/2
            //     pos.value.y = t.y + t.height/2
            // })
        }, 1000)
    })




    const selectIcon = (icon: string) => {
        emits('select', icon)
    }
</script>

<style lang="sass" scoped>
    .pi-outer-container
        display: contents

        .pi-slot-container
            display: inline

    .pi-container.pi-iconpicker
        position: fixed
        top: 0
        left: 0
        z-index: 1000

    .icon-picker
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr))
        gap: .5rem
        padding: .5rem
        border-radius: var(--radius-m)
        background: rgb(var(--color-background))
        border: 1px solid rgb(var(--color-border))
        max-height: 50vh
        overflow-y: auto
        width: 320px

        .icon
            display: flex
            justify-content: center
            align-items: center
            font-size: 1.5rem
            line-height: 1
            aspect-ratio: 1
            border-radius: var(--radius-s)
            background: rgb(var(--color-background-soft))
            font-family: var(--font-icon)
            cursor: pointer
            transition: all 50ms ease-in-out
            overflow: hidden

            &:hover
                color: rgb(var(--color-primary))
</style>