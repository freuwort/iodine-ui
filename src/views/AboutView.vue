<template>
    <HeroSection title="Get Started"/>

    <section class="space">
        <div class="limiter text-limiter">
            <h2>CSS Variables</h2>
        </div>
    </section>
</template>

<script setup lang="ts">
    import HeroSection from '@/components/HeroSection.vue'
</script>

<style lang="sass" scoped>
    h2
        padding-bottom: .5rem
        margin-bottom: 1rem
        border-bottom: 2px solid rgb(var(--color-border))
</style>