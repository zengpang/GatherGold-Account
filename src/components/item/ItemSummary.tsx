import s from './ItemSummary.module.scss';
import { defineComponent, PropType } from 'vue';
import { Paster } from '../../shared/Paster';
import { Item } from '../../shared/Item';
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
            <div class={s.wrapper}>
              <Paster></Paster>
              <div>
                 <Item tagIcon='\u{1F471}' tagName='旅行' tagPrice={1234} tagTime={"2000-01-01 12:39"}></Item>
              </div>
            </div>
        )
    }
})