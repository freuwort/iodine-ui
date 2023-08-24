<template>
    <HeroSection title="Components"/>
    
    <section class="space">
        <div class="limiter text-limiter">
            <div class="flex vertical gap-4">
                <div class="group">
                    <h2>Buttons</h2>
                    <IodineButton label="Open Popup" @click="popup.open()" />
                </div>
    
                <div class="group">
                    <h2>Inputs</h2>
                    <IodineInput type="text" label="Your Address" v-model="text" clearable icon-left="location_on" />
                    <IodineInput type="password" label="Passwort" v-model="text" show-password-score :password-score-function="zxcvbn"/>
                </div>
    
                <div class="group">
                    <h2>Toggles</h2>
                    <IodineToggle type="checkbox" label="Checkbox" />
                    <IodineToggle type="switch" label="Switch" />
                </div>

                <div class="group">
                    <h2>Loader</h2>
                    <IodineLoader type="spinner"/>
                    <IodinePopup ref="popup" backdrop-color="#000000cc">
                        <p>test</p>
                    </IodinePopup>
                </div>
    
                <div class="group">
                    <h2>Picker</h2>
                    <IodineIconpicker>
                        <IodineButton type="button" label="Open Iconpicker"/>
                    </IodineIconpicker>
                    <IodineColorpicker :swatch-palettes="swatchPalettes">
                        <IodineButton type="button" label="Open Colopicker"/>
                    </IodineColorpicker>
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
    import swatchPalettes from '@/components/data/colors/FlatUiColors'
    import HeroSection from '@/components/HeroSection.vue'
    
    const zxcvbn = (password: string) => {
        return {
            score: 4,
        }
    }

    const text = ref('')
    


    const popup = ref({} as typeof IodinePopup)
</script>

<style lang="sass" scoped>
    h2
        padding-bottom: .5rem
        margin-bottom: 1rem
        border-bottom: 2px solid rgb(var(--color-border))
</style>