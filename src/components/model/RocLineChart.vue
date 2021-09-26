<template>
  <v-chart :option="option" ref="rocLineChart" :style="{width: '240px', height: '200px'}"/>
</template>

<script>
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
// import { THEME_KEY } from "vue-echarts";

use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: "RocLineChart",
  props: ['tpr', 'fpr'],
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
      let len = this.tpr.length
      let min_tpr = [], min_fpr = []
      let data =[]

      for (let i = 0; i < len; i+=1) {
          min_fpr.push(this.fpr[i])
          min_tpr.push(this.tpr[i])
        data.push([this.fpr[i],this.tpr[i]])
      }

      this.option = {
        tooltip: {
          trigger: 'axis',
          formatter(params){
            return 'fpr:'+ params[0].axisValueLabel + '<br/>tpr:'+ params[0].value[1].toFixed(2)
          }
        },
        grid: {
          // right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: false,
          data: min_fpr,
          max:1.0,
          name:"fpr",
          nameLocation: "middle",//坐标位置，支持start,end，middle
        },
        yAxis: {
          type: 'value',
          max:1.0,
          name:"tpr",
          nameLocation: "end",//坐标位置，支持start,end，middle
          // boundaryGap: [0, '100%']
        },
        series: [
          {
            name: 'tpr',
            symbol: 'none',
            // sampling: 'lttb',
            type: 'line',
            data: data,
            areaStyle: {
            },
          }
        ]
      }
    }
  },
}
</script>

<style scoped>

</style>
