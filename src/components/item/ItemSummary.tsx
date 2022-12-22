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
    }
  },
  setup: (props, context) => {
    //测试数组无实际含义
    const TestArray = ref([
      { id: 1, name: '餐费', sign: '\u{1F471}', category: 'expenses' },
      { id: 2, name: '打车', sign: '\u{1F471}', category: 'expenses' },
      { id: 3, name: '聚餐', sign: '\u{1F471}', category: 'expenses' },
      { id: 4, name: '打车', sign: '\u{1F471}', category: 'expenses' },
      { id: 5, name: '聚餐', sign: '\u{1F471}', category: 'expenses' },
      { id: 6, name: '打车', sign: '\u{1F471}', category: 'expenses' },
      { id: 7, name: '聚餐', sign: '\u{1F471}', category: 'expenses' },
    ]);
    return () => (
      <div class={s.wrapper}>
        <Paster></Paster>
        <div class={s.footer}>
          <ItemList class={s.itemList}  Items={TestArray.value} ItemType='bill'></ItemList>
        </div>
      </div>
    )
  }
})