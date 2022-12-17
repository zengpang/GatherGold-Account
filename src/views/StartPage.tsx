import {defineComponent,ref} from 'vue';
import s from './StartPage.module.scss';
import { Button } from '../shared/Button';
import { Paster } from '../shared/Paster';
import StartIcon from '../assets/icons/GifIcons/StartGif.json';
import { GifIcon } from '../shared/GifIcon';
import { RouterLink } from 'vue-router';

export const StartPage=defineComponent({
   setup: () => {
      
      
      return () => (
        <div class={s.wrapper} >
            <GifIcon class={s.icon} gifJson={StartIcon}></GifIcon>
            <Paster class={s.startContent}>
             {
              {
                header:()=><a class={s.startText}>聚沙成塔,集腋成裘,
                集金成富 —— 集金记账</a>,
                footer: ()=><RouterLink class={s.link}  to="/main"> <Button class={s.startBtn} >开 始 记 账</Button></RouterLink>
              }
             }
            </Paster>
           
        </div>
      )
    }
})