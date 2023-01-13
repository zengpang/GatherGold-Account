import { defineComponent, PropType } from 'vue'
import s from './ComingSoon.module.scss'
import { GifIcon } from './GifIcon'
import MaintenanceGif from '../assets/icons/GifIcons/MaintenanceGif.json'
export const ComingSoon=defineComponent({
    props:{
        name:{

        }
    },
    setup:(props,context)=>{
        return ()=>(
            <div class={s.wrapper}>
                 <GifIcon gifJson={MaintenanceGif} class={s.icon}/>
                <p class={s.text}>敬请期待</p>
            </div>
        )
    }
})