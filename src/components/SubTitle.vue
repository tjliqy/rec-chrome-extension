<template>
  <p class="sub-title">
    <slot>二级标题</slot>
    <i style="margin-left: 4px" v-if="tips" class="el-icon-postcard" @click="open"/>

  </p>
</template>

<script>
export default {
  name: "SubTitle",
  props: [
    'tips'
  ],
  methods: {
    open() {
      this.$alert(this.tips, this.$slots.default[0].text, {
        dangerouslyUseHTMLString: true
      });
    }
  }
}
</script>

<style scoped>

.sub-title {
  /*display: flex;*/
  font-size: 18px;
  font-weight: bold;
  color: #2c3358;
  text-align: left;
}

</style>
