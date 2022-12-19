import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";
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
                        icon: () => props.iconShow ? <RouterLink to={'/main'} ><TextIcon textIconName={'exit'}></TextIcon></RouterLink> : ""
                    }
                }</NavBar>
                {context.slots.default?.()}
            </div>
        )


    }
})