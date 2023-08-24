<template>
    <component class="mui-button mui-container" :is="is"
        :role="role__"
        :disabled="disabled || loading"
        :area-disabled="disabled || loading"
        :aria-label="label"
        :class="classes__">

        <div class="icon" v-if="iconLeft">{{iconLeft}}</div>
        <span class="content">
            <slot><span>{{label}}</span></slot>
        </span>
        <div class="icon" v-if="iconRight">{{iconRight}}</div>

        <IodineLoader type="spinner" class="spinner" color="var(--color-disabled)" />

        <div class="border" v-if="border"></div>
        <div class="background"></div>
        <div class="overlay"></div>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    import IodineLoader from './IodineLoader.vue'



    const props = defineProps({
        is: {
            type: String,
            default: 'button'
        },

        variant: {
            type: String,
            default: 'filled',
        },

        color: {
            type: String,
            default: 'primary',
        },

        label: {
            type: String,
            default: '',
        },

        iconLeft: {
            type: String,
        },

        iconRight: {
            type: String,
        },

        size: {
            type: String,
            default: 'normal',
        },

        border: {
            type: Boolean,
            default: false,
        },

        loading: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    })



    const role__ = computed(() => {
        return ['a', 'Link'].includes(props.is) ? 'link' : 'button'
    })

    const variant__ = computed(() => {
        return ['filled', 'contained', 'text'].includes(props.variant) ? props.variant : 'filled'
    })

    const classes__ = computed(() => {
        return [
            `button-size-${size__.value}`,
            `button-variant-${variant__.value}`,
            `button-color-${presetColor__.value}`,
            {
                'disabled': props.disabled,
                'loading': props.loading,
            }
        ]
    })

    const size__ = computed(() => {
        return ['small', 'normal', 'large'].includes(props.size) ? props.size : 'normal'
    })

    const presetColor__ = computed(() => {
        return ['primary', 'secondary', 'success', 'info', 'warning', 'error'].includes(props.color) ? props.color : 'primary'
    })
</script>

<style lang="sass" scoped>
    *
        box-sizing: border-box

    .mui-button.mui-container
        font-size: 1rem

        --background: rgb(var(--color-primary))
        --color: rgb(var(--color-on-primary))

        --background-disabled: rgb(var(--color-background-disabled))
        --color-disabled: rgb(var(--color-text-disabled))

        --mui-icon-font__: var(--mui-icon-font, 'Material Icons')

        display: inline-flex
        align-items: center
        justify-content: center
        gap: .8em
        text-align: center
        text-decoration: none
        text-transform: uppercase
        letter-spacing: .05em
        font-family: inherit
        font-weight: 500
        border-radius: .325em
        border: none
        cursor: pointer
        user-select: none
        vertical-align: top
        position: relative
        background: transparent
        color: var(--color)

        &:hover
            .overlay
                opacity: 0.1

        &:focus
            outline: none

            .overlay
                opacity: 0.17



        &.button-color-primary
            --background: var(--primary, #650db4)
            --color: var(--primary-contrast, #fff)

        &.button-color-secondary
            --background: var(--secondary, #22a6b3)
            --color: var(--secondary-contrast, #fff)

        &.button-color-success
            --background: var(--success, #4caf50)
            --color: var(--success-contrast, #fff)

        &.button-color-info
            --background: var(--info, #2196f3)
            --color: var(--info-contrast, #fff)

        &.button-color-warning
            --background: var(--warning, #ff9800)
            --color: var(--warning-contrast, #fff)

        &.button-color-error
            --background: var(--error, #f44336)
            --color: var(--error-contrast, #fff)



        &.button-variant-filled
            .background
                opacity: 1

        &.button-variant-contained
            --color: var(--background)

            .background
                opacity: .15

        &.button-variant-text
            --color: var(--background)

            .background
                opacity: 0



        &.button-size-small
            height: 2em
            padding: 0 .9em
            gap: .7em

        &.button-size-normal
            height: 2.5em
            padding: 0 1em
            gap: .8em

        &.button-size-large
            height: 3em
            padding: 0 1.75em
            gap: 1.55em



        &.disabled,
        &.loading,
        &:disabled
            --background: var(--background-disabled)
            --color: var(--color-disabled)
            cursor: initial

            .overlay
                display: none



        &.loading
            .spinner
                opacity: 1

            .icon,
            .content
                opacity: 0



        .overlay,
        .background
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            border-radius: inherit
            opacity: 0
            transition: opacity 100ms
            pointer-events: none

            &.overlay
                background: currentcolor

            &.background
                background: var(--background)

        .content
            font-size: .75rem
            font-weight: inherit
            letter-spacing: inherit
            position: relative
            z-index: 1

        .icon
            color: inherit
            font-size: 1em
            letter-spacing: 0
            font-weight: normal
            pointer-events: none
            vertical-align: top
            text-transform: lowercase
            font-family: var(--mui-icon-font__)
            position: relative
            z-index: 1

        .spinner
            position: absolute
            z-index: 1
            opacity: 0
            height: 1.25em
            width: 1.25em
            top: calc(50% - .625em)
            left: calc(50% - .625em)
            pointer-events: none

        .border
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            z-index: 2
            border-radius: inherit
            border: 1px solid var(--color)
            pointer-events: none
</style>