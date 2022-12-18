import { defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import { BottomBar } from '../shared/BottomBar'
import { TabPageBar, TabPage } from '../shared/TabPageBar'
import s from './MainPage.module.scss'
import { NavBar } from '../shared/NavBar'
import { TextIcon } from '../shared/TextIcon'
export const MainPage = defineComponent({
    setup: (props, context) => {
        const refKind = ref('home');
        const refPageKind = ref('本月');

        return () => (
            <div class={s.wrapper}>
                <NavBar>{
                    {
                      title:()=>'主页',
                      icon:()=><TextIcon textIconName={'exit'}></TextIcon>
                    }
                }</NavBar>
                <TabPageBar v-model:selected={refPageKind.value}>
                    <TabPage name='本月'>
                        本月分页
                    </TabPage>
                    <TabPage name='上个月'>
                        上个月分页
                    </TabPage>
                    <TabPage name='今年'>
                        今年分页
                    </TabPage>
                    <TabPage name='其他'>
                        其他分页
                    </TabPage>
                </TabPageBar>
                <BottomBar v-model:selectName={refKind.value}></BottomBar>
            </div>

        )
    }
})