import { FunctionalComponent, onMounted, render } from "vue";
import s from './WelcomeLayout.module.scss';
export const WelcomeLayout : FunctionalComponent=(props,context)=>{
    const {slots:{icon,title,titleContent,button}}=context;
     
        return (
            <div class={s.wrapper}>
            <div class={s.content}>
               {icon?.()}
               {title?.()}
               {titleContent?.()}
               {button?.()}
            </div>
         </div>
        );
}