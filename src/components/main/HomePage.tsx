import s from './HomePage.module.scss';
import { Component, DefineComponent, defineComponent, PropType, reactive, ref } from 'vue';
import { ItemSummary } from '../item/ItemSummary';
import { TabPageBar, TabPage } from '../../shared/TabPageBar';
import { MainLayout } from '../../layouts/MainLayout';
import { Time } from '../../shared/time';
import { Overlay } from 'vant';
import { Form, FormItem } from '../../shared/Form';
import 'vant/lib/index.css';
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
        const time = new Time();
        const customTime = reactive({
            start: new Time().format(),
            end: new Time().format()
        });
        const timeList = [
            {
                start: time.firstDayOfMonth(),
                end: time.lastDayOfMonth()
            },
            {
                start: time.add(-1, 'month').firstDayOfMonth(),
                end: time.add(-1, 'month').lastDayOfMonth()
            },
            {
                start: time.firstDayOfYear(),
                end: time.lastDayOfYear()
            }
        ]
        const refOverlayVisible = ref(false);
        const onSubmitCustomTime = (e: Event) => {
            e.preventDefault();
            refOverlayVisible.value = false;
        }
        const onSelect = (value: string) => {
            if (value === '其他') {
                refOverlayVisible.value = true;
            }
        }
        return () => (
            <MainLayout iconShow={false}>
                {
                    {
                        title: () => '首页',
                        default: () => (
                            
                            <div class={s.homePage}>
                                <TabPageBar v-model:selected={refPageKind.value} onUpdate:selected={onSelect}>
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
                                <Overlay show={refOverlayVisible.value} class={s.overlay}>
                                    <div class={s.overlay_inner}>
                                        <header>
                                            请选择时间
                                        </header>
                                        <main>
                                            <Form onSubmit={onSubmitCustomTime}>
                                                <FormItem label='开始时间' v-model={customTime.start} type='date' />
                                                <FormItem label='结束时间' v-model={customTime.end} type='date' />
                                                <FormItem>
                                                    <div class={s.actions}>
                                                        <button type="button" onClick={() => refOverlayVisible.value = false}>取消</button>
                                                        <button type="submit">确认</button>
                                                    </div>
                                                </FormItem>
                                            </Form>
                                        </main>
                                    </div>
                                </Overlay>
                            </div>
                        )
                    }
                }
            </MainLayout>
        )
    }
})