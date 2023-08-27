import type { App } from 'vue'
import IodineIcon from '@/components/library/IodineIcon.vue'
import IodineButton from '@/components/library/IodineButton.vue'
import IodineIconButton from '@/components/library/IodineIconButton.vue'
import IodineInput from '@/components/library/IodineInput.vue'
import IodineToggle from '@/components/library/IodineToggle.vue'
import IodineLoader from '@/components/library/IodineLoader.vue'
import IodinePopup from '@/components/library/IodinePopup.vue'

export default
{
    install(app: App)
    {
        app.component('IodIcon', IodineIcon)
        app.component('IodButton', IodineButton)
        app.component('IodIconButton', IodineIconButton)
        app.component('IodInput', IodineInput)
        app.component('IodToggle', IodineToggle)
        app.component('IodLoader', IodineLoader)
        app.component('IodPopup', IodinePopup)
    }
}

export {
    IodineIcon,
    IodineButton,
    IodineIconButton,
    IodineInput,
    IodineToggle,
    IodineLoader,
    IodinePopup,
}