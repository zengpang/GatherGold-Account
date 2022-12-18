import s from './TabPageBar.module.scss';
import { defineComponent, PropType } from "vue";

//分页导航栏
export const TabPageBar = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>,
            required: false
        },
        onUpdateSelected: {
            type: Function as PropType<(name: string) => void>,
            required: false,
        }
    },
    setup: (props, context) => {
        return () => {
            const tabs = context.slots.default?.();
            if (!tabs) return () => null;
            //检测包含的所有子组件是否都是TabPage
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].type !== TabPage) {
                    throw new Error('<TabPageBar>只能包含TabPage');
                }
            }

            return <><div class={s.tabPageBar}>
                {tabs.map(item =>
                    //在点击事件中更新父组件
                    <TabButton class={[s.tabButton,item.props?.name===props.selected?s.selected:'']} onClick={()=>context.emit('update:selected', item.props?.name)}>{item.props?.name}</TabButton>
                )}
            </div>
                <div class={s.tabPageContainer}>
                {tabs.find(item => item.props?.name === props.selected)}
                </div>
            </>
        }


    }
})
//分页按钮
export const TabButton = defineComponent({
    props: {
        onClick: {
            type: Function as PropType<(e: MouseEvent) => void>
        }
    },
    setup: (props, context) => {
        return () => (
            <button onClick={(props.onClick)}>
                {context.slots.default?.()}
            </button>
        )
    }
});
//分页
export const TabPage = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }

    },
    setup: (props, context) => {
        console.log(props.name);
        return () => (
            <div >
                {context.slots.default?.()}
            </div>
        )
    }
})