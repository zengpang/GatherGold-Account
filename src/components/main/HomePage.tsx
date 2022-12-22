import s from './HomePage.module.scss';
import { defineComponent, ref } from 'vue';
import { ItemSummary } from '../item/ItemSummary';
import { TabPageBar, TabPage } from '../../shared/TabPageBar';
import { MainLayout } from '../../layouts/MainLayout';

export const HomePage = defineComponent({
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
        const refPageKind = ref('本月');
        return () => (
            <MainLayout iconShow={false}>
                {
                    {
                        title: () => '首页',
                        default: () => (
                            <div class={s.homePage}>
                                <TabPageBar v-model:selected={refPageKind.value} >
                                    <TabPage name='本月' class={s.tabPage} >
                                        <ItemSummary itemTitle='本月账单' items={TestArray.value}></ItemSummary>
                                    </TabPage>
                                    <TabPage name='上个月' class={s.tabPage} >
                                        <ItemSummary itemTitle='上个月账单' items={TestArray.value}></ItemSummary>
                                    </TabPage>
                                    <TabPage name='今年' class={s.tabPage} >
                                        <ItemSummary itemTitle='今年账单' items={TestArray.value}></ItemSummary>
                                    </TabPage>
                                    <TabPage name='其他' class={s.tabPage} >
                                        <ItemSummary itemTitle='自定义时间账单' items={TestArray.value}></ItemSummary>
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