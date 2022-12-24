import { MainLayout } from './MainLayout';
import { Component, DefineComponent, defineComponent, PropType, reactive, ref } from 'vue';
import s from './TimeTabsLayout.module.scss';
const demo = defineComponent({
    props: {
      startDate: {
        type: String as PropType<string>,
        required: true
      },
      endDate: {
        type: String as PropType<string>,
        required: true
      }
    },
  })