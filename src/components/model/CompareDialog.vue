<template>
    <el-dialog
            title="算法对比"
            :visible.sync="dialogVisible"
            :before-close="closeDialog"
            width="80%">
        <el-table
                :data="tableData"
                style="width: 100%"
                size="mini">
            <el-table-column
                    prop="metric"
                    label="指标">
            </el-table-column>
            <el-table-column
                    prop="baseline"
                    label="BaseLine">
            </el-table-column>
            <el-table-column v-for="m in metricsList" :key="m['name']"
                    :prop="m['name']"
                    :label="m['name']">
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    export default {
        name: "CompareDialog",
        props:{
            dialogVisible:{
                type:Boolean,
                default() {
                    return false
                }
            },
            baseMetrics:{
                type:Object,
                default(){
                    return {}
                }
            },
            metricsList:{
                type:Array
            }
        },
        data(){
            return {
                metricsNameList:['auc','diversity','group_auc','mean_mrr','ndcg@10','ndcg@5','privacy']
            }
        },
        methods:{
            closeDialog(){
                this.$emit('closeDialog')
            },
        },
        computed:{
            tableData(){
                let res = []
                for (let m in this.baseMetrics){
                    if(this.metricsNameList.indexOf(m) !== -1) {
                        let item = {
                            metric:m,
                            baseline:this.baseMetrics[m]
                        }
                        for (let t in this.metricsList){
                            let r = this.metricsList[t];
                            // print(r)
                            // console.log(r)
                            item[r['name']] = r[m]
                        }
                        res.push(item)
                    }
                }
                return res
            }
        }
    }
</script>

<style scoped>

</style>
