import { defineComponent } from 'vue';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
import { Charts } from '../statistics/Charts';
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout pageTitle={'统计页面'} hideThisYear={true} component={Charts} />
    )
  }
})
export default StatisticsPage