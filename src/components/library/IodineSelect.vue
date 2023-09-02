<template>
  <component
    :is="'input'"
    ref="selectComponent"
    class="iodine-select"
    :autofocus="autofocus"
    :disabled="disabled"
    :form="form"
    :multiple="multiple"
    :name="name"
    :required="required"
    :size="size"
    :value="value"
    @focus="activate"
    @blur="activate"
  >
  <pop-over :parent-rect="_DOMRect!" ref="popoverComponent">
    <div v-for="(option, i) in props.options" :key="i">
      <!-- Mousedown instead of click due to event ordering. Prevents hiding of elements to interfere with this event dispatch -->
      <div @mousedown="change(option)">{{option.text}}</div>
    </div>
  </pop-over>
  </component>
</template>

<script lang="ts">
type InputTypes_ = string | number | boolean | undefined | null;
export type SelectInputTypes = InputTypes_ | InputTypes_[];
</script>

<script setup lang="ts">
import { onMounted, getCurrentInstance, Ref, PropType, ref } from "vue";
import PopOver from "./partials/PopOver.vue";
import {getEmptyRefDOMBounds, useElementBounding} from './helpers/refDOMBounds';

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
const popoverComponent = ref<typeof PopOver | null>(null);
const selectComponent = ref<HTMLInputElement | null>(null);
const value = ref(null) as Ref<SelectInputTypes>;
//Functions


onMounted(() => {
  const instance = getCurrentInstance();
  const el = instance?.vnode.el as HTMLElement;
  _DOMRect = useElementBounding(el, _DOMRect);
  value.value = props.modelValue;

  //find the first option that matches the modelValue
  const option = props.options.find((o) => o.value === props.modelValue);
  if (option) {
    change(option);
  }

});

defineExpose({
  value
})

const emits = defineEmits([
  'update:modelValue',
])

const activate = () => {
  if(popoverComponent.value == null) return;
  popoverComponent.value!.toggle();
};

const change = (o: Option) => {
  console.log(`DEBUG --`, o);
  value.value = o.text;
  selectComponent.value!.value = o.text;
  emits('update:modelValue', o.value)
}

</script>

<style lang="sass" scoped>
.iodine-select
    border: none
    background: var(--color-background-soft)
    color: var(--color-text-soft)
    font-family: var(--font-text)
    padding: 0 .5rem
    min-width: 0
    margin: 0
    border-radius: var(--radius-s)
    height: 2rem
    flex: none
    &:focus, &:active
      outline: none
      border-color: var(--color-border-focused)
      border-style: solid
      box-shadow: 0 0 0 1px var(--color-border-focused)

.popover
    border-color: var(--color-border-focused)
    border-style: solid

    div
      padding-left: .2rem

      &:hover
        background-color: var(--color-background)
        color: var(--color-text-soft)

      + div
        border-color: var(--color-border-focused)
        border-top-style: dashed

</style>
