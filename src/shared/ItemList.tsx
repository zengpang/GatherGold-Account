import s from './ItemList.module.scss';
import { computed, defineComponent, PropType } from 'vue';
import { Item } from './Item';
import { TagItem } from './TagItem';
export const ItemList = defineComponent({
  props: {
    Items: {
      type: Array as PropType<Array<any>>,
      required: false
    },
    ItemType: {
      type: String as PropType<'bill' | 'tag'>,
      required: true
    }
  },

  setup(props, context) {
    return () => {
      const Items = props.Items;
      const ItemType = props.ItemType;
      switch (ItemType) {
        case "bill": {
          return <div class={s.wrapper}>
            {Items?.map((item, index) => {
              return (<Item tagIcon='\u{1F471}' tagName='旅行' tagPrice={1234} tagTime={"2000-01-01 12:39"}></Item>)
            })}
            <div class={s.footer}>没有更多</div>
          </div>
        };
        case "tag": {
          return <div class={s.wrapper}>
            {Items?.map((item, index) => {
              return (<TagItem tagIcon={item.sign} tagNumber={index + 1} tagName={item.name} class={s.item}></TagItem>)
            })}
            <div class={s.footer}>没有更多</div>
          </div>
        };
        case undefined:{
          return <div class={s.wrapper}>请输入有效参数</div>
        }
      }
    }
  }
})