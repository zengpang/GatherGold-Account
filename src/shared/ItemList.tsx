import s from './ItemList.module.scss';
import { defineComponent, PropType } from 'vue';
import { Item } from './Item';

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
          {Items?.map((item,index) => {
          return (<Item tagIcon='\u{1F471}' tagName='旅行' tagPrice={1234} tagTime={"2000-01-01 12:39"}></Item>)
        })}
      </div>

    }
  }
})