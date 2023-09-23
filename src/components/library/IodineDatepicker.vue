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
                        'start-row': i%7 === 0 || selectedDays[0] && selectedDays[1] && Math.min(selectedDays[0].getTime(), selectedDays[1].getTime()) === day.date.getTime(),
                        'end-row': i%7 === 6 || selectedDays[0] && selectedDays[1] && Math.max(selectedDays[0].getTime(), selectedDays[1].getTime()) === day.date.getTime(),
                    }
                ]">
                <button type="button" class="day" :label="day.dayIndex.toString()" @click="selectDay(day)">{{day.dayIndex}}</button>
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
                    height: var(--local-button-size)
                    aspect-ratio: 1
                    padding: 0
                    margin: 0
                    display: flex
                    align-items: center
                    justify-content: center
                    border-radius: var(--radius-m)
                    background: transparent
                    border: none
                    font-family: inherit
                    font-size: inherit
                    cursor: pointer
                    color: var(--color-text-soft)

                    &:hover
                        background: var(--color-background-soft)
                        color: var(--color-text-soft)
                        
                &.current-day
                    .day
                        background-color: var(--color-background-soft)

                &.selected
                    .day
                        background-color: var(--color-primary)
                        color: var(--color-on-primary)
                &.sub-selected
                    .day
                        background-color: var(--color-accent)
                        color: var(--color-on-primary)
                        border-radius: 0px
                &.end-row.sub-selected,
                &.end-row.selected
                    .day
                        border-radius: 0px
                        border-top-right-radius: var(--radius-m)
                        border-bottom-right-radius: var(--radius-m)
                &.start-row.sub-selected,
                &.start-row.selected
                    .day
                        border-radius: 0px
                        border-top-left-radius: var(--radius-m)
                        border-bottom-left-radius: var(--radius-m)

                &.start-row,
                &.end-row,
                    &.sub-selected
                        .day
                            width: calc(var(--local-button-size) + .5rem)
                &.start-row
                    &.selected,
                    &.sub-selected
                        .day
                            width: calc(var(--local-button-size) + .25rem)
                            transform: translateX(.25rem)
                &.end-row
                    &.selected,
                    &.sub-selected
                        .day
                            width: calc(var(--local-button-size) + .25rem)
                            transform: translateX(-.25rem)


        .apply-section
            display: flex
            align-items: center
            padding: 1rem
            gap: .5rem
            border-top: 1px solid var(--color-border)

            .iod-button
                flex: 1
</style>