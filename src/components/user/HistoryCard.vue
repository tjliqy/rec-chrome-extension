<template>
  <div :class="{active:isActive && mode === 'analysis'}" :style="cardStyle">{{ news.newsTitle }}</div>
</template>

<script>
export default {
  name: "HistoryCard",
  props: {
    news: {
      type:Object
    },
    isActive:{
      type: Boolean
    },
    mode: {
      type: String,
      default: 'show' //show  history analysis
    },
  },
  computed:{
    cardStyle(){
      if (this.news.alpha > 0.3 && this.mode === 'analysis'){
        return {
          'background-color':"rgba(255,204,72,"+this.news.alpha +")"
        }
      }else {
        return {}
      }
    }
  }
}
</script>

<style scoped>
div {
  min-width: 72px;
  border-radius: 8px;
  background: #dbdbdb;
  margin: 4px 0;
  color: #2c3358;
  font-size: 14px;
  padding: 8px;
  text-align: center;
}

.active {
  background: white;
  border: 1px solid #2c3358;
}

</style>
