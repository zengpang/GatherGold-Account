import { defineComponent, PropType } from "vue";
import { NavBar } from "../shared/NavBar";
import { TextIcon } from "../shared/TextIcon";
export const MainLayout = defineComponent({
    props: {
        iconShow: {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    setup: (props, context) => {
        return () => (
            <div>
                <NavBar>{
                    {
                        title: () => context.slots.title?.(),
                        icon: () => props.iconShow ? <TextIcon textIconName={'exit'}></TextIcon> : ""
                    }
                }</NavBar>
                {context.slots.default?.()}
            </div>
        )


    }
})