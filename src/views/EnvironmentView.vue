<template>
    <HeroSection title="Environment"/>

    <section class="space">
        <div class="limiter text-limiter">
            <h2>CSS Variables</h2>
            <div class="flex vertical gap-1">
                <h3>Colors</h3>
                <div class="grid margin-bottom-2">
                    <SwatchCard title="--color-primary" background="rgb(var(--color-primary))" color="rgb(var(--color-on-primary))" />
                    <SwatchCard title="--color-accent" background="rgb(var(--color-accent))" color="rgb(var(--color-on-accent))" />
                    
                    <SwatchCard title="--color-heading" background="rgb(var(--color-heading))" color="rgb(var(--color-background))" />
                    <SwatchCard title="--color-text" background="rgb(var(--color-text))" color="rgb(var(--color-background))" />
                    
                    <SwatchCard title="--color-border" background="rgb(var(--color-border))" color="rgb(var(--color-heading))" />
                    <SwatchCard title="--color-border-disabled" background="rgb(var(--color-border-disabled))" color="rgb(var(--color-heading))" />
                    
                    <SwatchCard title="--color-background" background="rgb(var(--color-background))" color="rgb(var(--color-heading))" />
                    <SwatchCard title="--color-background-soft" background="rgb(var(--color-background-soft))" color="rgb(var(--color-heading))" />
                    <SwatchCard title="--color-background-disabled" background="rgb(var(--color-background-disabled))" color="rgb(var(--color-heading))" />
                    
                    <SwatchCard title="--color-info" background="rgb(var(--color-info))" color="white" />
                    <SwatchCard title="--color-success" background="rgb(var(--color-success))" color="white" />
                    <SwatchCard title="--color-warning" background="rgb(var(--color-warning))" color="rgb(var(--color-background))" />
                    <SwatchCard title="--color-error" background="rgb(var(--color-error))" color="white" />
                </div>
                <h3>Border Radius</h3>
                <div class="grid margin-bottom-2">
                    <RadiusCard title="S – 4px" radius="var(--radius-s)"/>
                    <RadiusCard title="M – 8px" radius="var(--radius-m)" />
                    <RadiusCard title="L – 12px" radius="var(--radius-l)"/>
                    <RadiusCard title="XL – 16px" radius="var(--radius-xl)" />
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
    h2
        padding-bottom: .5rem
        margin-bottom: 1rem
        border-bottom: 2px solid rgb(var(--color-border))

    .grid
        display: grid
        grid-template-columns: 1fr 1fr
        gap: 1rem
</style>