import { defineComponent } from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
import { Charts } from '../statistics/Charts';
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout hideThisYear={true} component={Charts} />
    )
  }
})