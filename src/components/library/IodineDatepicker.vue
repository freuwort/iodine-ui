<template>
    <div class="iod-container iod-datepicker">
        <div class="skipper">
            <iodine-button border shape="radius-l" @click="nudgeMonth(-12)">&lt;&lt;</iodine-button>
            <iodine-button border shape="radius-l" @click="nudgeMonth(-1)">&lt;</iodine-button>
            <div disabled> {{monthString}} </div>
            <iodine-button border shape="radius-l" @click="nudgeMonth(+1)">&gt;</iodine-button>
            <iodine-button border shape="radius-l" @click="nudgeMonth(+12)">&gt;&gt;</iodine-button>
        </div>
        <div class="calendar">
            <div class="dayIndicator" v-for="abbr, i in weekDayAbbreviations" :key="i">{{ abbr }}</div>
            <div :class="[
                'day',
                day.isCurrentMonth ? 'current-month' : 'other-month',
                day.isCurrentDay  ? 'current-day' : ''
            ]" v-for="day, i in days" :key="i">
                {{day.dayIndex}}
            </div>
        </div>
        <div class="applySection">
            <iodine-button border shape="radius-l"> APPLY </iodine-button>
        </div>
    </div>
</template>

<script lang="ts">
</script>

<script setup lang="ts">
import IodineButton from '@/components/library/IodineButton.vue'
import { computed, ref } from 'vue';

function nudgeMonth(nudge: number) {
    let year = currentTime.value.getFullYear()
    let month = currentTime.value.getMonth() + nudge
    let date = currentTime.value.getDate()

    while(month < 0) {
        month += 12
        year -= 1
    }
    while(month > 11) {
        month -=12
        year += 1
    }

    currentTime.value = new Date(year, month, date)
}

function getWeekDays(locale: Intl.LocalesArgument)
{
    var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
    var weekDays = [];
    for(let i = 0; i < 7; i++)
    {
        weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'short' }));
        baseDate.setDate(baseDate.getDate() + 1);
    }
    return weekDays;
}

const weekDayAbbreviations = getWeekDays('de-DE')

const currentLiveTime = new Date()
const currentTime = ref(new Date())
const currentYear = computed(()=>{
    return currentTime.value.getFullYear()
})
const currentMonth = computed(()=>{
    return currentTime.value.getMonth()
})

const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
}

const monthString = computed(()=>{
    return currentTime.value.toLocaleString('default', { month: 'long' }) + ' ' + currentYear.value
})

const currentMonthMaxDays = computed(()=>{
    return daysInMonth(currentMonth.value, currentYear.value)
})
const lastMonthMaxDays = computed(()=>{
    return daysInMonth(currentMonth.value - 1, currentYear.value)
})

const weekIndexOfFirstDay = computed(()=>{
    return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

const days = computed(()=>{
    const days = []

    let lastMonthDays = weekIndexOfFirstDay.value
    if(lastMonthDays < 3) {
        lastMonthDays += 7
    }

    for (let i = 1; i < lastMonthDays; i++) {
        days.push(
            {
                dayIndex: lastMonthMaxDays.value - (lastMonthDays - i) + 1,
                isCurrentMonth: false,
                isCurrentDay: currentLiveTime.getDate() === lastMonthMaxDays.value - (lastMonthDays - i) + 1 &&
                    (
                        currentLiveTime.getMonth() == currentTime.value.getMonth() - 1 ||
                        (
                            currentLiveTime.getMonth() == 11 && currentTime.value.getMonth() == 0 &&
                            currentLiveTime.getFullYear() + 1 == currentTime.value.getFullYear()
                        )
                    )
            }
        )
    }
    for (let i = 1; i < currentMonthMaxDays.value; i++) {
        days.push(
            {
                dayIndex: i,
                isCurrentMonth: true,
                isCurrentDay: currentLiveTime.getDate() === i &&
                    currentLiveTime.getMonth() == currentTime.value.getMonth() &&
                    currentLiveTime.getFullYear() == currentTime.value.getFullYear()
            }
        )
    }
    let nextMonthDays = 7 - (days.length % 7) + 1
    if(nextMonthDays < 3) {
        nextMonthDays += 7
    }
    for (let i = 1; i < nextMonthDays; i++) {
        days.push(
            {
                dayIndex: i,
                isCurrentMonth: false,
                isCurrentDay: currentLiveTime.getDate() === i &&
                (
                    currentLiveTime.getMonth() == currentTime.value.getMonth() +1 ||
                    (
                        currentLiveTime.getMonth() == 0 && currentTime.value.getMonth() == 11 &&
                        currentLiveTime.getFullYear() - 1 == currentTime.value.getFullYear()
                    )
                )
            }
        )
    }
    return days
})

</script>

<style lang="sass" scoped>
    .iod-container.iod-datepicker
        background: var(--color-background)
        border-radius: var(--radius-m)
        padding: .5rem 0
        border: 1px solid var(--color-border)
        width: 320px
        height: fit-content
        display: flex
        flex-direction: column
        box-sizing: border-box

        *
            box-sizing: inherit


        .skipper
            padding: .5rem
            padding-bottom: 1rem
            width: 100%
            height: fit-content
            gap: .5rem
            background: var(--color-background)
            border-bottom: 1px solid var(--color-border)
            .iod-button
                --local-color-background: var(--color-background)
                --local-color-text: var(--color-text)
                width: 32px
                &:nth-child(1),
                &:nth-child(4)
                    margin-right: .5rem
            div
                width: calc(calc(100% - 128px) - 1rem)
                height:100%
                color: var(--color-text)
                align-items: center
                justify-content: center
                display: inline-flex
                height: 2.5em
                user-select: none
        .applySection
            padding: .5rem
            padding-top: 1rem
            width: 100%
            height: fit-content
            gap: .5rem
            background: var(--color-background)
            border-top: 1px solid var(--color-border)
            .iod-button
                --local-color-background: var(--color-background)
                --local-color-text: var(--color-text)
                width: 100%
                &:focus
                    background: var(--color-primary) !important

        .calendar
            padding: .5rem
            height: fit-content
            aspect-ratio: 1
            display: grid
            gap: .5rem
            grid-template-columns: auto auto auto auto auto auto auto
            grid-template-rows: auto auto auto auto auto auto
            background: var(--color-background)

            > div
                border-style: solid
                border-width: 2px
                border-color: rgba(0,0,0,0)
                align-items: center
                border-radius: 20%
                width: 100%
                height: 100%

            .dayIndicator
                color: var(--color-text-soft)
                aspect-ratio: 1
                display: inline-grid
                text-align: center
            .day
                color: var(--color-text)
                aspect-ratio: 1
                display: inline-grid
                text-align: center
                border-style: solid
                border-width: 2px

                &.other-month
                    color: var(--color-text-soft-disabled)
                &.current-day
                    background-color: var(--color-primary)
                    color: var(--color-background)
                &:hover
                    border-color: var(--color-primary)
                    border-style: solid
                    border-width: 2px
                    cursor: pointer
</style>