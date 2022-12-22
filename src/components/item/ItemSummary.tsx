import s from './ItemSummary.module.scss';
import { defineComponent, PropType, ref } from 'vue';
import { Paster } from '../../shared/Paster';
import { ItemList } from '../../shared/ItemList';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    },
    itemTitle: {
      type: String as PropType<string>,
      required: false
    },
    items: {
      type: Array as PropType<Array<any>>,
      required: true
    }
  },
  setup: (props, context) => {

    return () => (
      <div class={s.wrapper}>
        <div class={s.header}>
          <Paster class={s.sum}></Paster>
          <div class={s.incomeAndexpense}>
            <Paster class={s.income}></Paster>
            <Paster class={s.expense}></Paster>
          </div>
        </div>
        <div class={s.footerTitle}>
          <span>{props.itemTitle}</span>
          <span>{"共计"}<span class={s.itemNumber}>{props.itemTitle?.length}</span>{"张"}</span>
        </div>
        <div class={s.footer}>
          <ItemList class={s.itemList} Items={props.items} ItemType='bill'></ItemList>
        </div>
      </div>
    )
  }
})