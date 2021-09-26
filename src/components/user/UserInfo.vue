<template>
  <div class="user-info-container">
    <SubTitle>模拟推荐用户</SubTitle>
    <div class="user-container">
      <user-card v-for="u in userList" :id="u.id" :name="u.name" :pic="u.id + '.png'" :key="u.id"
                 :is-active="u.id === activeUser.id"
                 @click.native="changeUser(u)"/>
    </div>
    <SubTitle>{{ activeUser.name }}用户画像</SubTitle>
    <div class="user-container">
      <info-card title="性别" :main="activeUser.sex"/>
      <info-card title="年龄" :main="activeUser.age"/>
      <info-card title="所在地" :main="activeUser.location"/>
    </div>
    <SubTitle>{{ activeUser.name }}浏览历史</SubTitle>
    <info-card title="最多浏览分类" :main="category" :sub="subcategory" main-tip="新闻类别" sub-tip="新闻子类"></info-card>
        <CategoryChart :category-count="categoryCount"/>
    <div class="user-container history-container">
      <history-card v-for="n in activeUser.history" :news="{id:n}"
                    :key="n.id"></history-card>
    </div>
    <div v-for="n in newsList" :key="n.newsId">
      <div  >{{n.newsTitle}}</div>
      <el-divider></el-divider>
    </div>

  </div>
</template>

<script>
import SubTitle from "@/components/SubTitle";
import UserCard from "@/components/user/UserCard";
import InfoCard from "@/components/user/InfoCard";
// import HistoryCard from "@/components/user/HistoryCard";
import CategoryChart from "./CategoryChart";
import HistoryCard from "@/components/user/HistoryCard";
// import CategoryChart from "@/components/user/CategoryChart";

export default {
  name: "UserInfo",
  components: {HistoryCard, CategoryChart, InfoCard, UserCard, SubTitle},
  props: ['userList'],
  data() {
    return {
      activeUser: {},
      activeNews: {
        newsId: 0
      },
      categoryCount:{},
      category: "Sport",
      subcategory: "Basketball",
      analysisIndex:0,
      newsList : []
    }
  },
  mounted() {
    this.changeUser(this.userList[0]);
    this.$EventBus.$on('view', (news) => {
      //需要执行的代码
      this.activeUser.history.unshift(news.newsId);
      this.axios.get('/rec-api/addHistory',{params:{userId:this.activeUser.id,newsId:news.newsId}}).then(() => {
        this.changeUser(this.activeUser);
      })
    })
    // this.$EventBus.$on('analysis', (index) => {
    //   //需要执行的代码
    //   this.analysisIndex = index
    // })
  },
  methods: {
    changeUser(user) {
      this.activeUser = user
      this.loadNews()
      this.$emit('pred', user)
    },
    loadNews() {
      this.axios.post("/rec-api/findByIdList",
              {"newsIdList": this.activeUser.history}).then((res) => {
        let data = res.data;
        this.$emit('setHistory',data.newsList);
        this.newsList = data.newsList;
        this.categoryCount = data.categoryCount;

        this.loadCategoryRank(data.categoryCount, 'category')
        this.loadCategoryRank(data.subcategoryCount, 'subcategory')
      })
    },
    loadCategoryRank(categoryCount, obj) {
      let max = 0, res = "";
      for (let key of Object.keys(categoryCount)) {
        if (categoryCount[key] > max) {
          max = categoryCount[key]
          res = key
        }
      }
      this[obj] = res
    },
    // changeHistoryNews(newsId) {
    //   for (let i = 0; i < this.newsList.length; i++) {
    //     if (this.newsList[i].newsId === newsId) {
    //       this.activeNews = this.newsList[i];
    //       this.$emit('changeNews', this.activeNews)
    //       break;
    //     }
    //   }
    // },

  },
}
</script>

<style scoped>
  .user-info-container::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
.user-info-container{
  overflow-y: scroll;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
}
.user-container {
  display: flex;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.user-container div {
  margin-right: 8px;
}

.user-container div :last-child {
  margin-right: 0;
}

.history-container {
  margin-top: 24px;
  flex-wrap: wrap;
}
</style>
