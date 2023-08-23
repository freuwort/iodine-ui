<template>
    <label class="mui-input mui-container" :id="nativeId || (id ? 'label-for-'+id : null)" :class="classes__">
        <div class="box-wrapper" @click="openSelect()">
            <div class="border" v-if="border"></div>

            <div class="side-wrapper">
                <div class="side-icon" v-if="iconLeft__"><span>{{iconLeft__}}</span></div>
                <slot class="side-slot" v-if="$slots.left" name="left"></slot>
            </div>

            <div class="input-wrapper">
                <div class="label" v-if="label">{{label}}</div>
                
                <div class="inner-input-wrapper">
                    <span class="prefix" v-if="prefix">{{prefix}}</span>

                    <div class="input-compactor">
                        <component ref="input" class="input"
                            :is="as__"
                            :pattern="pattern"
                            :autocomplete="autocomplete"
                            :spellcheck="spellcheck"
                            :disabled="disabled"
                            :required="required"
                            :readonly="readonly__"
                            :tabindex="tabindex__"
                            :id="id"
                            :name="name"
                            :title="computedTitle__"
                            :type="computedType__"
                            :min="min__"
                            :max="max__"
                            :minlength="min__"
                            :maxlength="max__"
                            :step="step__"
                            :autofocus="autofocus"
                            :value="value__"
                            :aria-required="required"
                            :aria-label="label"
                            :aria-disabled="disabled"
                            @input="input($event.target.value)"
                            @focus="inputEvent('focus', $event)"
                            @blur="inputEvent('blur', $event); handleSelectClose($event)"
                            @keydown="inputEvent('keydown', $event)"
                            @keyup="inputEvent('keyup', $event)"
                            @keypress="inputEvent('keypress', $event)"
                            @change="inputEvent('change', $event)"
                            @keydown.esc="inputEvent('esc', $event)"
                            @keydown.enter="inputEvent('enter', $event); handleSelectOpen($event)"
                            @keydown.space="inputEvent('space', $event); handleSelectOpen($event)"
                        ></component>

                        <div class="placeholder" v-if="placeholder">{{placeholder}}</div>
                    </div>

                    <span class="suffix" v-if="suffix">{{suffix}}</span>
                </div>
            </div>

            <div class="side-wrapper">
                <button type="button" class="side-button" :disabled="disabled || hideClearButton__" @click="clearInput(true)" v-if="hasClearButton__" :class="{'hide-button': hideClearButton__}">
                    <close-icon />
                </button>

                <button type="button" class="side-button" :disabled="disabled" @click="toggleObfuscation()" v-if="hasObfuscationToggle__">
                    <div class="obfuscation-cross"></div>
                    <visibility-icon />
                </button>

                <div class="side-icon" v-if="type__ === 'select'">
                    <dropdown-arrow-icon />
                </div>

                <div class="side-icon" v-if="iconRight__"><span>{{iconRight__}}</span></div>
                <slot class="side-slot" v-if="$slots.right" name="right"></slot>
            </div>
                
            <div class="progress-bar" v-if="hasScore__">
                <div class="progress" :class="'score-'+score__"></div>
            </div>
        </div>

        <div class="select-bar" v-if="type__ === 'select'" v-show="selectOpen__">
            <slot v-for="item in items__" :key="item" :data="item" :value="item.value" :label="item.label">
                <button type="button" class="select-item" @click="clickSelectValue(item.value)">
                    <div class="select-item-label">{{item.label}}</div>
                </button>
            </slot>
        </div>

        <div class="bottom-bar" v-if="hasBottomBar__">
            <div class="helper-text" v-if="helperText__">{{helperText__}}</div>
            <div class="max-text" v-if="showMax__">{{value__.length}} / {{max__}}</div>
        </div>
        
    </label>
</template>

<script>
    import CloseIcon from '@/components/icons/CloseIcon.vue'
    import VisibilityIcon from '@/components/icons/VisibilityIcon.vue'
    import DropdownArrowIcon from '@/components/icons/DropdownArrowIcon.vue'

    export default {
        props: {
            modelValue: {
                type: [String, Number],
                default: '',
            },

            items: {
                type: Array,
                default: () => [],
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
        },

        data() {
            return {
                value__: '',
                valid__: true,
                focus__: false,
                obfuscated__: true,
                selectOpen__: false,
                errors: {},
            }
        },
        
        mounted() {
            this.instantValidation()
        },

        watch: {
            modelValue: {
                immediate: true,
                handler(newValue) {
                    this.value__ = this.parse(newValue)
                    this.instantValidation()
                },
            },

            // focus__() {
            //     console.log(this.focus__)
            // },
        },

        computed: {
            as__() {
                return this.type__ === 'textarea' ? 'textarea' : 'input'
            },

            type__() {
                return ['text', 'email', 'number', 'url', 'password', 'search', 'tel', 'textarea', 'select'].includes(this.type) ? this.type : 'text'
            },

            computedType__() {
                if (this.type__ === 'password') return this.obfuscated__ ? 'password' : 'text'

                return this.type__
            },

            items__() {
                let items = []

                if (!Array.isArray(this.items)) return items

                for (const item of this.items)
                {
                    if (typeof item === 'object' && item.value && item.label) items.push(item)
                    
                    else if (['string', 'number', 'boolean'].includes(typeof item)) items.push({ value: item, label: item })

                    else continue
                }
                
                return items
            },

            computedTitle__() {
                return this.title || (this.errorText && !this.valid__) ? this.errorText : ''
            },

            resize__() {
                return ['none', 'vertical', 'horizontal', 'both'].includes(this.resize) ? this.resize : 'none'
            },

            readonly__() {
                return this.readonly || this.type__ === 'select'
            },

            helperText__() {
                // Prefer error text (if invalid) over helper text over null
                return (!this.valid__ ? this.errorText : null) || this.helper || null
            },

            iconLeft__() {
                return this.iconLeft || null
            },

            iconRight__() {
                return this.iconRight || null
            },

            tabindex__() {
                return Number(this.tabindex)
            },

            min__() {
                if (!isNaN(Number(this.min)) && this.min !== null) return Number(this.min)

                return null
            },

            max__() {
                if (!isNaN(Number(this.max)) && this.max !== null) return Number(this.max)

                return null
            },

            step__() {
                if (!isNaN(Number(this.step)) && this.step !== null) return Number(this.step)

                return null
            },

            filled__() {
                return (this.value__+'').length > 0
            },

            classes__() {
                return [
                    `input-type-${this.type__}`,
                    `input-resize-${this.resize__}`,
                    {
                        'focused': this.focus__,
                        'filled': this.filled__,
                        'focused-or-filled': this.focusedOrFilled__,
                        'invalid': !this.valid__,
                        'has-label': this.label,
                        'bottom-bar-space': this.hasBottomBar__,
                        'disabled': this.disabled,
                        'obfuscated': this.type__ === 'password' && this.obfuscated__,
                    }
                ]
            },

            focusedOrFilled__() {
                return (this.focus__ || this.filled__)
            },

            showMax__() {
                if (this.hideMax) return false

                // Can't show max if there's no max set
                if (this.max__ === null) return false

                // Number inputs don't need a character counter
                if (this.type__ === 'number') return false

                return true
            },

            hasClearButton__() {
                return this.clearable || this.type__ === 'search'
            },

            hideClearButton__() {
                return !this.filled__
            },

            hasBottomBar__() {
                return this.helperText__ || this.showMax__
            },



            hasObfuscationToggle__() {
                return this.type__ === 'password' && !this.hideObfuscationToggle
            },

            hasPasswordValidationLibrary__() {
                return window.zxcvbn && typeof zxcvbn === 'function'
            },

            hasScore__() {
                return this.showPasswordScore && this.hasPasswordValidationLibrary__ && this.type__ === 'password'
            },

            score__() {
                if (this.type__ !== 'password') return null

                if (this.hasPasswordValidationLibrary__) return window.zxcvbn(this.value__).score

                return 0
            },
        },

        methods: {
            focus() {
                this.$refs.input.focus()
            },

            input(value) {
                this.value__ = this.parse(value)
                this.$emit('update:modelValue', this.value__)
            },

            inputEvent(type, event) {
                this.$emit(type, event)

                switch (type)
                {
                    case 'focus': this.focus__ = true; break;
                    case 'blur': this.focus__ = false; this.onBlurValidation(); break;
                }
            },

            parse(value) {
                return this.type__ === 'number' ? Number(value) : value
            },



            openSelect() {
                this.selectOpen__ = true
            },

            handleSelectOpen(e) {
                if (this.type__ !== 'select') return

                e.preventDefault()
                this.openSelect()
            },

            closeSelect() {
                this.selectOpen__ = false
            },

            handleSelectClose(e) {
                if (this.type__ !== 'select') return

                e?.preventDefault()

                if (this.selectOpen__)
                {
                    this.focus()
                }
            },

            clickSelectValue(value) {
                this.selectValue(value)
                this.closeSelect()
            },

            selectValue(value) {
                this.value__ = value
                this.input(value)
            },
            


            onBlurValidation() {
                if (this.disabled || !this.$refs.input) return

                this.valid__ = this.validate(['badInput', 'patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'tooShort', 'typeMismatch', 'valueMissing'])

                this.$emit('update:valid', this.valid__)
            },

            instantValidation() {
                if (this.disabled || !this.$refs.input) return

                this.valid__ = this.validate(['badInput', 'patternMismatch', 'tooLong'])

                this.$emit('update:valid', this.valid__)
            },

            validate(watch = []) {
                let validation = this.$refs.input.validity
                let relevantValidation = []

                for (const check of watch)
                {
                    if (validation[check] !== undefined) relevantValidation.push(validation[check])
                }

                return !relevantValidation.some(e => e === true)
            },



            toggleObfuscation() {
                this.obfuscated__ = !this.obfuscated__
            },

            clearInput(shoudFocus) {
                this.value__ = ''
                this.input(this.value__)

                this.$emit('clear')

                if (shoudFocus) this.focus()
            },
        },

        components: {
            CloseIcon,
            VisibilityIcon,
            DropdownArrowIcon,
        },
    }
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

        &.input-type-textarea
            height: auto

            &.input-resize-vertical .box-wrapper
                resize: vertical !important
            
            &.input-resize-horizontal .box-wrapper
                resize: horizontal !important

            &.input-resize-both .box-wrapper
                resize: both !important

            .box-wrapper
                height: var(--base-height)
                min-height: 2em
                resize: none
                overflow: hidden
                align-items: flex-start
                
                .side-wrapper
                    max-height: 3em

                .input-wrapper
                    .label
                        height: 3em

                    .inner-input-wrapper
                        padding-top: .75em

                        .input-compactor
                            .placeholder
                                height: auto

                            .input
                                height: calc(100% - .1em)
                                margin-top: .1em

        &.input-type-textarea.has-label
            .box-wrapper
                .input-wrapper
                    .label
                        height: 3em

                    .inner-input-wrapper
                        padding-top: 1.2em !important



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

        .select-bar
            width: 100%
            padding: .5rem 0
            background: var(--mui-background__)
            position: absolute
            top: 100%
            left: 0
            z-index: 3
            border-radius: .325rem
            box-shadow: 0 0 .5rem rgba(0, 0, 0, .1)
            display: flex
            flex-direction: column

            .select-item
                border: none
                background: transparent
                color: var(--mui-color__)
                height: 2em
                width: 100%
                padding: 0 1em
                display: flex
                align-items: center
                justify-content: flex-start
                font-size: inherit
                font-family: inherit
                line-height: 1.5
                user-select: none
                cursor: pointer
                word-break: break-all
                transition: all 100ms

                &:hover
                    background: var(--mui-background-secondary__)
                    color: var(--mui-color__)

                .select-item-label
                    flex: 1
                    font-size: .8em
                    display: flex
                    justify-content: inherit

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