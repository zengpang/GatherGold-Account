import s from './HomePage.module.scss';
import { defineComponent } from 'vue';
export const HomePage=defineComponent({
    setup:(props, context)=> {
        return ()=>(
            <h1>首页</h1>
        )
    }
})