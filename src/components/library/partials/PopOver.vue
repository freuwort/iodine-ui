<template>
    <Teleport to="body">
        <div class="popover" :style="[positionCSS,
         {
            display: showing ? '' : 'none'
         }
        ]">
            <slot>
            </slot>
        </div>
    </Teleport>
</template>

<script lang="ts"> 

</script>

<script setup lang="ts">
import { PropType, StyleValue, computed, getCurrentInstance, ref } from 'vue';
import {refDOMBounds, getEmptyRefDOMBounds} from '../helpers/refDOMBounds';




const props = defineProps({
    parentRect: {
        type: Object as PropType<refDOMBounds>,
        default: (): refDOMBounds => {
            return getEmptyRefDOMBounds();
        }
    },
    placement: {
        type: String as PropType<'top' | 'bottom'>,
        default: 'top'
    },
    visible: {
        type: Boolean,
        default: false
    }
});

const showing = ref(false);

const toggle = () => {
    showing.value = !showing.value;
}

defineExpose({
    toggle
})

const positionCSS = computed(() => {
    if(props.parentRect == null) return {};

    const bodyRect = document.body.getBoundingClientRect();

    const offsetToBody = {
        top: props.parentRect.top.value - bodyRect.top,
        left: props.parentRect.left.value - bodyRect.left,
        bottom: props.parentRect.bottom.value - bodyRect.top,
    }

    const css : StyleValue = {
        left: `${offsetToBody.left}px`,
        width: `${props.parentRect.width.value}px`,
    }

    switch (props.placement) {
        case 'top':
            css.top = `${offsetToBody.top}px`;
            css.transform = `translateY(-100%)`;
            break;
        case 'bottom':
            css.top = `${offsetToBody.bottom}px`;
            break;
    }
    return css;
});
</script>

<style lang="sass" scoped>
.popover
    background-color: var(--color-background-soft)
    z-index: 2147483647
    position: absolute
</style>
