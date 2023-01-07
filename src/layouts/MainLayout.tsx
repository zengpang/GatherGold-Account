import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";
import { BackIcon } from "../shared/BackIcon";
import { NavBar } from "../shared/NavBar";


export const MainLayout = defineComponent({
    props: {
        iconShow: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        iconPath:{
            type:String as PropType<string>,
            default: '/main'
        }
    },

    setup: (props, context) => {
        return () => (
            <div>
                <NavBar>{
                    {
                        title: () => context.slots.title?.(),
                        icon: () => props.iconShow ? <BackIcon></BackIcon> : ""
                    }
                }</NavBar>
                {context.slots.default?.()}
            </div>
        )


    }
})