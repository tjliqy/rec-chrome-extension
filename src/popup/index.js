import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AppComponent from "./App/App.vue";
import axios from "axios";
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);
Vue.component('v-chart', ECharts)
Vue.component("app-component", AppComponent);
Vue.use(ElementUI);
Vue.prototype.axios = axios


new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
