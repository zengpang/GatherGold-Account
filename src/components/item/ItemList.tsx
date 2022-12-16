import s from './ItemCreate.module.scss';
import { defineComponent } from 'vue';
export const ItemList =defineComponent({
    setup(props, context) {
      return ()=>(
        <h1>记账列表</h1>
      )   
    }
})