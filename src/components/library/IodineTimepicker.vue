<template>
    <div class="iod-container iod-timepicker">
        <div class="picker">
            <IodineCarousel :size="5" v-model:index="mHours" v-if="hours">
                <div v-for="num in usesAmPm ? 12 : 24" :key="num">
                    {{ (num - (usesAmPm ? 0 : 1)) > 9 ? (num - (usesAmPm ? 0 : 1)) : '0' + (num - (usesAmPm ? 0 : 1)) }}
                </div>
            </IodineCarousel>
            <div class="text-decoration" v-if="hours && minutes">:</div>
            <IodineCarousel :size="5" v-model:index="mMinutes" v-if="minutes">
                <div v-for="num in 60" :key="num">
                    {{ (num-1) > 9 ? (num-1) : '0' + (num-1) }}
                </div>
            </IodineCarousel>
            <div class="text-decoration" v-if="minutes && seconds">:</div>
            <IodineCarousel :size="5" v-model:index="mSeconds" v-if="seconds">
                <div v-for="num in 60" :key="num">
                    {{ (num-1) > 9 ? (num-1) : '0' + (num-1) }}
                </div>
            </IodineCarousel>
            <div class="text-decoration"></div>
            <IodineCarousel :size="3" v-model:index="mAmPm" v-if="usesAmPm">
                <div>AM</div>
                <div>PM</div>
                <div>AM</div>
                <div>PM</div>
            </IodineCarousel>
        </div>
        <div class="apply-section">
            <IodButton type="button" label="Apply" variant="contained" @click="apply"/>
        </div>
    </div>
</template>

<script lang="ts">
</script>

<script setup lang="ts">
import IodButton from '@/components/library/IodineButton.vue'
import IodineCarousel from '@/components/library/IodineCarousel.vue'
import { PropType, Ref, computed, onMounted, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '00:00:00'
    },
    usesAmPm: {
        type: Boolean,
        default: false
    },
    hours: {
        type: Boolean,
        default: true
    },
    minutes: {
        type: Boolean,
        default: true
    },
    seconds: {
        type: Boolean,
        default: false
    },
})

const mHours = ref(0);
const mMinutes = ref(0);
const mSeconds = ref(0);
const mAmPm = ref(0);

function apply() {
    emits('apply')
}

const emits = defineEmits([
    'update:modelValue',
    'apply',
])

onMounted(() => {
    const time = props.modelValue.split(':')
    if(!time[0]) { return; }
    mHours.value = parseInt(time[0])
    if(!time[1]) { return; }
    mMinutes.value = parseInt(time[1])
    if(!time[2]) { return; }
    mSeconds.value = parseInt(time[2])
})

watch([mHours, mMinutes, mSeconds, mAmPm], ([newHour, newMinute, newSecond, newAmPm]) => {

    if(!props.usesAmPm){
        emits('update:modelValue', `${newHour > 9 ? newHour : '0' + newHour}:${newMinute > 9 ? newMinute : '0' + newMinute}:${newSecond > 9 ? newSecond : '0' + newSecond}`);
        return;
    }

    let h = newHour;
    let m = newMinute;
    let s = newSecond;

    const AM = newAmPm % 2 == 0;

    if(AM)
    {
        if(h == 12) h = 0;
    }
    else
    {
        h += 12;
        h = h % 24;
    }

    emits('update:modelValue', `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`);
});

</script>

<style lang="sass" scoped>
    .iod-container.iod-timepicker
        --local-button-size: 2.5rem

        background: var(--color-background)
        border-radius: var(--radius-m)
        border: 1px solid var(--color-border)
        display: flex
        flex-direction: column
        box-sizing: border-box
        height: fit-content
        width: 20rem

        *
            box-sizing: inherit

        .skipper
            display: flex
            align-items: center
            padding: 1rem
            gap: 0
            border-bottom: 1px solid var(--color-border)

            .iod-button
                flex: none
                --local-color-background: var(--color-text)

            div
                flex: 1
                color: var(--color-text)
                user-select: none
                text-align: center

        .picker
            padding: 1rem
            display: flex
            align-items: center
            justify-content: center
            user-select: none

            .text-decoration
                color: var(--color-text-soft)
                width: 1rem
                text-align: center

            .iodine-carousel
                width: 4rem !important

        .apply-section
            display: flex
            align-items: center
            padding: 1rem
            gap: .5rem
            border-top: 1px solid var(--color-border)

            .iod-button
                flex: 1
</style>