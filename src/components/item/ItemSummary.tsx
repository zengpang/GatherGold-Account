import s from './ItemSummary.module.scss';
import { defineComponent, PropType } from 'vue';
import { Paster } from '../../shared/Paster';
export const ItemSummary=defineComponent({
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
    setup:(props,context)=>{
        return ()=>(
            <div><Paster></Paster></div>
        )
    }
})