import s from './ItemSummary.module.scss';
import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import { Paster } from '../../shared/Paster';
import { ItemList } from '../../shared/ItemList';
import { http } from '../../shared/Http';
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
    // items: {
    //   type: Array as PropType<Array<any>>,
    //   required: true
    // }
  },
  setup: (props, context) => {
    const items = ref<Item[]>([]);
    const hasMore = ref(false);
    const page = ref(0);
    //更新记账项
    const fetchItems = async () => {
      if(!props.startDate || !props.endDate){ return }
      const response = await http.get<Resources<Item>>('/items', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndex',
      })
      const { resources, pager } = response.data
      items.value?.push(...resources)
      hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
      page.value += 1
    }
    //初始更新
    onMounted(fetchItems);
    watch(() => [props.startDate, props.endDate], () => {
      items.value = [];
      hasMore.value = false;
      page.value = 0;
      fetchItems();
    })
    const itemsBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) { return }
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,
        page: page.value + 1,
        _mock: 'itemIndexBalance'
      })
      Object.assign(itemsBalance, response.data);
    }
    onMounted(fetchItemsBalance);
    watch(() => [props.startDate, props.endDate], () => {
      Object.assign(itemsBalance, {
        expenses: 0, income: 0, balance: 0
      })
      fetchItemsBalance();
    })
    return () => (
      <div class={s.wrapper}>
        {items.value?( <>
          <div class={s.header}>
            <Paster class={s.sum}>
              {
                {
                  header: () => <span class={s.sumTitle}>净收入</span>,
                  footer: () => <span>{'￥' + itemsBalance.balance}</span>
                }
              }
            </Paster>
            <div class={s.incomeAndexpense}>
              <Paster class={s.income}>
                {
                  {
                    header: () => <span class={s.incomeTitle}>收入</span>,
                    footer: () => <span>{'￥' + itemsBalance.income}</span>
                  }
                }
              </Paster>
              <Paster class={s.expense}>
                {
                  {
                    header: () => <span class={s.expenseTitle}>支出</span>,
                    footer: () => <span>{'￥' + itemsBalance.expenses}</span>
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
            <ItemList Items={items.value} kind='' class={s.itemList} ItemType='bill'></ItemList>
          </div>
        </>):(
         <div>记录为空</div>
        )
       
        }
       

      </div>
    )
  }
})