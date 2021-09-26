<template>
  <div :class="{active:isActive}">
    <img :src="imgUrl"/>
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: ['id', 'pic', 'name','isActive'],
  computed:{
    imgUrl(){
      return require('../../assets/imgs/'+ this.pic);
    }
  }
}
</script>

<style scoped>
div{
  border-radius: 8px;
  background: #dcdcdc;
  width: 72px;
  padding: 8px 0;
  text-align: center;
}
.active {
  background: white;
  border: 1px solid #2c3358;
}
.active p{
  color: #2c3358;
}
img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
}
p {
  width: 100%;
  margin: 8px 0 0 0;
  color: #888888;
  font-size: 14px;
}
</style>