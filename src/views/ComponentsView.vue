<template>
    <main>
        <section class="space">
            <div class="limiter inner-layout">
                <div class="sidebar">
                    <h2>Variables</h2>
                    <div class="flex vertical gap-1">
                        <h3>Colors (type color)</h3>
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
                        <h3>Border Radius (type length)</h3>
                        <div class="grid margin-bottom-2">
                            <RadiusCard title="S – 4px" radius="var(--radius-s)"/>
                            <RadiusCard title="M – 8px" radius="var(--radius-m)" />
                            <RadiusCard title="L – 12px" radius="var(--radius-l)"/>
                            <RadiusCard title="XL – 16px" radius="var(--radius-xl)" />
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="flex vertical gap-1">
                        <h2>Components</h2>
                        <h3>Buttons</h3>
                        <IodineButton label="Open Popup" @click="popup.open()" />
                        <h3>Inputs</h3>
                        <IodineInput label="Your Address" clearable icon-left="location_on" />
                        <h3>Toggles</h3>
                        <IodineToggle type="checkbox" label="Checkbox" />
                        <IodineToggle type="switch" label="Switch" />
                        <h3>Loader</h3>
                        <IodineLoader type="spinner"/>
                        <IodinePopup ref="popup" backdrop-color="#000000cc">
                            <p>test</p>
                        </IodinePopup>
                        <h3>Picker</h3>
                        <IodineIconpicker>
                            <button>Open Picker</button>
                        </IodineIconpicker>
                        <IodineColorpicker :swatch-palettes="swatchPalettes">
                            <button>Open Colopicker</button>
                        </IodineColorpicker>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    import IodineButton from '@/components/library/IodineButton.vue'
    import IodineInput from '@/components/library/IodineInput.vue'
    import IodineToggle from '@/components/library/IodineToggle.vue'
    import IodineLoader from '@/components/library/IodineLoader.vue'
    import IodinePopup from '@/components/library/IodinePopup.vue'
    import IodineColorpicker from '@/components/library/IodineColorpicker.vue'
    import IodineIconpicker from '@/components/library/IodineIconpicker.vue'

    import SwatchCard from '@/components/SwatchCard.vue'
    import RadiusCard from '@/components/RadiusCard.vue'

    import swatchPalettes from '@/components/data/flat_ui_colors.swatches'



    const popup = ref({} as typeof IodinePopup)
</script>

<style lang="sass" scoped>
    .space
        padding-block: 10rem

    .inner-layout
        display: flex
        gap: 4rem

        h2
            padding-bottom: .5rem
            margin-bottom: 1rem
            border-bottom: 2px solid rgb(var(--color-border))

        .sidebar
            width: 350px

        .content
            flex: 1

    .grid
        display: grid
        grid-template-columns: 1fr
        gap: 1rem
</style>