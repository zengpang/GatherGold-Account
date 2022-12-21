import s from './ItemSummary.module.scss';
import { defineComponent, PropType } from 'vue';
export const ItemSummary=defineComponent({
    props: {
        startDate: {
          type: String as PropType<string>,
          required: true
        },
        endDate: {
          type: String as PropType<string>,
          required: true
        }
      },
    setup:(props,context)=>{
        return ()=>(
            <div>汇总</div>
        )
    }
})