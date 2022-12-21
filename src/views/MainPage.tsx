import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import { MainLayout } from '../layouts/MainLayout'
import { BottomBar } from '../shared/BottomBar'
import { TabPageBar, TabPage } from '../shared/TabPageBar'
import s from './MainPage.module.scss'

export const MainPage = defineComponent({
    setup: (props, context) => {
        const refKind = ref('home');
        const refPageKind = ref('本月');

        return () => (
            <MainLayout iconShow={false}>
                {
                  {
                    title:()=>'首页',
                    default:()=>(
                    <div class={s.wrapper}>   
                        <TabPageBar v-model:selected={refPageKind.value}>
                            <TabPage name='本月' class={s.tabPage} >
                                本月分页
                            </TabPage>
                            <TabPage name='上个月' class={s.tabPage} >
                                上个月分页
                            </TabPage>
                            <TabPage name='今年' class={s.tabPage} >
                                今年分页
                            </TabPage>
                            <TabPage name='其他' class={s.tabPage} >
                                其他分页
                            </TabPage>
                        </TabPageBar>
                        <BottomBar v-model:selectName={refKind.value}></BottomBar>
                    </div>
                       )
                  }
                }
            </MainLayout>
         

        )
    }
})