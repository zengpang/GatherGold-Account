import s from './TimeTabsLayout.module.scss';
import { Component, DefineComponent, defineComponent, PropType, reactive, ref } from 'vue';
import 'vant/lib/index.css';
import { Time } from '../shared/time';
import { MainLayout } from './MainLayout';
import { Overlay } from 'vant';
import { ItemSummary } from '../components/item/ItemSummary';
import { FormItem, Form } from '../shared/Form';
import { TabPageBar, TabPage } from '../shared/TabPageBar';
const demo = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: false
          },
          endDate: {
            type: String as PropType<string>,
            required: false
          },
        itemTitle: {
            type: String as PropType<string>,
            required: false,
            defulat: ""
        },

    },
});
export const TimeTabsLayout = defineComponent({
    props: {
        component: {
            type: Object as PropType<typeof demo>,
            required: true
        },

        hideThisYear: {
            type: Boolean,
            default: false
        },
        pageTitle:{
            type:String as PropType<String>,
            default:'首页'
        }
    },
    setup: (props, context) => {

        const refSelected = ref('本月');
        const time = new Time();
        const tempTime = reactive({
            start: new Time().format(),
            end: new Time().format()
        })
        const customTime = reactive<{
            start?: string
            end?: string
        }>({})
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
        const refOverlayVisible = ref(false)
        const onSubmitCustomTime = (e: Event) => {
            e.preventDefault();
            refOverlayVisible.value = false;
            Object.assign(customTime, tempTime);
        }
        const onSelect = (value: string) => {
            console.log(value);
            if (value === '其他') {
                refOverlayVisible.value = true;
            }
        }
        return () => (
            <MainLayout iconShow={false}>
                {
                    {
                        title: () => props.pageTitle,
                        default: () => (
                            <div class={s.timeTabsLayout}>
                                {props.hideThisYear ? (<TabPageBar v-model:selected={refSelected.value} onUpdate:selected={onSelect}>
                                    <TabPage  name='本月' class={s.tabPage} >
                                        <props.component itemTitle='本月账单' startDate={timeList[0].start.format()}
                                            endDate={timeList[0].end.format()} ></props.component>
                                    </TabPage>
                                    <TabPage  name='上个月' class={s.tabPage} >
                                        <props.component itemTitle='上个月账单' startDate={timeList[1].start.format()}
                                            endDate={timeList[1].end.format()} ></props.component>
                                    </TabPage>

                                    <TabPage  name='其他' class={s.tabPage} >

                                        <props.component itemTitle='自定义时间账单' startDate={customTime.start} endDate={customTime.end}></props.component>

                                    </TabPage>
                                </TabPageBar>) : (
                                    <TabPageBar v-model:selected={refSelected.value} onUpdate:selected={onSelect}>
                                        <TabPage  name='本月' class={s.tabPage} >
                                            <props.component itemTitle='本月账单' startDate={timeList[0].start.format()}
                                                endDate={timeList[0].end.format()} ></props.component>
                                        </TabPage>
                                        <TabPage  name='上个月' class={s.tabPage} >
                                            <props.component itemTitle='上个月账单' startDate={timeList[1].start.format()}
                                                endDate={timeList[1].end.format()} ></props.component>
                                        </TabPage>
                                        <TabPage  name='今年' class={s.tabPage} >
                                            <props.component itemTitle='今年账单' startDate={timeList[2].start.format()}
                                                endDate={timeList[2].end.format()}></props.component>
                                        </TabPage>
                                        <TabPage  name='其他' class={s.tabPage} >
                                        <props.component itemTitle='自定义时间账单' startDate={customTime.start} endDate={customTime.end}></props.component>
                                        </TabPage>
                                    </TabPageBar>
                                )}

                                <Overlay show={refOverlayVisible.value} class={s.overlay}>
                                    <div class={s.overlay_inner}>
                                        <header >
                                            请选择时间
                                        </header>
                                        <main>
                                            <Form onSubmit={onSubmitCustomTime}>
                                                <FormItem label='开始时间' v-model={tempTime.start} type='date' />
                                                <FormItem label='结束时间' v-model={tempTime.end} type='date' />
                                                <FormItem>
                                                    <div class={s.actions}>
                                                        <button type="button" onClick={() => refOverlayVisible.value = false} class={s.cancelBtn}>取消</button>
                                                        <button type="submit" onClick={() => refOverlayVisible.value = false} class={s.confirmBtn}>确认</button>
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