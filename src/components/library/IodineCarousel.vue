<template>
    <div class="iodine-carousel" :style="{
            '--rotated-by': rotatedBy,
            '--items': showItemCount,
            '--snap': snap
        }">
        <area-slider  @wheel="handleWheel" :style="{
            width: '100%',
            height: '100%',
        }"
        unbound-coords
        @update:y="yDragged"
        @drag-start="dragStart"
        @drag-end="dragEnd" />
        <div ref="container"  class="iodine-carousel__container animated">
            <component v-for="(component, index) in items" :key="index" :is="component" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { Ref, VNode, computed, nextTick, onMounted, ref, useSlots, watch } from 'vue';
import AreaSlider from './partials/AreaSlider.vue'

    //INERTIA SETTINGS
        const inertiaMultiplier = 5
        const inertiaCutoff = 0.3
        const inertiaDampening = 0.6
    //END INERTIA SETTINGS

    const showItemCount = ref(5)
    const currentIndex = ref(0)
    const props = defineProps({
        size: {
            type: Number,
            default: 5
        },
        index: {
            type: Number,
            default: 0
        },
        invertScrollDirection: {
            type: Boolean,
            default: false
        }
    })

    const emits = defineEmits([
        'update:index'
    ])

    //REACTIVE VARIABLES
        const items = ref([]) as Ref<VNode[]>
        const snap = ref(0)
        const container = ref(null as unknown as HTMLDivElement | null)
    //END REACTIVE VARIABLES

    //LOCAL VARIABLES
        let dragging = false
        let dragY = 0
        let inertia = 0
        let snapIndexUpper = 0
        let snapIndexLower = 0
    //END LOCAL VARIABLES

    //COMPUTED
        const rotatedBy = computed(()=>{
            if(!container.value) return 0
            return -currentIndex.value - (showItemCount.value-1) / 2 - 1
        })
    //END COMPUTED


    function handleWheel(event: WheelEvent){
        event.preventDefault()
        let delta = event.deltaY / 100
        //cap the delta to [-1 , 1]
        if(delta > 1) delta = 1
        if(delta < -1) delta = -1
        if(!props.invertScrollDirection)
        {
            currentIndex.value -= delta
        }
        else
        {
            currentIndex.value += delta
        }
    }

    function animateInertia()
    {
        if(Math.abs(inertia) > inertiaCutoff)
        {
            inertia *= inertiaDampening
            currentIndex.value -= inertia
            setTimeout(animateInertia, 200);
        }
        else
        {
            currentIndex.value = Math.round(currentIndex.value)
            if(!container.value) return
            container.value.classList.remove('smooth')
        }
    }
    function dragStart(x: number, y: number){
        dragY = y
        dragging = true
        if(!container.value) return
        container.value.classList.add('snappy')
        inertia = 0
    }
    function yDragged(y: number){
        const diff = y - dragY
        withoutAnimation(()=>{
            currentIndex.value -= diff * showItemCount.value
        })
        inertia = diff * showItemCount.value * inertiaMultiplier
        dragY = y
    }
    function dragEnd(x: number, y: number){
        dragging = false
        if(Math.abs(inertia) > 1)
        {
            container.value?.classList.remove('snappy')
            animateInertia()
        }
        else
        {
            currentIndex.value = Math.round(currentIndex.value)
        }
    }
    function disableAnimation(){
        if(!container.value) return
        container.value.classList.add('snappy')
    }
    function flushAndReenableAnimation(){
        if(!container.value) return
        container.value.offsetHeight; // Trigger a reflow, flushing the CSS changes
        container.value.classList.remove('snappy')
    }
    function withoutAnimation(callback: () => void){
        disableAnimation()
        callback()
        flushAndReenableAnimation()
    }

    onMounted(() => {

        showItemCount.value = props.size
        currentIndex.value = props.index
        const slots = useSlots()
        const defaultSlotItems = slots.default?.();
        if (defaultSlotItems) {
            items.value = [...defaultSlotItems]
            currentIndex.value = props.index % items.value.length
            items.value.push(...defaultSlotItems)
            nextTick(() => {
                if(!container.value) return
                snap.value = -container.value.childElementCount / 2
                snapIndexUpper = container.value.childElementCount / 4
                snapIndexLower = -container.value.childElementCount / 4

                if(currentIndex.value > snapIndexUpper)
                {
                    snap.value += container.value.childElementCount / 2
                    snapIndexUpper += container.value.childElementCount / 2
                    snapIndexLower += container.value.childElementCount / 2
                }
                else if(currentIndex.value < snapIndexLower)
                {
                    snap.value -= container.value.childElementCount / 2
                    snapIndexUpper -= container.value.childElementCount / 2
                    snapIndexLower -= container.value.childElementCount / 2
                }
            })
        }
    })

    watch(() => props.index, (x) => {

        //calculate the closest index.
        if(!container.value) return;
        let possibleIndex = x
        let otherPossibleIndex = x + container.value.childElementCount / 2

        if(Math.abs(possibleIndex - currentIndex.value) > Math.abs(otherPossibleIndex - currentIndex.value))
        {
            possibleIndex = otherPossibleIndex
        }

        if(dragging) return
        currentIndex.value = possibleIndex
        inertia = 0;
    })

    watch(currentIndex, (newIndex, lastIndex) => {
        if(!container.value) return
        let newIndexNormalized = Math.round(newIndex) % (container.value.childElementCount / 2);
        const lastIndexNormalized = Math.round(lastIndex) % (container.value.childElementCount / 2);
        if(newIndexNormalized !== lastIndexNormalized) 
        {
            if(newIndexNormalized < 0)
            {
                newIndexNormalized += container.value.childElementCount / 2
            }
            if(!Number.isNaN(newIndexNormalized)){
                emits('update:index', newIndexNormalized)
            }
        }
        if(newIndex > snapIndexUpper)
        {
            snap.value += container.value.childElementCount / 2
            snapIndexUpper += container.value.childElementCount / 2
            snapIndexLower += container.value.childElementCount / 2
        }
        else if(newIndex < snapIndexLower)
        {
            snap.value -= container.value.childElementCount / 2
            snapIndexUpper -= container.value.childElementCount / 2
            snapIndexLower -= container.value.childElementCount / 2
        }
    })

</script>

<style lang="sass" scoped>

.iodine-carousel
    --item-height: 2.5rem
    --items: 5
    --rotated-by: 0
    --snap: 0
    width: fit-content
    padding-left: .1rem
    padding-right: .1rem
    height: calc(var(--item-height) * var(--items))
    position: relative

    // font-size: 1.5rem
    // color: white

    // We want to have a fading in and out effect based on where it is on the y axis
    // We can do this by using a gradient background and changing the opacity of the gradient
    // Then we can use it to mask the content


    // We want to mask the content so that it doesn't overflow

    overflow: hidden
    mask: linear-gradient(rgb(white, 0%) 0%, rgb(white, 60%) calc(50% - var(--item-height) / 2), rgb(white, 100%) calc(50% - var(--item-height) / 2), rgb(white, 100%) calc(50% + var(--item-height) / 2), rgb(white, 60%) calc(50% + var(--item-height) / 2), rgb(white, 0%) 100%)

    &::before,
    &::after
        content: ''
        position: absolute
        top: 50%
        width: 100%
        height: 0
        pointer-events: none
        border-top: 1px solid var(--color-border)

    &::before
        transform: translateY(calc(var(--item-height) / 2 * -1 + 1px))

    &::after
        transform: translateY(calc(var(--item-height) / 2 * 1 - 1px))

    .iodine-carousel__container
        width: 100%
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        select: none
        pointer-events: none
        transform: translateY(calc(var(--item-height) * var(--rotated-by)))
        top: calc(var(--item-height) * var(--snap))

        &.animated
            transition: transform 200ms ease-in-out
        &.snappy
            transition: none !important

        &.smooth
            transition: transform 200ms linear !important

        ::v-deep div
            width: var(--item-height)
            height: var(--item-height)
            display: flex
            justify-content: center
            align-items: center

</style>