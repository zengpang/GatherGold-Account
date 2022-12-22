import s from './HomePage.module.scss';
import { defineComponent,ref } from 'vue';
import { ItemSummary } from '../item/ItemSummary';
import { TabPageBar,TabPage } from '../../shared/TabPageBar';
import { MainLayout } from '../../layouts/MainLayout';

export const HomePage=defineComponent({
    setup:(props, context)=> {
        
        const refPageKind = ref('本月');
        return ()=>(
             <MainLayout iconShow={false}>
                {
                  {
                    title:()=>'首页',
                    default:()=>(
                    <div class={s.homePage}>   
                        <TabPageBar v-model:selected={refPageKind.value} >
                            <TabPage name='本月' class={s.tabPage} >
                                <ItemSummary></ItemSummary>
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
                       
                    </div>
                       )
                  }
                }
            </MainLayout>
        )
    }
})