<template>
    <!--  <chart ref="chart1" :options="option" :auto-resize="true"></chart>-->
    <div id="myChart" :style="{width: '400px', height: '200px'}"></div>
</template>

<script>
    export default {
        name: "CategoryChart",
        props:['categoryCount'],
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {
            // this.drawLine();
            this.initChart()
        },
        methods: {
            loadData(){
                if (this.categoryCount && this.categoryCount !== {}){
                    let res = []
                    for (let name in this.categoryCount){
                        res.push({value:this.categoryCount[name],name:name})
                    }
                    return res
                }
                return []
            },
            initChart() {
                let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
                require('echarts/lib/chart/pie')
// 引入提示框和title组件
                require('echarts/lib/component/tooltip')
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item'
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left',
                    // },
                    series: [
                        {
                            name: '分类数量',
                            type: 'pie',
                            radius: '50%',
                            data: this.loadData(),
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            }
        },
        watch:{
            categoryCount(){
                this.initChart()
            }
        }
    }
</script>

<style scoped>

</style>
