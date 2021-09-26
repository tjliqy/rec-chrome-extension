<template>
  <v-chart :option="option" :style="{width: '300px', height: '300px'}"></v-chart>

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
  name: "RobustChart",
  props: ['robust'],
  // provide: {
  //   [THEME_KEY]: "dark"
  // },
  mounted() {
    // this.drawLine();
    // this.initChart()
  },
  data() {
    return {
      option: {},
      x_data: ['half_history', 'drop_category']

    }
  },
  methods: {
    initChart(series) {
      this.option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['group_auc', 'mean_mrr','ndcg@10','ndcg@5']
        },
        xAxis: {
          type: 'category',
          data: this.x_data,
          axisLabel:{
            interval:0,
            rotate:40
          }
        },
        yAxis: {
          type: 'value',
          max:1.0,
          // name:"数量",
          // nameLocation: "end",//坐标位置，支持start,end，middle
        },
        series: series
      }
    }
  },
  watch:{
    robust(new_data){
      let dataSet = {
        "group_auc":[],
        "mean_mrr":[],
        "ndcg@10":[],
        "ndcg@5":[]
      }
      for( let x in new_data){
        for (let c in dataSet){
          dataSet[c].push(new_data[x][c])
        }
      }
      let res = []
      for(let c in dataSet){
        res.push({
          data: dataSet[c],
          type:'bar',
          name:c,
        })
      }
      this.initChart(res)
    }
  }
}
</script>

<style scoped>

</style>
