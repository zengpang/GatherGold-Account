import { defineComponent } from "vue";
import s from './Paster.module.scss'
export const Paster = defineComponent({
    setup(props, context) {
        const { slots } = context;
        return () => (
            <div class={s.paster}>
                <header class={s.area}>
                    {slots.header?.()}
                </header>
                <footer class={s.area}>
                    {slots.footer?.()}
                </footer>

            </div>
        )
    },
})