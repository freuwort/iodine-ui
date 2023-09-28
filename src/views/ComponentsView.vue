<template>
    <HeroSection title="Components"/>
    
    <section class="space">
        <div class="limiter">
            <div class="flex vertical gap-4">
                <div class="group">
                    <h2>Icons</h2>
                    <div class="flex gap-1 v-center">
                        <IodineIcon icon="home"/>
                        <IodineIcon icon="info"/>
                        <IodineIcon icon="check_circle"/>
                        <IodineIcon icon="warning"/>
                        <IodineIcon icon="error"/>
                        <IodineIcon icon="dashboard"/>
                    </div>
                    <hr>
                    <div class="flex gap-1 v-center">
                        <IodineIcon icon="/images/iodine_logo.svg" image-icon/>
                    </div>
                </div>

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

                    <h2>Button Colors & Sizes</h2>
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

                    <h2>Button Shapes</h2>
                    <div class="flex gap-1 v-center">
                        <IodineButton class="flex-1" label="Label" shape="rect"/>
                        <IodineButton class="flex-1" label="Label" shape="radius-s"/>
                        <IodineButton class="flex-1" label="Label" shape="radius-m"/>
                        <IodineButton class="flex-1" label="Label" shape="radius-l"/>
                        <IodineButton class="flex-1" label="Label" shape="radius-xl"/>
                        <IodineButton class="flex-1" label="Label" shape="pill"/>
                    </div>
                </div>

                <div class="flex gap-3">
                    <div class="group flex-1">
                        <h2>Icon Button Variations</h2>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton icon="token" />
                            <IodineIconButton icon="token" border />
                            <IodineIconButton icon="token" disabled />
                            <IodineIconButton icon="token" border disabled />
                            <IodineIconButton icon="token" loading />
                            <IodineIconButton icon="token" border loading />
                        </div>
                        <hr>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton variant="filled" icon="token" />
                            <IodineIconButton variant="filled" icon="token" border />
                            <IodineIconButton variant="filled" icon="token" disabled />
                            <IodineIconButton variant="filled" icon="token" border disabled />
                            <IodineIconButton variant="filled" icon="token" loading />
                            <IodineIconButton variant="filled" icon="token" border loading />
                        </div>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton variant="contained" icon="token" />
                            <IodineIconButton variant="contained" icon="token" border />
                            <IodineIconButton variant="contained" icon="token" disabled />
                            <IodineIconButton variant="contained" icon="token" border disabled />
                            <IodineIconButton variant="contained" icon="token" loading />
                            <IodineIconButton variant="contained" icon="token" border loading />
                        </div>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton variant="text" icon="token" />
                            <IodineIconButton variant="text" icon="token" border />
                            <IodineIconButton variant="text" icon="token" disabled />
                            <IodineIconButton variant="text" icon="token" border disabled />
                            <IodineIconButton variant="text" icon="token" loading />
                            <IodineIconButton variant="text" icon="token" border loading />
                        </div>
                    </div>
    
                    <div class="group flex-1">
                        <h2>Icon Button Colors & Sizes</h2>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton icon="token"/>
                            <IodineIconButton icon="info" color-preset="info"/>
                            <IodineIconButton icon="check_circle" color-preset="success"/>
                            <IodineIconButton icon="warning" color-preset="warning"/>
                            <IodineIconButton icon="error" color-preset="error"/>
                            <IodineIconButton icon="dashboard" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                        </div>
                        <hr>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton icon="token" size="small"/>
                            <IodineIconButton icon="info" size="small" color-preset="info"/>
                            <IodineIconButton icon="check_circle" size="small" color-preset="success"/>
                            <IodineIconButton icon="warning" size="small" color-preset="warning"/>
                            <IodineIconButton icon="error" size="small" color-preset="error"/>
                            <IodineIconButton icon="dashboard" size="small" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                        </div>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton icon="token" size="normal"/>
                            <IodineIconButton icon="info" size="normal" color-preset="info"/>
                            <IodineIconButton icon="check_circle" size="normal" color-preset="success"/>
                            <IodineIconButton icon="warning" size="normal" color-preset="warning"/>
                            <IodineIconButton icon="error" size="normal" color-preset="error"/>
                            <IodineIconButton icon="dashboard" size="normal" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                        </div>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton icon="token" size="large"/>
                            <IodineIconButton icon="info" size="large" color-preset="info"/>
                            <IodineIconButton icon="check_circle" size="large" color-preset="success"/>
                            <IodineIconButton icon="warning" size="large" color-preset="warning"/>
                            <IodineIconButton icon="error" size="large" color-preset="error"/>
                            <IodineIconButton icon="dashboard" size="large" style="--local-color-background: #130f40; --local-color-text: #f9ca24;"/>
                        </div>
                    </div>

                    <div class="group flex-1">
                        <h2>Icon Button Shapes</h2>
                        <div class="flex gap-1 v-center">
                            <IodineIconButton icon="token" shape="rect"/>
                            <IodineIconButton icon="token" shape="radius-s"/>
                            <IodineIconButton icon="token" shape="radius-m"/>
                            <IodineIconButton icon="token" shape="radius-l"/>
                            <IodineIconButton icon="token" shape="radius-xl"/>
                            <IodineIconButton icon="token" shape="pill"/>
                        </div>
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
                    <h2>Selects</h2>
                    <div class="flex gap-1 v-center">
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" required />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" required border />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" required disabled />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" required border disabled />
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" border />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" indicatorStyle="box" />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" indicatorStyle="box" border />
                    </div>
                    <div class="flex gap-1 v-center">
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" multiple required :max-size="'100px'" />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" multiple required border />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" multiple required indicatorStyle="box" />
                        <IodineSelect class="flex-1" :options="selectOptions" label="Label" multiple required indicatorStyle="box" border />
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
                        <IodineColorpicker :swatch-palettes="swatchPalettes"
                        :allowed-output-formats="['rgb']"
                        :model-value="'#FF00FF'">
                            <IodineButton type="button" label="Open Colopicker"/>
                        </IodineColorpicker>
                    </div>
                </div>
                <div class="group">
                    <h2>Lynn's Playground</h2>
                    <div class="flex gap-1">
                        <select style="width:100px">
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                            <option value="a">AAaaaa</option>
                        </select>
                        <IodineSelect style="height: 2.5rem" label="Choose an 'AAaA'" :options="[
                        {
                            text: 'AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA',
                            value: 'a'
                        },{
                            text: 'AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA AAAAAaa aAAAa AAAAaaa AAAaaAA  AAaaaaaaA AAAaaa AAAaA',
                            value: 'aa'
                        }]"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    
    import IodineIcon from '@/components/library/IodineIcon.vue'
    import IodineButton from '@/components/library/IodineButton.vue'
    import IodineIconButton from '@/components/library/IodineIconButton.vue'
    import IodineInput from '@/components/library/IodineInput.vue'
    import IodineToggle from '@/components/library/IodineToggle.vue'
    import IodineLoader from '@/components/library/IodineLoader.vue'
    import IodinePopup from '@/components/library/IodinePopup.vue'
    import IodineColorpicker from '@/components/library/IodineColorpicker.vue'
    import IodineIconpicker from '@/components/library/IodineIconpicker.vue'

    import IodineSelect from '@/components/library/IodineSelect.vue'

    import HeroSection from '@/components/HeroSection.vue'
    
    import swatchPalettes from '@/components/data/colors/FlatUiColors'
    import icons from '@/components/data/icons/MaterialSymbols'
    


    const popup = ref({} as typeof IodinePopup)
    const bool = ref(false)
    const selectOptions = ref([
        { text: 'No Option', value: null },
        { text: 'Option 1', value: 1, disabled: true},
        { text: 'Option 2', value: 2 },
        { text: 'Option 3', value: 3 },
        { text: 'Option 4', value: 4 },
        { text: 'Option 5', value: 5 },
        { text: 'Option 6', value: 6 },
        { text: 'Option 7', value: 7 },
        { text: 'Option 8', value: 8 },
        { text: 'Option 9', value: 9 },
        { text: 'Totally different option', value: 'totally different option' },
    ])
</script>

<style lang="sass" scoped>
    .group
        display: flex
        flex-direction: column
        gap: 1rem
</style>