import { defineComponent, PropType } from "vue";
import { RouterLink } from "vue-router";
import { BackIcon } from "../shared/BackIcon";
import { NavBar } from "../shared/NavBar";
import { TextIcon } from "../shared/TextIcon";


export const MainLayout = defineComponent({
    props: {
        iconShow: {
            type: Boolean as PropType<boolean>,
            default: false
        },
        iconPath: {
            type: String as PropType<string>,
           
        },
        isScallPage:{
            type: Boolean as PropType<boolean>,
            default: false
        }
        
    },  
   // "overflow-y:auto"
    setup: (props, context) => {
        return () => (
            <div style={props.isScallPage?"overflow-y:auto":""}>
                <NavBar style={props.isScallPage?" position: relative;":""}>{
                    {
                        title: () => context.slots.title?.(),
                        icon: () => (
                            props.iconShow && !props.iconPath ? <BackIcon></BackIcon> 
                            : (props.iconShow && props.iconPath?<RouterLink to={props.iconPath}><TextIcon textIconName={'exit'}></TextIcon></RouterLink>:"")
                        )
                    }
                }</NavBar>
                {context.slots.default?.()}
            </div>
        )


    }
})