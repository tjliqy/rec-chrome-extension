<template>
    <div ref="coverageChart" :style="{width: '100px', height: '200px'}"></div>

</template>

<script>

    export default {
        name: "CoverageChart",
        props:['coverage','title'],
        mounted() {
            // this.drawLine();
            this.initChart()
        },
        methods: {
            loadData(){
                if (this.coverage){
                    let res = [];
                    res.push({value:this.coverage,name:'覆盖比例'});
                    res.push({value:1 - this.coverage, name:'未覆盖比例'});
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
                let myChart = echarts.init(this.$refs.coverageChart)
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },

                    series: [
                        {
                            name: this.title,
                            type: 'pie',
                            radius: '50%',
                            data: this.loadData(),
                            itemStyle: [{
                                color: ['#c23531','#000000'],
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }],
                            // emphasis: {
                            //     itemStyle: {
                            //         shadowBlur: 10,
                            //         shadowOffsetX: 0,
                            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                            //     }
                            // }
                            labelLine: {
                                show: false
                            },
                        }
                    ]
                });
            }
        },
        watch:{
            coverage(){
                this.initChart()
            }
        }
    }
</script>

<style scoped>

</style>
