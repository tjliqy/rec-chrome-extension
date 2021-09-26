<template>
  <div>{{title}}
    <el-tooltip :content="mainTip" placement="bottom" :disabled="!subTip"><a>{{main}}</a></el-tooltip>
    <el-tooltip :content="subTip" placement="bottom" v-if="sub" :disabled="!subTip"><a class="sub">{{sub}}</a></el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props:['title','main','sub','mainTip','subTip'],
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  background: #dbdbdb;
  color: #2c3358;
  margin-top: 8px;
  font-size: 14px;
  padding: 8px;
  border-radius: 8px;
  display:inline-block;
  *display:inline;
  *zoom:1;
}

a {
  background: white;
  border-radius: 8px;
  padding:2px 8px;
  margin-left: 8px;
  font-weight: bold;
}
.sub{
  color: #888888;
  font-size: 12px;
}
</style>
