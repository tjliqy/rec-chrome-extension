<template>
    <el-table :data="modelList" style="width: 100%;" :row-class-name="tableRowClassName" align="center" size="mini"
              header-cell-class-name="normal-row" @row-click="handleClick">
        <el-table-column prop="name" label="算法名" fixed>
        </el-table-column>
        <el-table-column prop="AUC" label="AUC" sortable>
        </el-table-column>
        <el-table-column prop="MRR" label="MRR" sortable>
        </el-table-column>
        <el-table-column prop="nDCG@5" label="nDCG@5" sortable>
        </el-table-column>
        <el-table-column prop="nDCG@10" label="nDCG@10" sortable>
        </el-table-column>
<!--        <el-table-column-->
<!--                fixed="right"-->
<!--                label="操作"-->
<!--                width="100">-->
<!--            <template slot-scope="scope">-->
<!--                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
<!--            </template>-->
<!--        </el-table-column>-->
    </el-table>
</template>

<script>
    export default {
        name: "ModelTable",
        props: ["modelList"],
        methods: {
            tableRowClassName() {
                // if (row.name === "LSTUR") {
                //     return 'active-row'
                // } else {
                //     return 'normal-row'
                // }
                return 'normal-row'
            },
            handleClick(row){
                this.$router.push('/analysis/'+row.name)
            }
        }
    }
</script>

<style>
    .normal-row {
        /*background-color: #e5e5e5 !important;*/
        color: #2c3358;
        font-size: 14px;
      cursor: pointer;
    }

    .active-row {
        background-color: #e5e5e5 !important;
        color: #2c3358;
        font-size: 14px;

    }

    .active-row td:first-child div {
        border-radius: 8px 0 0 8px;
        border-right: none;
    }

    .active-row td div {
        background-color: white;
        border: 1px solid #2c3358;
        border-right: none;
        border-left: none;
    }

    .active-row td:last-child div {
        border-radius: 0 8px 8px 0;
        border-left: none;
    }
</style>
