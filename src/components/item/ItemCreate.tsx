import s from './ItemCreate.module.scss';
import { defineComponent, PropType, ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { TabPageBar, TabPage } from '../../shared/TabPageBar';

import { Button } from '../../shared/Button';
import {RouterLink} from 'vue-router';
import { ItemList } from '../../shared/ItemList';



export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
    
  },
  
  setup: (props, context) => {

    const refKind = ref('支出');
   
    console.log("刷新页面");
    
    return () => (
      <MainLayout iconShow={true}>
        {{
          title: () => '记一笔',
          default: () => (
            <div class={s.wrapper}>
              <TabPageBar v-model:selected={refKind.value}>
                <TabPage name='支出' class={s.tabPage} >
                  <a class={s.itemTitle}>支出标签</a>
                  <ItemList  kind="expenses"  ItemType='tag'   class={s.itemList}></ItemList>
                  <RouterLink to={'/tags/create?kind=expenses'} class={s.addTag} ><Button class={s.addTagBtn}>添 加 标 签</Button></RouterLink>
                </TabPage>
                <TabPage name='收入' class={s.tabPage}>
                  <a class={s.itemTitle}>收入标签</a>
                  <ItemList  kind="income" ItemType='tag'  class={s.itemList}></ItemList>
                  <RouterLink to={`/tags/create?kind=income`} class={s.addTag} ><Button class={s.addTagBtn}>添 加 标 签</Button></RouterLink>
                </TabPage>

              </TabPageBar>

            </div>
          )
        }}
      </MainLayout>
    )
  }
})