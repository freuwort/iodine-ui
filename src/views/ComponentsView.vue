<template>
    <HeroSection title="Components"/>
    
    <section class="space">
        <div class="limiter">
            <div class="flex vertical gap-4">
                <div class="group">
                    <h2>Button Variations</h2>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" label="Label" />
                        <IodineButton class="flex-1" label="Label" border />
                        <IodineButton class="flex-1" label="Label" disabled />
                        <IodineButton class="flex-1" label="Label" border disabled />
                        <IodineButton class="flex-1" label="Label" loading />
                        <IodineButton class="flex-1" label="Label" border loading />
                    </div>
                    <hr>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" variant="filled" label="Label" />
                        <IodineButton class="flex-1" variant="filled" label="Label" border />
                        <IodineButton class="flex-1" variant="filled" label="Label" disabled />
                        <IodineButton class="flex-1" variant="filled" label="Label" border disabled />
                        <IodineButton class="flex-1" variant="filled" label="Label" loading />
                        <IodineButton class="flex-1" variant="filled" label="Label" border loading />
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" variant="contained" label="Label" />
                        <IodineButton class="flex-1" variant="contained" label="Label" border />
                        <IodineButton class="flex-1" variant="contained" label="Label" disabled />
                        <IodineButton class="flex-1" variant="contained" label="Label" border disabled />
                        <IodineButton class="flex-1" variant="contained" label="Label" loading />
                        <IodineButton class="flex-1" variant="contained" label="Label" border loading />
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" variant="text" label="Label" />
                        <IodineButton class="flex-1" variant="text" label="Label" border />
                        <IodineButton class="flex-1" variant="text" label="Label" disabled />
                        <IodineButton class="flex-1" variant="text" label="Label" border disabled />
                        <IodineButton class="flex-1" variant="text" label="Label" loading />
                        <IodineButton class="flex-1" variant="text" label="Label" border loading />
                    </div>

                    <h2>Button Colors</h2>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" label="Primary"/>
                        <IodineButton class="flex-1" label="Info" color-preset="info"/>
                        <IodineButton class="flex-1" label="Success" color-preset="success"/>
                        <IodineButton class="flex-1" label="Warning" color-preset="warning"/>
                        <IodineButton class="flex-1" label="Error" color-preset="error"/>
                        <IodineButton class="flex-1" label="Custom" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                    </div>
                    <hr>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" label="Primary" size="small"/>
                        <IodineButton class="flex-1" label="Info" size="small" color-preset="info"/>
                        <IodineButton class="flex-1" label="Success" size="small" color-preset="success"/>
                        <IodineButton class="flex-1" label="Warning" size="small" color-preset="warning"/>
                        <IodineButton class="flex-1" label="Error" size="small" color-preset="error"/>
                        <IodineButton class="flex-1" label="Custom" size="small" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" label="Primary" size="normal"/>
                        <IodineButton class="flex-1" label="Info" size="normal" color-preset="info"/>
                        <IodineButton class="flex-1" label="Success" size="normal" color-preset="success"/>
                        <IodineButton class="flex-1" label="Warning" size="normal" color-preset="warning"/>
                        <IodineButton class="flex-1" label="Error" size="normal" color-preset="error"/>
                        <IodineButton class="flex-1" label="Custom" size="normal" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" label="Primary" size="large"/>
                        <IodineButton class="flex-1" label="Info" size="large" color-preset="info"/>
                        <IodineButton class="flex-1" label="Success" size="large" color-preset="success"/>
                        <IodineButton class="flex-1" label="Warning" size="large" color-preset="warning"/>
                        <IodineButton class="flex-1" label="Error" size="large" color-preset="error"/>
                        <IodineButton class="flex-1" label="Custom" size="large" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                    </div>
                </div>
    
                <div class="group">
                    <h2>Inputs</h2>
                    <div class="flex gap-1 v-center">
                        <IodineInput class="flex-1" type="text" label="Label" required />
                        <IodineInput class="flex-1" type="text" label="Label" required border />
                        <IodineInput class="flex-1" type="text" label="Label" required disabled />
                        <IodineInput class="flex-1" type="text" label="Label" required border disabled />
                    </div>

                    <div class="flex gap-1 v-center">
                        <IodineInput class="flex-1" type="password" label="Label" />
                        <IodineInput class="flex-1" type="password" label="Label" border />
                        <IodineInput class="flex-1" type="password" label="Label" disabled />
                        <IodineInput class="flex-1" type="password" label="Label" border disabled />
                    </div>

                    <div class="flex gap-1 v-center">
                        <IodineInput class="flex-1" type="number" label="Label" />
                        <IodineInput class="flex-1" type="number" label="Label" border />
                        <IodineInput class="flex-1" type="number" label="Label" disabled />
                        <IodineInput class="flex-1" type="number" label="Label" border disabled />
                    </div>
                </div>
    
                <div class="group">
                    <h2>Toggles</h2>
                    <div class="flex gap-1 v-center">
                        <IodineToggle class="flex-1" v-model="bool" type="checkbox" label="Checkbox" />
                        <IodineToggle class="flex-1" v-model="bool" type="checkbox" label="Checkbox" border />
                        <IodineToggle class="flex-1" v-model="bool" type="checkbox" label="Checkbox" disabled />
                        <IodineToggle class="flex-1" v-model="bool" type="checkbox" label="Checkbox" disabled border />
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineToggle class="flex-1" v-model="bool" type="switch" label="Switch" />
                        <IodineToggle class="flex-1" v-model="bool" type="switch" label="Switch" border />
                        <IodineToggle class="flex-1" v-model="bool" type="switch" label="Switch" disabled />
                        <IodineToggle class="flex-1" v-model="bool" type="switch" label="Switch" disabled border />
                    </div>
                </div>

                <div class="group">
                    <h2>Loader</h2>
                    <IodineLoader type="spinner"/>
                </div>
                
                <div class="group">
                    <h2>Popup</h2>
                    <div>
                        <IodineButton label="Open Popup" @click="popup.open()" />
                    </div>
                    <IodinePopup ref="popup" backdrop-color="#000000cc">
                        <p>test</p>
                    </IodinePopup>
                </div>
    
                <div class="group">
                    <h2>Picker</h2>
                    <div class="flex gap-1">
                        <IodineIconpicker :icons="icons">
                            <IodineButton type="button" label="Open Iconpicker"/>
                        </IodineIconpicker>
                        <IodineColorpicker :swatch-palettes="swatchPalettes">
                            <IodineButton type="button" label="Open Colopicker"/>
                        </IodineColorpicker>
                    </div>
                </div>
            </div>
        </div>
    </section>
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

    import HeroSection from '@/components/HeroSection.vue'
    
    import swatchPalettes from '@/components/data/colors/FlatUiColors'
    import icons from '@/components/data/icons/MaterialSymbols'
    


    const popup = ref({} as typeof IodinePopup)
    const bool = ref(false)
</script>

<style lang="sass" scoped>
    .group
        display: flex
        flex-direction: column
        gap: 1rem
</style>