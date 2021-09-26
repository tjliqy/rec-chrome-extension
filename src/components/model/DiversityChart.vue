<template>
  <v-chart :option="option" :style="{width: '300px', height: '200px'}"></v-chart>

</template>

<script>
import { use } from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
// import { THEME_KEY } from "vue-echarts";

use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "DiversityChart",
  // props: ['tpr', 'fpr'],
  // provide: {
  //   [THEME_KEY]: "dark"
  // },
  mounted() {
    // this.drawLine();
    this.initChart()
  },
  data() {
    return {
      option: {}
    }
  },
  methods: {
    initChart() {
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['sports', 'autos', 'foodanddrink', 'news', 'lifestyle'],
          axisLabel:{
            interval:0,
            rotate:40
          }
        },
        yAxis: {
          type: 'value',
          max:10,
          name:"数量",
          nameLocation: "end",//坐标位置，支持start,end，middle
        },
        series: [{
          data: [1, 3, 1, 2, 1],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }]
      }
    }
  },
}
</script>

<style scoped>

</style>
