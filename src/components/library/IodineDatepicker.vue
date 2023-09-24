<template>
    <div class="iod-container iod-datepicker">
        <div class="skipper">
            <IodIconButton type="button" variant="text" icon="keyboard_double_arrow_left" size="small" @click="nudgeMonth(-12)"/>
            <IodIconButton type="button" variant="text" icon="chevron_left" size="small" @click="nudgeMonth(-1)"/>
            <div disabled> {{monthString}} </div>
            <IodIconButton type="button" variant="text" icon="chevron_right" size="small" @click="nudgeMonth(+1)"/>
            <IodIconButton type="button" variant="text" icon="keyboard_double_arrow_right" size="small" @click="nudgeMonth(+12)"/>
        </div>
        <div class="calendar">
            <div class="day-indicator" v-for="abbr, i in weekDayAbbreviations" :key="i">{{ abbr }}</div>
            <div class="day-wrapper" v-for="day, i in days" :key="i" :class="[
                    day.isCurrentMonth ? 'current-month' : 'other-month',
                    {
                        'selected': selectedDays.find((date : Date | undefined) => date?.getTime() === day.date.getTime()),
                        'current-day': day.isCurrentDay,
                        'sub-selected': isSubSelected(day.date),
                        'start-row': isStartRow(i, day.date) && !isEndRow(i, day.date),
                        'end-row': isEndRow(i, day.date) && !isStartRow(i, day.date),
                    }
                ]">
                <button type="button" class="day" :label="day.dayIndex.toString()" @click="selectDay(day)">
                    <div class="text">{{day.dayIndex}}</div>
                </button>
            </div>
        </div>
        <div class="apply-section">
            <IodButton type="button" label="Apply" variant="contained"/>
        </div>
    </div>
</template>

<script lang="ts">
</script>

<script setup lang="ts">
import IodButton from '@/components/library/IodineButton.vue'
import IodIconButton from '@/components/library/IodineIconButton.vue'
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

function isStartRow(i: number, date: Date)
{
    if(i%7 === 0) return true
    if(!selectedDays.value[0]) return false
    if(!selectedDays.value[1]) return false
    return Math.min(selectedDays.value[0].getTime(), selectedDays.value[1].getTime()) === date.getTime()
}

function isEndRow(i: number, date: Date)
{
    if(i%7 === 6) return true
    if(!selectedDays.value[0]) return false
    if(!selectedDays.value[1]) return false
    return Math.max(selectedDays.value[0].getTime(), selectedDays.value[1].getTime()) === date.getTime()
}


function isSubSelected(date: Date) {
    if(selectedDays.value[0] === undefined || selectedDays.value[1] === undefined) {
        return false
    }
    return  (
                date.getTime() > selectedDays.value[0].getTime() &&
                date.getTime() < selectedDays.value[1].getTime()
            ) ||
            (
                date.getTime() < selectedDays.value[0].getTime() &&
                date.getTime() > selectedDays.value[1].getTime()
            )
}

function selectDay(day: {
    date: Date,
    dayIndex: number,
    isCurrentMonth: boolean,
    selected: number,
    isCurrentDay: boolean
})
{
    if(selectFirstDate) {
        selectedDays.value[0] = day.date
        selectFirstDate = false
    } else {
        selectedDays.value[1] = day.date
        selectFirstDate = true
    }
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

const selectedDays = ref([undefined, undefined] as (Date|undefined)[])
let selectFirstDate = true;

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

    let lastMonthDays = weekIndexOfFirstDay.value
    if(lastMonthDays < 3) {
        lastMonthDays += 7
    }

    let preDays =  [] as {
        date: Date,
        dayIndex: number,
        isCurrentMonth: boolean,
        selected: number,
        isCurrentDay: boolean
    }[]
    let currDays = []
    let postDays = []

    for (let i = 1; i < lastMonthDays; i++) {
        preDays.push(
            {
                date: new Date(currentYear.value, currentMonth.value - 1, lastMonthMaxDays.value - (lastMonthDays - i) + 1),
                dayIndex: lastMonthMaxDays.value - (lastMonthDays - i) + 1,
                isCurrentMonth: false,
                selected: -1,
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
    for (let i = 1; i < currentMonthMaxDays.value + 1; i++) {
        currDays.push(
            {
                date: new Date(currentYear.value, currentMonth.value, i),
                dayIndex: i,
                isCurrentMonth: true,
                selected: -1,
                isCurrentDay: currentLiveTime.getDate() === i &&
                    currentLiveTime.getMonth() == currentTime.value.getMonth() &&
                    currentLiveTime.getFullYear() == currentTime.value.getFullYear()
            }
        )
    }
    let nextMonthDays = 7 - ((preDays.length + currDays.length) % 7) + 1
    if(nextMonthDays < 3) {
        nextMonthDays += 7
    }
    for (let i = 1; i < nextMonthDays; i++) {
        postDays.push(
            {
                date: new Date(currentYear.value, currentMonth.value + 1, i),
                dayIndex: i,
                isCurrentMonth: false,
                selected: -1,
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
    let days = [...preDays, ...currDays, ...postDays]

    return days
})

</script>

<style lang="sass" scoped>
    .iod-container.iod-datepicker
        --local-button-size: 2.5rem

        background: var(--color-background)
        border-radius: var(--radius-m)
        border: 1px solid var(--color-border)
        display: flex
        flex-direction: column
        box-sizing: border-box
        height: fit-content

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

        .calendar
            padding: .75rem
            display: grid
            gap: 0
            grid-template-columns: repeat(7, auto)
            grid-template-rows: repeat(6, auto)

            .day-indicator
                color: var(--color-text-soft)
                aspect-ratio: 1
                display: inline-grid
                text-align: center

            .day-wrapper
                display: flex
                align-items: center
                justify-content: center
                height: calc(var(--local-button-size) + .5rem)
                aspect-ratio: 1
                
                &.other-month
                    .day
                        color: var(--color-text-soft-disabled)

                .day
                    flex: 1
                    height: var(--local-button-size)
                    padding: 0
                    margin: 0 .25rem
                    border-radius: var(--radius-m)
                    display: flex
                    align-items: center
                    justify-content: center
                    background: transparent
                    border: none
                    font-family: inherit
                    font-size: inherit
                    cursor: pointer
                    color: var(--color-text-soft)

                    .text
                        display: flex
                        align-items: center
                        justify-content: center
                        color: inherit
                        background: transparent
                        border-radius: var(--radius-m)
                        width: var(--local-button-size)
                        height: var(--local-button-size)

                    &:hover
                        color: var(--color-text-soft)

                        .text
                            background: var(--color-background-soft)

                &.current-day
                    .day
                        .text
                            background-color: var(--color-background-soft)

                &.selected
                    .day
                        background-color: var(--color-background-soft)
                        color: var(--color-on-primary)

                        .text
                            background-color: var(--color-primary)

                &.sub-selected
                    .day
                        background-color: var(--color-background-soft)
                        color: var(--color-text)

                &.selected,
                &.sub-selected
                    &:not(.start-row)
                        .day
                            margin-left: 0
                            justify-content: flex-end
                            border-top-left-radius: 0
                            border-bottom-left-radius: 0

                    &:not(.end-row)
                        .day
                            margin-right: 0
                            justify-content: flex-start
                            border-top-right-radius: 0
                            border-bottom-right-radius: 0

                &.selected
                    &:not(.start-row):not(.end-row)
                        .day
                            border-radius: var(--radius-m)
                            margin: 0 .25rem

                &.sub-selected
                    &:not(.start-row):not(.end-row)
                        .day
                            border-radius: 0
                            margin: 0
                            justify-content: center


        .apply-section
            display: flex
            align-items: center
            padding: 1rem
            gap: .5rem
            border-top: 1px solid var(--color-border)

            .iod-button
                flex: 1
</style>