<template>
    <label class="mui-input mui-container" :id="nativeId || (id ? 'label-for-'+id : undefined)" :class="classes">
        <div class="box-wrapper">
            <div class="border" v-if="border"></div>

            <div class="side-wrapper">
                <div class="side-icon" v-if="iconLeft"><span>{{iconLeft}}</span></div>
                <slot class="side-slot" v-if="$slots.left" name="left"></slot>
            </div>

            <div class="input-wrapper">
                <div class="label" v-if="label">{{label}}</div>
                
                <div class="inner-input-wrapper">
                    <span class="prefix" v-if="prefix">{{prefix}}</span>

                    <div class="input-compactor">
                        <component
                            ref="input"
                            class="input"
                            :is="'input'"
                            :pattern="pattern"
                            :autocomplete="autocomplete"
                            :spellcheck="spellcheck"
                            :disabled="disabled"
                            :aria-disabled="disabled"
                            :required="required"
                            :aria-required="required"
                            :readonly="readonly"
                            :tabindex="tabindex"
                            :id="id"
                            :name="name"
                            :title="title"
                            :type="computedInputType"
                            :min="min__"
                            :max="max__"
                            :minlength="min__"
                            :maxlength="max__"
                            :step="step__"
                            :autofocus="autofocus"
                            :value="internalValue"
                            :aria-label="label"
                            @input="setInput($event.target.value); emitUpdate()"
                            @focus="inputEvent('focus', $event)"
                            @blur="inputEvent('blur', $event)"
                            @keydown="inputEvent('keydown', $event)"
                            @keyup="inputEvent('keyup', $event)"
                            @keypress="inputEvent('keypress', $event)"
                            @change="inputEvent('change', $event)"
                            @keydown.esc="inputEvent('esc', $event)"
                            @keydown.enter="inputEvent('enter', $event)"
                            @keydown.space="inputEvent('space', $event)"
                        ></component>

                        <div class="placeholder" v-if="placeholder">{{placeholder}}</div>
                    </div>

                    <span class="suffix" v-if="suffix">{{suffix}}</span>
                </div>
            </div>

            <div class="side-wrapper">
                <button type="button" class="side-button" :disabled="disabled || !showClearButton" @click="clearInput()" v-if="hasClearButton" :class="{'hide-button': !showClearButton}">
                    <close-icon />
                </button>

                <button type="button" class="side-button" :disabled="disabled" @click="toggleObfuscation()" v-if="hasObfuscationToggle && showObfuscationToggle">
                    <div class="obfuscation-cross"></div>
                    <visibility-icon />
                </button>

                <div class="side-icon" v-if="iconRight"><span>{{iconRight}}</span></div>
                <slot class="side-slot" v-if="$slots.right" name="right"></slot>
            </div>
                
            <div class="progress-bar" v-if="hasPasswordScore">
                <div class="progress" :class="'score-'+passwordScore"></div>
            </div>
        </div>

        <div class="bottom-bar" v-if="hasBottomBar">
            <div class="helper-text" v-if="helperText">{{helperText}}</div>
            <div class="max-text" v-if="hasMax && showMax">{{internalValueTextLength}} / {{max__}}</div>
        </div>
        
    </label>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'

    import CloseIcon from '@/components/library/icons/CloseIcon.vue'
    import VisibilityIcon from '@/components/library/icons/VisibilityIcon.vue'



    const emits = defineEmits([
        'update:modelValue',
        'update:valid',
        'focus',
        'blur',
        'keydown',
        'keyup',
        'keypress',
        'change',
        'esc',
        'enter',
        'space',
        'clear',
    ])

    const props = defineProps({
        modelValue: {
            type: [String, Number],
            default: '',
        },
    
        type: {
            type: String,
            default: 'text',
        },
    
        id: {
            type: String,
            default: null,
        },
    
        nativeId: {
            type: String,
            default: '',
        },
    
        name: {
            type: String,
        },
    
        label: {
            type: String,
        },
    
        placeholder: {
            type: String,
        },
    
        helper: {
            type: String,
        },
    
        title: {
            type: String,
        },
    
        errorText: {
            type: String,
        },
    
        iconLeft: {
            type: String,
        },
    
        iconRight: {
            type: String,
        },
    
        prefix: {
            type: String,
        },
    
        suffix: {
            type: String,
        },
    
        resize: {
            type: String,
            default: 'none',
        },
    
        clearable: {
            type: Boolean,
            default: false,
        },
    
        required: {
            type: Boolean,
            default: false,
        },
    
        disabled: {
            type: Boolean,
            default: false,
        },
    
        readonly: {
            type: Boolean,
            default: false,
        },
    
        tabindex: {
            type: [Number, String],
            default: 0,
        },
    
        pattern: {
            type: String,
        },
    
        autocomplete: {
            type: String,
            default: 'off',
        },
    
        autofocus: {
            type: Boolean,
            default: false,
        },
    
        spellcheck: {
            type: Boolean,
            default: false,
        },
    
        min: {
            type: [Number, String],
            default: null,
        },
    
        max: {
            type: [Number, String],
            default: null,
        },
    
        step: {
            type: [Number, String],
            default: null,
        },
    
        border: {
            type: Boolean,
            default: false,
        },
    
        hideMax: {
            type: Boolean,
            default: false,
        },
    
        hideObfuscationToggle: {
            type: Boolean,
            default: false,
        },
    
        showPasswordScore: {
            type: Boolean,
            default: false,
        },

        passwordScoreFunction: {
            type: Function,
            default: () => (password: string) => { return { score: 4 }},
        },
    })



    // START: Internal variables
    const internalValue = ref('' as string|number)

    const isValid = ref(true as boolean)
    const isFocused = ref(false as boolean)
    const isObfuscated = ref(true as boolean)

    const input = ref({} as HTMLInputElement)
    // END: Internal variables


    const internalValueText = computed((): string => {
        return internalValue.value.toString()
    })

    const internalValueTextLength = computed((): number => {
        return internalValueText.value.length
    })

    const inputType = computed(() => {
        return ['text', 'email', 'number', 'url', 'password', 'search', 'tel'].includes(props.type) ? props.type : 'text'
    })

    const computedInputType = computed(() => {
        if (inputType.value === 'password' && isObfuscated.value) return 'password'
        if (inputType.value === 'password' && !isObfuscated.value) return 'text'

        return inputType.value
    })

    const isInputTypeTextBased = computed((): boolean => {
        return ['text', 'email', 'url', 'password', 'search', 'tel'].includes(inputType.value)
    })



    const hasObfuscationToggle = computed((): boolean => {
        return inputType.value === 'password'
    })

    const showObfuscationToggle = computed((): boolean => {
        return !props.hideObfuscationToggle
    })



    const helperText = computed((): string => {
        // Prefer error text over helper text over empty
        return (!isValid.value ? props.errorText : null) || props.helper || ''
    })



    const min__ = computed(() => {
        return parseNumber(props.min)
    })

    const max__ = computed(() => {
        return parseNumber(props.max)
    })

    const step__ = computed(() => {
        return parseNumber(props.step)
    })



    const isFilled = computed((): boolean => {
        return internalValueTextLength.value > 0
    })

    const isFocusedOrFilled = computed((): boolean => {
        return isFocused.value || isFilled.value
    })



    const hasClearButton = computed((): boolean => {
        return props.clearable || inputType.value === 'search'
    })

    const showClearButton = computed((): boolean => {
        return isFilled.value
    })



    const hasBottomBar = computed((): boolean => {
        return !!helperText.value || (hasMax.value && showMax.value)
    })

    const hasMax = computed((): boolean => {
        return isInputTypeTextBased.value && !!max__.value
    })

    const showMax = computed((): boolean => {
        return !!props.hideMax
    })



    const hasPasswordScore = computed((): boolean => {
        return props.showPasswordScore && inputType.value === 'password'
    })

    const passwordScore = computed((): number => {
        return props.passwordScoreFunction(internalValue.value).score
    })



    const classes = computed(() => {
        return [
            `input-type-${inputType.value}`,
            {
                'focused': isFocused.value,
                'filled': isFilled.value,
                'focused-or-filled': isFocusedOrFilled.value,
                'invalid': !isValid.value,
                'has-label': props.label,
                'bottom-bar-space': hasBottomBar.value,
                'disabled': props.disabled,
                'obfuscated': isObfuscated.value,
            }
        ]
    })
    


    const parse = (value: string|number|null|undefined): string|number => {
        // Return empty string if value is undefined
        if (value === undefined) return ''

        // Return empty string if value is null
        if (value === null) return ''

        // Return value as number if value number
        // Return empty string if value is not a number
        if (inputType.value === 'number') return parseNumber(Number(value)) || ''

        // Return value as string
        return value.toString()
    }
    
    const parseNumber = (value: string|number|null): number|null => {
        // Return fallback if value is null
        if (value === null) return null

        // Return fallback if value is not a number
        if (!isNaN(Number(value))) return null

        // Return value as number
        return Number(value)
    }
    
    const setInput = (value: string|number|null|undefined): void => {
        internalValue.value = parse(value)
    }

    const emitUpdate = (): void => {
        emits('update:modelValue', internalValue.value)
    }

    const emitClear = (): void => {
        emits('clear')
    }

    const inputEvent = (type: 'update:modelValue'|'update:valid'|'focus'|'blur'|'keydown'|'keyup'|'keypress'|'change'|'esc'|'enter'|'space'|'clear', event: Event|boolean) => {
        emits(type, event)

        switch (type)
        {
            case 'focus': isFocused.value = true; break;
            case 'blur': isFocused.value = false; onBlurValidation(); break;
        }
    }

    const setFocus = (): void => {
        input.value.focus()
    }

    const toggleObfuscation = (): void => {
        isObfuscated.value = !isObfuscated.value
    }



    const onBlurValidation = (): void => {
        if (props.disabled || !input.value) return

        isValid.value = validate(['badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'])

        emits('update:valid', isValid.value)
    }

    const instantValidation = (): void => {
        if (props.disabled || !input.value) return

        isValid.value = validate(['badInput', 'patternMismatch', 'tooLong'])

        emits('update:valid', isValid.value)
    }

    const validate = (watch: string[]) => {
        // let validation = input.value.validity
        // let relevantValidation = []

        // for (const check of watch)
        // {
        //     if (validation[check] !== undefined) relevantValidation.push(validation[check])
        // }

        // return !relevantValidation.some(e => e === true)
        return true
    }



    const clearInput = (): void => {
        setInput('')
        emitUpdate()
        emitClear()
        setFocus()
    }



    onMounted(() => {
        instantValidation()
    })

    watch(() => props.modelValue, (newValue) => {
        setInput(newValue)
        instantValidation()
    }, {
        immediate: true
    })
</script>

<style lang="sass" scoped>
    *
        box-sizing: border-box

    .mui-input.mui-container
        font-size: 1rem
        --base-height: 3em
        --mui-background__: var(--mui-background, #fff)
        --mui-background-secondary__: var(--mui-background-secondary, #00000020)
        --mui-border-color__: var(--mui-border-color, #888)
        --mui-color__: var(--mui-color, #000)
        --mui-color-light__: var(--mui-color-light, #666)

        --mui-disabled-background__: var(--mui-disabled-background, #fafafa)
        --mui-disabled-border-color__: var(--mui-disabled-border-color, #aaa)

        --mui-focused-border-color__: var(--mui-focused-border-color, #222)

        --mui-invalid-color__: var(--mui-invalid-color, #f00)
        --mui-invalid-border-color__: var(--mui-invalid-border-color, #f00)

        --mui-icon-font__: var(--mui-icon-font, 'Material Icons')
        --mui-affix-gap__: var(--mui-affix-gap, 0em)

        height: 3rem
        display: flex
        background: var(--mui-background__)
        border-radius: .325em
        position: relative

        &.focused
            .border
                border-color: var(--mui-focused-border-color__)

        &.filled
            .input-wrapper .inner-input-wrapper .input-compactor
                .placeholder
                    opacity: 0

        &.focused-or-filled
            .box-wrapper
                .progress-bar
                    transform: scaleY(1)

            .input-wrapper
                .label
                    transform: translate(0, -5px) scale(0.72)

        &.has-label
            .input-wrapper
                .inner-input-wrapper
                    padding-top: 1em !important

            &:not(.focused)
                .input-wrapper .inner-input-wrapper .input-compactor .placeholder
                    opacity: 0

            &:not(.focused):not(.filled)
                .input-wrapper .inner-input-wrapper
                    .prefix,
                    .suffix
                        opacity: 0

        &.bottom-bar-space
            margin-bottom: 1.3em

        &.disabled
            background: var(--mui-disabled-background__)

            .border
                border-color: var(--mui-disabled-border-color__)

        &.input-type-password:not(.obfuscated)
            .side-wrapper
                .side-button
                    .obfuscation-cross
                        clip-path: inset(0 0 0 0)

        &.invalid
            .border
                border-color: var(--mui-invalid-border-color__)

            .box-wrapper
                .side-wrapper
                    .side-icon
                        color: var(--mui-invalid-color__)

            .bottom-bar
                .max-text,
                .helper-text
                    color: var(--mui-invalid-color__)



        .box-wrapper
            width: 100%
            height: 100%
            overflow: auto
            position: relative
            border-radius: inherit
            display: flex
            align-items: center

            .side-wrapper
                padding: 0 .5em
                display: flex
                align-items: center
                height: 100%

                .side-icon
                    height: 2em
                    width: 2em
                    display: flex
                    align-items: center
                    justify-content: center
                    flex: none
                    font-family: var(--mui-icon-font__)
                    color: inherit
                    user-select: none
                    color: var(--mui-color-light__)

                    > span
                        font-size: 1.25em
                    
                .side-button
                    height: 2em
                    width: 2em
                    display: flex
                    align-items: center
                    justify-content: center
                    flex: none
                    border: none
                    padding: 0
                    margin: 0
                    border-radius: .25em
                    background: transparent
                    color: var(--mui-color-light__)
                    font-family: inherit
                    font-size: inherit
                    position: relative
                    transition: all 100ms
                    cursor: pointer

                    &:hover
                        background: var(--mui-background-secondary__)
                        color: var(--mui-color__)

                    &:focus
                        background: var(--mui-background-secondary__)
                        color: var(--mui-color__)
                        outline: none

                    &:disabled
                        cursor: initial

                    &.hide-button
                        opacity: 0
                        cursor: initial
                        user-select: none
                        pointer-events: none

                    .obfuscation-cross
                        content: ''
                        width: 0
                        height: 60%
                        position: absolute
                        left: 50%
                        top: calc(20% + 1px)
                        z-index: 1
                        transition: clip-path 160ms, border 100ms, background 100ms
                        transform: rotate(45deg) translateX(-50%)
                        background: var(--mui-background__)
                        border-left: 2px solid currentColor
                        border-right: 1px solid var(--mui-background__)
                        clip-path: inset(0 0 100% 0)

            .progress-bar
                height: 3px
                background: var(--mui-background-secondary__)
                width: 100%
                position: absolute
                bottom: 0
                left: 0
                z-index: 1
                pointer-events: none
                transform: scaleY(0)
                transform-origin: center bottom
                text-align: left
                transition: all 200ms
                overflow: hidden

                .progress
                    height: 100%
                    transition: all 300ms
                    position: absolute
                    top: 0
                    left: 0

                    &.score-0
                        width: 5%
                        background: var(--mui-invalid-color__)

                    &.score-1
                        width: 25%
                        background: var(--mui-invalid-color__)

                    &.score-2
                        width: 50%
                        background: #ff9f43

                    &.score-3
                        width: 75%
                        background: #f1c40f

                    &.score-4
                        width: 100%
                        background: #2ecc71

        .input-wrapper
            display: flex
            flex: 1
            align-items: center
            height: 100%
            width: 100%
            position: relative

            .inner-input-wrapper
                flex: 1
                display: flex
                align-items: center
                height: 100%
                gap: var(--mui-affix-gap__)

                .prefix,
                .suffix
                    user-select: none
                    pointer-events: none
                    transition: opacity 160ms
                    color: var(--mui-color-light__)

                .input-compactor
                    flex: 1
                    position: relative
                    height: 100%

                    .input
                        height: 100%
                        width: 100%
                        flex: 1
                        padding: 0
                        border: none
                        background: none
                        border-radius: 3px
                        font-family: inherit
                        font-size: inherit
                        resize: none
                        color: var(--mui-color__)

                        // Disable number arrows
                        &[type="number"]
                            -moz-appearance: textfield

                        &[type="password"]::-ms-reveal,
                        &[type="password"]::-ms-clear
                            display: none

                        &[type="search"]::-webkit-search-decoration,
                        &[type="search"]::-webkit-search-cancel-button,
                        &[type="search"]::-webkit-search-results-button,
                        &[type="search"]::-webkit-search-results-decoration
                            display: none

                        &:focus
                            outline: none

                        &::-webkit-outer-spin-button,
                        &::-webkit-inner-spin-button
                            -webkit-appearance: none
                            margin: 0

                    .placeholder
                        font-size: inherit
                        height: 100%
                        width: 100%
                        line-height: 1.5
                        position: absolute
                        top: 0
                        left: 0
                        display: flex
                        align-items: center
                        padding-block: 0
                        padding-left: var(--mui-left-input-padding__)
                        padding-right: var(--mui-right-input-padding__)
                        white-space: nowrap
                        overflow: hidden
                        text-overflow: ellipsis
                        text-align: left
                        pointer-events: none
                        transition: opacity 160ms
                        color: var(--mui-color-light__)
                        transform-origin: top left
                        user-select: none
                        opacity: .8

            .label
                font-size: inherit
                height: 100%
                width: 100%
                line-height: 1.5
                position: absolute
                top: 0
                left: 0
                z-index: 1
                display: flex
                align-items: center
                padding-block: 0
                padding-left: var(--mui-left-input-padding__)
                padding-right: var(--mui-right-input-padding__)
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                text-align: left
                pointer-events: none
                transition: all 200ms
                color: var(--mui-color-light__)
                transform-origin: top left
                user-select: none

        .border
            height: 100%
            width: 100%
            position: absolute
            top: 0
            left: 0
            z-index: 2
            border-radius: inherit
            border-width: 1px
            border-style: solid
            border-color: var(--mui-border-color__)
            pointer-events: none

        .bottom-bar
            height: 1.3em
            width: 100%
            position: absolute
            top: 100%
            left: 0
            gap: 1em
            padding: 0 1em
            display: flex
            align-items: flex-end
            user-select: none
            pointer-events: none

            .helper-text
                font-size: .75em
                color: var(--mui-color__)
                line-height: 1.5
                flex: 1
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis

            .max-text
                font-size: .75em
                color: var(--mui-color__)
                line-height: 1.5
                white-space: nowrap
                overflow: hidden
                text-overflow: ellipsis
                justify-self: flex-end
                margin-left: auto
</style>