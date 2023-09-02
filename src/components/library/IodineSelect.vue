<template>
  <div class="iod-container iod-select">
    <IodineInput
      ref="inputComponent"
      :label="label"
      :autofocus="autofocus"
      :disabled="disabled"
      :required="required"
      :size="size"
      :readonly="true"
      v-model="selectedOptionText"
      @mousedown="activate"
      @blur="activate"
    >
      <template #right>
        <DropdownArrowIcon class="dropdown-arrow" :class="{'open': popoverComponent?.showing}"/>
      </template>
    </IodineInput>

    <!-- Form compatibility: used as form exposure for internalValue  -->
    <input
      type="hidden"
      :name="name"
      :form="form"
      :value="internalValue"
    />

    <pop-over :parent-rect="_DOMRect!" ref="popoverComponent">
      <div class="select-dropdown-wrapper" :style="{
        minWidth: _DOMRect.width.value + 'px',
      }">
        <div class="select-dropdown-item" v-for="(option, i) in props.options" :key="i" @mousedown="change(option)">
          <!-- Mousedown instead of click due to event ordering. Prevents hiding of elements to interfere with this event dispatch -->
          <span>{{option.text}}</span>
        </div>
      </div>
    </pop-over>
  </div>
</template>

<script lang="ts">
type InputTypes_ = string | number | boolean | undefined | null;
export type SelectInputTypes = InputTypes_ | InputTypes_[];
</script>

<script setup lang="ts">
import { onMounted, getCurrentInstance, Ref, PropType, ref, watch, computed } from "vue";
import {getEmptyRefDOMBounds, useElementBounding} from './helpers/refDOMBounds';

import PopOver from "./partials/PopOver.vue";
import IodineInput from "@/components/library/IodineInput.vue";
import DropdownArrowIcon from "@/components/library/icons/DropdownArrowIcon.vue";

/*
Reference: https://www.w3schools.com/tags/tag_select.asp
    autofocus   autofocus   Specifies that the drop-down list should automatically get focus when the page loads
    disabled 	disabled 	Specifies that a drop-down list should be disabled
    form 	    form_id 	Defines which form the drop-down list belongs to
    multiple 	multiple 	Specifies that multiple options can be selected at once
    name 	    name 	    Defines a name for the drop-down list
    required 	required 	Specifies that the user is required to select a value before submitting the form
    size 	    number 	    Defines the number of visible options in a drop-down list

Global Attributes: https://www.w3schools.com/tags/ref_standardattributes.asp
    .
    .
    .
Event Attributes: https://www.w3schools.com/tags/ref_eventattributes.asp
    .
    .
    .
*/

interface Option {
  /* https://www.w3schools.com/tags/tag_option.asp */
  disabled?: boolean; // Specifies that an option should be disabled
  label?: string; // Specifies a shorter label for an option
  selected?: boolean; // Specifies that an option should be pre-selected when the page loads
  value: InputTypes_; // Specifies the value of the option
  text: string; // Specifies the text to be displayed for the option
}

const props = defineProps({
  /* Own Attributes */
  options: { type: Array as PropType<Option[]>, default : ()=>[]},
  modelValue: {
    type: null as unknown as PropType<SelectInputTypes>,
    default: () => null as SelectInputTypes,
  },
  label: { type: String, default: "" },

  /* https://www.w3schools.com/tags/tag_select.asp */
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, default: "" },
  multiple: { type: Boolean, default: false },
  name: { type: String, default: "" },
  required: { type: Boolean, default: false },
  size: { type: Number, default: 4 },
  /* https://www.w3schools.com/tags/ref_standardattributes.asp */
});

let _DOMRect = getEmptyRefDOMBounds();
const inputComponent = ref<typeof IodineInput | null>(null);
const popoverComponent = ref<typeof PopOver | null>(null);
const internalValue = ref(null) as Ref<SelectInputTypes>;
//Functions


onMounted(() => {
  const instance = getCurrentInstance();
  const el = instance?.vnode.el as HTMLElement;
  _DOMRect = useElementBounding(el.firstChild as HTMLElement, _DOMRect);

  //find the first option that matches the modelValue
  const option = props.options.find((o) => o.value === props.modelValue);
  if (option) {
    change(option);
  }

});

watch(() => props.modelValue, (value) => {
  internalValue.value = value;
}, {
  deep: true,
  immediate: true,
});

const selectedOptionText = computed({
  get() {
    //find the first option that matches the modelValue
    const option = props.options.find((o) => o.value === internalValue.value);
    if (option) {
      return option.text;
    }
    return "";
  },

  set(value) {
    internalValue.value = value;
  },
});

const emits = defineEmits([
  'update:modelValue',
])

const activate = (event: Event) => {
  if (popoverComponent.value == null) return;

  if (event?.type === 'mousedown')
  {
    popoverComponent.value!.toggle();
    return;
  }

  if (event?.type === 'blur')
  {
    popoverComponent.value!.showing = false;
    return;
  }
};

const change = (o: Option) => {
  // console.log(`DEBUG --`, o);
  internalValue.value = o.value;
  emits('update:modelValue', o.value)
}

</script>

<style lang="sass" scoped>
.iod-container.iod-select
  display: contents

  .dropdown-arrow
    transform: rotate(0deg)
    transition: transform 100ms ease-in-out
    pointer-events: none

    &.open
      transform: rotate(180deg)

.select-dropdown-wrapper
  display: flex
  flex-direction: column
  border: 1px solid var(--color-border)
  border-radius: var(--radius-m)
  background: var(--color-background-soft)
  color: var(--color-text-soft)
  padding-block: .5rem
  user-select: none
  max-height: 100vh
  overflow-y: auto
  font-size: .9em
  box-shadow: var(--shadow-elevation-medium)

  .select-dropdown-item
    width: 100%
    min-height: 2rem
    padding-inline: 1rem
    padding-block: .25rem
    cursor: pointer
    display: flex
    align-items: center
    justify-content: flex-start

    &::before
      content: ""
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      border-radius: inherit
      background-color: currentColor
      opacity: 0

    &:hover
      color: var(--color-text)

      &::before
        opacity: .1

    > span
      position: relative
      z-index: 1
      white-space: nowrap
      overflow: auto
      
      // Dont display the scrollbar
      scrollbar-width: none
      -ms-overflow-style: none
      
      &::-webkit-scrollbar
        display: none

</style>
