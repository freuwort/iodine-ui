<template>
    <HeroSection title="Environment"/>

    <section class="space">
        <div class="limiter">
            <h2>CSS Variables</h2>
            <div class="flex vertical gap-1">
                <h3>Border Radius</h3>
                <div class="grid">
                    <RadiusCard title="S – 4px" radius="var(--radius-s)"/>
                    <RadiusCard title="M – 8px" radius="var(--radius-m)" />
                    <RadiusCard title="L – 12px" radius="var(--radius-l)"/>
                    <RadiusCard title="XL – 16px" radius="var(--radius-xl)" />
                </div>
                <hr>
                <h3>Colors</h3>
                <div class="grid">
                    <SwatchCard title="--color-primary" background="var(--color-primary)" color="var(--color-on-primary)" />
                    <SwatchCard title="--color-accent" background="var(--color-accent)" color="var(--color-on-accent)" />
                </div>
                
                <div class="grid">
                    <SwatchCard title="--color-text" background="var(--color-text)" color="var(--color-background)" />
                    <SwatchCard title="--color-text-soft" background="var(--color-text-soft)" color="var(--color-background)" />
                    <SwatchCard title="--color-text-soft-disabled" background="var(--color-text-soft-disabled)" color="var(--color-background)" />
                </div>
                
                <div class="grid">
                    <SwatchCard title="--color-border" background="var(--color-border)" color="var(--color-text)" />
                    <SwatchCard title="--color-border-focused" background="var(--color-border-focused)" color="var(--color-text)" />
                    <SwatchCard title="--color-border-disabled" background="var(--color-border-disabled)" color="var(--color-text)" />
                </div>
                
                <div class="grid">
                    <SwatchCard title="--color-background" background="var(--color-background)" color="var(--color-text)" />
                    <SwatchCard title="--color-background-soft" background="var(--color-background-soft)" color="var(--color-text)" />
                    <SwatchCard title="--color-background-disabled" background="var(--color-background-disabled)" color="var(--color-text)" />
                </div>
                
                <div class="grid">
                    <SwatchCard title="--color-info" background="var(--color-info)" color="white" />
                    <SwatchCard title="--color-success" background="var(--color-success)" color="white" />
                    <SwatchCard title="--color-warning" background="var(--color-warning)" color="var(--color-background)" />
                    <SwatchCard title="--color-error" background="var(--color-error)" color="white" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import SwatchCard from '@/components/SwatchCard.vue'
    import RadiusCard from '@/components/RadiusCard.vue'
    import HeroSection from '@/components/HeroSection.vue'
</script>

<style lang="sass" scoped>
    .grid
        display: grid
        grid-template-columns: repeat(4, 1fr)
        gap: 1rem
</style>