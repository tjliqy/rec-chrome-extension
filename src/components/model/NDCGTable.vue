<template>
    <el-table
            :data="tableData"
            style="width: 100%"
            size="mini">
        <el-table-column
                prop="date"
                label="新闻ID">
        </el-table-column>
        <el-table-column
                prop="name"
                label="排序得分">
        </el-table-column>
        <el-table-column
                prop="address"
                label="推荐后是否被点击">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "NDCGTable",
        data() {
            return {
                tableData: [{
                    date: 'N17825',
                    name: '1.00',
                    address: '是'
                }, {
                    date: 'N1433',
                    name: '0.65',
                    address: '否'
                }, {
                    date: 'N21877',
                    name: '0.53',
                    address: '否'
                }]
            }
        }
    }
</script>

<style scoped>

</style>
