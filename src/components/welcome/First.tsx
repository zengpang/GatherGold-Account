import {defineComponent,ref} from 'vue';
import s from './WelcomeLayout.module.scss';
import {RouterLink} from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
import saveMoney from '../../assets/icons/SaveMoneyGif.json'
import { useLoad,LoadTypes } from '../../hooks/useLoad';
export const First=defineComponent({ 
    setup:()=>{    
        const icon=ref<HTMLElement>();
        useLoad(icon,LoadTypes.loadGif,saveMoney);
        return () => (
          
            <WelcomeLayout>
              {{
                icon:()=><div class={s.icon} ref={icon}></div>,
                title:()=><h2>会挣钱<br/>还要会省钱</h2>,
                titleContent:()=> <a>收入支出记载功能，助您更"省"一步</a>,
                button:()=><RouterLink class={s.nextBtn} to="/welcome/2" >下 一 页</RouterLink>
              }}
            </WelcomeLayout>
          )
    },
})
