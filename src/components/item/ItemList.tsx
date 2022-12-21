import s from './ItemList.module.scss';
import { defineComponent, PropType } from 'vue';
import { Item } from '../../shared/Item';
export const ItemList = defineComponent({
  props: {
    Items: {
      type: Array as PropType<Array<any>>,
      required: false
    }
  },
  setup(props, context) {
    return () => {
      const Items = props.Items;
      return <div class={s.wrapper}>
      
      </div>

    }
  }
})