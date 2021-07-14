<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.acm" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 15px 0 30px;
  border-bottom: 10px solid #eee;
  background: #fff;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
img {
  margin-bottom: 5px;
  width: 80%;
}
span{
  font-size: 12px;
}
</style>
