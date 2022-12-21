import s from './TagList.module.scss'
import { defineComponent, PropType } from 'vue';
import { Item } from '../../shared/Item';
export const TagList = defineComponent({
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
          return (<Item tagIcon={item.sign} tagcategory={item.category}  tagNumber={index+1} tagName={item.name} class={s.item}></Item>)
        })}
        <div class={s.footer}>没有更多</div>
      </div>

    }
  }
})