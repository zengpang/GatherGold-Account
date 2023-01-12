import s from './ItemSummary.module.scss';
import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { Paster } from '../../shared/Paster';
import { ItemList } from '../../shared/ItemList';
import { http } from '../../shared/Http';
import { Money } from '../../shared/Money';
import { GifIcon } from '../../shared/GifIcon';
import RecordGif from '../../assets/icons/GifIcons/RecordGif.json'
import { Button } from '../../shared/Button';
import { RouterLink } from 'vue-router';
import { useItemStore } from '../../stores/useItemStore';
import { useAfterMe } from '../../hooks/useAfterMe';

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
    // items: {
    //   type: Array as PropType<Array<any>>,
    //   required: true
    // }
  },
  setup: (props, context) => {
    if(!props.startDate||!props.endDate)
    {
      return ()=><div>请先选择时间范围</div>
    }
    const itemStore = useItemStore(['items',props.startDate,props.endDate]);
    useAfterMe(()=>itemStore.fetchItems(props.startDate,props.endDate));
    watch(
      ()=>[props.startDate,props.endDate],
      ()=>{
        itemStore.$reset();
        itemStore.fetchItems(props.startDate, props.endDate);
      }
    )
    
    const itemsBalance=reactive({
      expenses:0,
      income:0,
      balance:0
    });
    const fetchItemsBalance=async()=>{
      if(!props.startDate||!props.endDate)
      {
        return;
      }
      const response=await http.get(
        '/items/balance',
        {
          happen_after:props.startDate,
          happen_before:props.endDate
        },
        {
          _mock:'itemIndexBalance'
        }
      )
      Object.assign(itemsBalance,response.data);
    }
    useAfterMe(fetchItemsBalance);
    watch(
      ()=>[props.startDate,props.endDate],
      ()=>{
        Object.assign(itemsBalance,{
          expenses: 0,
          income: 0,
          balance: 0
        })
        fetchItemsBalance();
      }
    )
    return () => !props.startDate|| !props.endDate?(<div>请先选择时间范围</div>):(
      <div class={s.wrapper}>
        {(itemStore.items&&itemStore.items.length>0)?( <>
          <div class={s.header}>
            <Paster class={s.sum}>
              {
                {
                  header: () => <span class={s.sumTitle}>净收入</span>,
                  footer: () => <span>￥<Money value={itemsBalance.balance}></Money></span>
                }
              }
            </Paster>
            <div class={s.incomeAndexpense}>
              <Paster class={s.income}>
                {
                  {
                    header: () => <span class={s.incomeTitle}>收入</span>,
                    footer: () => <span>￥<Money value={itemsBalance.income}></Money></span>  
                  }
                }
              </Paster>
              <Paster class={s.expense}>
                {
                  {
                    header: () => <span class={s.expenseTitle}>支出</span>,
                    footer: () => <span>￥<Money value={itemsBalance.expenses}></Money></span>
                  }
                }
              </Paster>
            </div>
          </div>
          <div class={s.footerTitle}>
            <span>{props.itemTitle}</span>
            <span>{"共计"}<span class={s.itemNumber}>{itemStore.items.length}</span>{"张"}</span>
          </div>
          <div class={s.footer}>
            <ItemList Items={itemStore.items} kind='' class={s.itemList} ItemType='bill'></ItemList>
          </div>
        </>):(
         <div class={s.nullPage}>
           <GifIcon gifJson={RecordGif} class={s.icon}>记录为空</GifIcon>
           <RouterLink to="/items/create">
                <Button class={s.button}>开始记账</Button>
           </RouterLink>
         </div>
        )
       
        }
      </div>
    )
  }
})