<template>
    <Teleport to="body">
        <div class="popover" ref="popoverDiv" :style="[positionCSS,
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
import { PropType, StyleValue, computed, onMounted, ref } from 'vue';
import {refDOMBounds, getEmptyRefDOMBounds, useElementBounding} from '../helpers/refDOMBounds';




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
    },
    maySlideAroundToTheLeft: {
        type: Boolean,
        default: false
    }
});

const showing = ref(false);
const popoverDiv = ref({} as HTMLInputElement)

let ourBounds = getEmptyRefDOMBounds();

const toggle = () => {
    showing.value = !showing.value;
}

onMounted(() => {
    ourBounds = useElementBounding(popoverDiv.value, ourBounds);
})

defineExpose({
    toggle,
    showing
})

const positionCSS = computed(() => {
    if(props.parentRect == null) return {};

    const bodyRect = document.body.getBoundingClientRect();

    const offsetToBody = {
        top: props.parentRect.top.value - bodyRect.top,
        left: props.parentRect.left.value - bodyRect.left,
        bottom: props.parentRect.bottom.value - bodyRect.top,
    }

    const scrollBarWidth = (window.innerWidth - document.documentElement.clientWidth);
    const graceMargin = 10;

    const css : StyleValue = {
        left: `${offsetToBody.left}px`,
        maxWidth: `calc(100vw - ${scrollBarWidth + graceMargin*2}px)`
    }

    if(ourBounds.width.value + offsetToBody.left > bodyRect.width - scrollBarWidth) {
        css.left = `${bodyRect.width - ourBounds.width.value - graceMargin}px`;
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
    z-index: 2147483647
    position: absolute
</style>
