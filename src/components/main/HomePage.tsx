import s from './HomePage.module.scss';
import { Component, DefineComponent, defineComponent, PropType, reactive, ref } from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
import { ItemSummary } from '../item/ItemSummary';

export const HomePage = defineComponent({
    setup: (props, context) => {
     
        return () => (
            <TimeTabsLayout component={ItemSummary}/>
        )
    }
})