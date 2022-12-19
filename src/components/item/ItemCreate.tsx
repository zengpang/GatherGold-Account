import s from './ItemCreate.module.scss';
import { defineComponent, PropType,ref } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { TabPageBar, TabPage } from '../../shared/TabPageBar';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出');
    return () => (
      <MainLayout iconShow={true}>
        {{
          title: () => '首页',
          default: () => (
            <div class={s.wrapper}>
              <TabPageBar v-model:selected={refKind.value}>
                <TabPage name='支出'>
                icon 列表
                </TabPage>
                <TabPage name='收入'>
                icon 列表2
                </TabPage>
                
              </TabPageBar>
            
            </div>
          )
        }}
      </MainLayout>
    )
  }
})