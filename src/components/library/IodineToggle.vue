<template>
    <div
        ref="containerElement"
        class="mui-toggle mui-container"
        :class="classes__"
        :tabindex="tabindex__"
        :role="type__"
        :aria-checked="internalValue__"
        :disabled="disabled"
        :aria-disabled="disabled"
        :aria-readonly="readonly"
        @click="inputEvent('input', $event); toggle($event)"
        @focus="inputEvent('focus', $event)"
        @blur="inputEvent('blur', $event)"
        @keydown="inputEvent('keydown', $event)"
        @keyup="inputEvent('keyup', $event)"
        @keypress="inputEvent('keypress', $event)"
        @keydown.esc="inputEvent('esc', $event)"
        @keydown.space.prevent="inputEvent('space', $event); toggle($event)"
        @keydown.enter="inputEvent('enter', $event)">

        <input class="input"
            readonly
            :name="name"
            :value="value__"
            :checked="internalValue__"
            :disabled="disabled"
            :required="required"
            :type="dataType__ === 'boolean' ? 'checkbox' : 'hidden'">
        
        <div class="label" v-if="$slots.prependLabel || prependLabel">
            <slot name="prependLabel">{{prependLabel}}</slot>
        </div>
        
        <div class="checkbox-wrapper" v-if="type__ === 'checkbox'">
            <div class="focus-indicator"></div>
            <div class="checkbox">
                <transition name="checked">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-show="internalValue__" :style="`--mui-stroke-offset__: ${checkmarkPathLength__}`">
                        <path ref="checkmarkPath" d="M3,12l6,6l12,-12"/>
                    </svg>
                </transition>
            </div>
        </div>

        <div class="switchbox" v-else-if="type__ === 'switch'">
            <div class="switchdot-wrapper">
                <div class="focus-indicator"></div>
                <div class="switchdot"></div>
            </div>
        </div>

        <div class="label" v-if="$slots.label || label">
            <slot name="label">{{label}}</slot>
        </div>

        <div class="border" v-if="border"></div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'



    const emits = defineEmits([
        'update:modelValue',
        'input',
        'focus',
        'blur',
        'keydown',
        'keyup',
        'keypress',
        'esc',
        'space',
        'enter',
    ])

    const props = defineProps({
        modelValue: {
            type: [Boolean, String, Number],
            default: null,
        },

        type: {
            type: String,
            default: 'checkbox',
        },

        name: {
            type: String,
            default: '',
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        readonly: {
            type: Boolean,
            default: false,
        },

        required: {
            type: Boolean,
            default: false,
        },

        tabindex: {
            type: [Number, String],
            default: 0,
        },

        prependLabel: {
            type: String,
            default: '',
        },

        offValue: {
            type: [Boolean, String, Number],
            default: false,
        },

        label: {
            type: String,
            default: '',
        },
        
        value: {
            type: [Boolean, String, Number],
            default: true,
        },

        border: {
            type: Boolean,
            default: false,
        },
    })



    const focus__ = ref(false)
    const internalValue__ = ref(false)
    const containerElement = ref({} as HTMLElement)
    const checkmarkPath = ref({} as SVGPathElement)
    const checkmarkPathLength__ = ref(0)



    const value__ = computed(() => {
        return internalValue__.value ? props.value : props.offValue
    })

    const classes__ = computed(() => {
        return {
            'active': internalValue__.value,
            'disabled': props.disabled,
        }
    })

    const type__ = computed(() => {
        return ['checkbox', 'switch'].includes(props.type) ? props.type : 'checkbox'
    })

    const tabindex__ = computed(() => {
        return props.disabled ? -1 : Number(props.tabindex)
    })

    const dataType__ = computed(() => {
        return typeof props.offValue !== 'boolean' || typeof props.value !== 'boolean' ? 'string' : 'boolean'
    })



    const parseValue = (value: string|boolean|number|null) => {
        if (value === props.offValue) return false

        if (value === props.value) return true
        
        if (typeof value === 'boolean') return value

        return false
    }

    const toggle = (event: MouseEvent|KeyboardEvent) => {
        if (shouldBounceEvent(event)) return

        internalValue__.value = !internalValue__.value
        emits('update:modelValue', value__.value)
    }

    const inputEvent = (type: 'update:modelValue' | 'input' | 'focus' | 'blur' | 'keydown' | 'keyup' | 'keypress' | 'esc' | 'space' | 'enter', event: MouseEvent|KeyboardEvent|FocusEvent) => {
        emits(type, event)

        switch (type)
        {
            case 'focus': focus__.value = true; break;
            case 'blur': focus__.value = false; break;
        }
    }

    const shouldBounceEvent = (event: MouseEvent|KeyboardEvent) => {
        if (props.disabled) return true

        if (props.readonly) return true
        

        // It is possible to pass a clickable element inside the component
        // We have to bounce the click event if the origin is from such an element
        // First we get the path of the event
        let path = event.composedPath() as HTMLElement[]

        // Then we go through the path
        for (const element of path)
        {
            // Only go through child elements and stop at the container element
            if (element === containerElement.value) return false

            // Bounce event for all elements with the "mui-container" class
            if ([...element.classList].includes('mui-container')) return true

            // Bounce event for interactive elements
            if (['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(element.tagName)) return true
        }

        return false
    }



    onMounted(() => {
        checkmarkPathLength__.value = type__.value === 'checkbox' ? checkmarkPath.value.getTotalLength() || 0 : 0
    })



    watch(() => props.modelValue, (newValue) => {
        internalValue__.value = parseValue(newValue)
    }, {
        immediate: true,
    })
</script>

<style lang="sass" scoped>
    *
        box-sizing: border-box

    .mui-toggle.mui-container
        font-size: 1rem
        --mui-border-color__: var(--mui-border-color, #888)
        
        --mui-background__: var(--mui-background, #fff)
        --mui-color__: var(--mui-color-light, #666)

        --mui-active-background__: var(--primary, #650db4)
        --mui-active-color__: var(--primary-contrast, #fff)

        --mui-disabled-background__: var(--mui-disabled-background, #f0f0f0)
        --mui-disabled-color__: var(--mui-disabled-color, #777)

        position: relative
        vertical-align: top
        display: inline-flex
        align-items: center
        justify-content: flex-start
        gap: 1em
        padding-inline: 0.625em
        padding-block: .5em
        min-height: 2.5em
        cursor: pointer
        user-select: none
        border-radius: .325em

        &.active
            --mui-background__: var(--mui-active-background__, #650db4)
            --mui-color__: var(--mui-active-color__, #fff)

            .checkbox
                background: var(--mui-background__)
                border-color: var(--mui-background__)
                color: var(--mui-color__)

            .switchbox
                border-color: var(--mui-background__)
                background: var(--mui-background__)
                color: var(--mui-color__)

                .switchdot-wrapper
                    left: calc(100% - 1.25em + 4px)



        &:hover:not(.disabled)
            .focus-indicator
                opacity: .1
                transform: translate(-50%, -50%) scale(1)



        &:focus:not(.disabled)
            outline: none
            
            .focus-indicator
                opacity: .2
                transform: translate(-50%, -50%) scale(1)



        &.disabled
            cursor: initial
            --mui-background__: var(--mui-disabled-background__)
            --mui-color__: var(--mui-disabled-color__)

            .checkbox
                border-color: var(--mui-color__)
                background: var(--mui-background__)
                color: var(--mui-color__)

            .switchbox
                border-color: var(--mui-color__)
                background: var(--mui-color__)
                color: var(--mui-background__)



        .checkbox-wrapper
            height: 1.25em
            width: 1.25em
            display: flex
            align-items: center
            justify-content: flex-start
            flex: none
            position: relative

        .checkbox
            height: 100%
            width: 100%
            border-radius: 0.25em
            position: relative
            z-index: 1
            user-select: none
            border: 2px solid transparent
            transition: all 50ms ease-in-out

            border-color: var(--mui-color__)
            background: transparent
            color: var(--mui-color__)

            .checkmark
                height: 100%
                width: 100%
                position: absolute
                top: 0
                left: 0
                text-align: center
                color: inherit
                transition: stroke-dashoffset 80ms linear //cubic-bezier(0.80, 0, 0.2, 1)
                stroke-dasharray: var(--mui-stroke-offset__)
                stroke-dashoffset: 0
                fill: none
                stroke-width: 2.4
                stroke: currentColor
                stroke-linecap: round
                stroke-linejoin: round

                &.checked-enter-active
                    stroke-dashoffset: var(--mui-stroke-offset__)

                &.checked-leave-to
                    stroke-dashoffset: calc(-1 * var(--mui-stroke-offset__))

        .switchbox
            height: 1.25em
            width: 2.25em
            border-radius: 1em
            border: 2px solid transparent
            transition: all 50ms ease-in-out
            position: relative !important

            border-color: var(--mui-color__)
            background: var(--mui-color__)
            color: var(--mui-background__)

            .switchdot-wrapper
                height: calc(1.25em - 4px)
                aspect-ratio: 1
                transition: all 80ms cubic-bezier(0.80, 0, 0.2, 1)
                position: absolute
                top: 0
                left: 0
                pointer-events: none

                .switchdot
                    height: 100%
                    width: 100%
                    border-radius: 50%
                    position: relative
                    z-index: 1
                    background: currentColor

        .focus-indicator
            height: 2.25em
            width: 2.25em
            border-radius: 50%
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%) scale(.6)
            transition: all 100ms ease-in-out
            background: var(--mui-active-background__)
            opacity: 0
            pointer-events: none

        .input
            display: none
        
        .label
            // font-size: 0.8em
            line-height: 1.25
            user-select: none
            flex: none

        .border
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            border-radius: inherit
            border: 1px solid var(--mui-border-color__)
            pointer-events: none
</style>