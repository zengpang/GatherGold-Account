import s from './ItemCreate.module.scss';
import { defineComponent, PropType, ref,reactive, watch } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { TabPageBar, TabPage } from '../../shared/TabPageBar';

import { Button } from '../../shared/Button';
import {RouterLink} from 'vue-router';
import { ItemList } from '../../shared/ItemList';
import { http } from '../../shared/Http';
import { useTags } from '../../shared/useTags';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
    
  },
  
  setup: (props, context) => {
    const refKind = ref('支出');
    const kind=ref("expenses");
  
    const { tags, hasMore, page, fetchTags } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: kind.value,
        page: page + 1,
       
      },{
        _mock: 'tagIndex'
      });
    });
 
    watch(refKind,()=>{
      if(refKind.value==='支出')
      {
        kind.value="expenses";
      }
      else
      {
        kind.value="income";
      }
      tags.value=[];
      hasMore.value = false;
      page.value = 0;
      fetchTags();
 
    })
    return () => (
      
      <MainLayout iconShow={true} iconPath={'/main'}>
        {{
          title: () => '记一笔',
          default: () => (
            <div class={s.wrapper}>
              <TabPageBar v-model:selected={refKind.value}>
                <TabPage  name='支出' class={s.tabPage} >
                  <a class={s.itemTitle}>支出标签</a>
                  <ItemList  kind={kind.value}  ItemType='tag' Items={tags.value} hasMore={hasMore.value} page={page.value} fetchTags={fetchTags}  class={s.itemList}></ItemList>
                  <RouterLink to={'/tags/create?kind=expenses'} class={s.addTag} ><Button class={s.addTagBtn}>添 加 标 签</Button></RouterLink>
                </TabPage>
                <TabPage  name='收入' class={s.tabPage}>
                  <a class={s.itemTitle}>收入标签</a>
                  <ItemList  kind={kind.value} ItemType='tag' Items={tags.value} hasMore={hasMore.value} page={page.value} fetchTags={fetchTags}    class={s.itemList}></ItemList>
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