import type { App } from 'vue'
import IodButton from '@/components/library/IodineButton.vue'
import IodIcon from '@/components/library/IodineIcon.vue'
import IodIconButton from '@/components/library/IodineIconButton.vue'
import IodInput from '@/components/library/IodineInput.vue'
import IodLoader from '@/components/library/IodineLoader.vue'
import IodPopup from '@/components/library/IodinePopup.vue'
import IodSelect from '@/components/library/IodineSelect.vue'
import IodToggle from '@/components/library/IodineToggle.vue'

export default
{
    install(app: App)
    {
        app.component('IodIcon', IodIcon)
        app.component('IodButton', IodButton)
        app.component('IodIconButton', IodIconButton)
        app.component('IodInput', IodInput)
        app.component('IodSelect', IodSelect)
        app.component('IodToggle', IodToggle)
        app.component('IodLoader', IodLoader)
        app.component('IodPopup', IodPopup)
    }
}

export {
    IodIcon,
    IodButton,
    IodIconButton,
    IodInput,
    IodSelect,
    IodToggle,
    IodLoader,
    IodPopup,
}