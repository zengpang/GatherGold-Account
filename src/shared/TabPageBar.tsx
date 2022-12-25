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
        },
        
    },
    emits: ['update:selected'],
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
            //按钮初始数量
            const BtnsDefalut=4;
            //按钮数量
            const BtnsNumber=tabs.length;
            const BtnScale=BtnsDefalut/BtnsNumber;
            const BtnWidth='width:'+(19.5)*(BtnScale)+"vw";
            const BtnMarginLeft='margin-left:'+(0.5)*BtnScale+"vw";
            const BtnNewStyle=BtnWidth+';'+BtnMarginLeft;
            return <><div class={s.tabPageBar}>
                {tabs.map(item =>
                    //在点击事件中更新父组件
                    <TabButton buttonStyle={BtnNewStyle} class={[s.tabButton,item.props?.name===props.selected?s.selected:'']} onClick={()=>context.emit('update:selected', item.props?.name)}>{item.props?.name}</TabButton>
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
        },
        buttonStyle:{
            type:String as PropType<string>,
            defualt:''
        }
    },
    // "width: 39vw;margin-left: 0.9vw;"
    setup: (props, context) => {
        return () => (
            <button style={props.buttonStyle} onClick={(props.onClick)}>
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
            <div style={"  overflow: auto;"}>
                {context.slots.default?.()}
            </div>
        )
    }
})