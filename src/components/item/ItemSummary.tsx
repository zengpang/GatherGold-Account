import s from './ItemSummary.module.scss';
import { defineComponent, PropType, ref } from 'vue';
import { Paster } from '../../shared/Paster';
import { ItemList } from '../../shared/ItemList';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
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
          <Paster class={s.sum}>
           {
            {
               header:()=><span class={s.sumTitle}>净收入</span>,
               footer:()=><span>￥300000</span>
            }
           }
          </Paster>
          <div class={s.incomeAndexpense}>
            <Paster class={s.income}>
            {
            {
               header:()=><span class={s.incomeTitle}>收入</span>,
               footer:()=><span>￥300000</span>
            }
           }
            </Paster>
            <Paster class={s.expense}>
            {
            {
               header:()=><span class={s.expenseTitle}>支出</span>,
               footer:()=><span>￥300000</span>
            }
           }
            </Paster>
          </div>
        </div>
        <div class={s.footerTitle}>
          <span>{props.itemTitle}</span>
          <span>{"共计"}<span class={s.itemNumber}>{props.itemTitle?.length}</span>{"张"}</span>
        </div>
        <div class={s.footer}>
          <ItemList kind='' class={s.itemList}  ItemType='bill'></ItemList>
        </div>
      </div>
    )
  }
})