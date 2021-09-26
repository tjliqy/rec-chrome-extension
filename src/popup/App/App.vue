<template>
  <div class="main_app">
    <div class="panel-background" v-loading="loading">
<!--      <div class="top-icon">-->
<!--        <a>—</a>-->
<!--      </div>-->
      <div class="top-title">
        <p>新闻算法测评</p>
      </div>
      <div class="divider-container">
        <el-divider class="divider" />
      </div>
      <div class="user-info">
        <b style="float: left">当前用户：{{ username }}</b>
        <b style="float: right ">历史浏览量：{{newsListLength}}</b>
      </div>
      <div class="category-panel">
        <b class="category-title">最常浏览种类</b>
        <b class="category">{{ category }}</b>
      </div>
      <div class="category-chart-container">
        <CategoryChart :category-count="categoryCount" />
      </div>
      <div class="divider-container">
        <el-divider class="divider" />
      </div>
        <history-card v-for="n in historyNewsList" :news="n"
                      :key="n.newsId"></history-card>
      <div class="divider-container">
        <el-divider class="divider" />
      </div>
      <div class="model-panel">
        <ModelInfo
          :model="'今日头条'"
          :metrics="metrics"
          :baseMetrics="baseMetrics"
          :robust="robust"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryChart from "../../components/user/CategoryChart";
import ModelInfo from "../../components/model/ModelInfo";
import HistoryCard from "../../components/user/HistoryCard";

export default {
  name: "app",
  components: {
    HistoryCard,
    CategoryChart,
    ModelInfo
  },
  mounted() {
    // this.loadNews();
    this.loadModelData();
    this.loadUserId();
  },
  data() {
    return {
      // 模拟数据 未进行前后端用户连接
      username:"",
      category: "Sport",
      historyNewsList:[],
      categoryCount: {},
      newsIndex:0,
      baseMetrics: {},
      metrics: {},
      robust: {},
      loading:true,
      newsListLength: 0
    };
  },
  methods: {
    loadUserId() {
      this.loading = true
      let vue_this = this;
      let win = chrome.extension.getBackgroundPage();
      console.log("###########################", win.data);
      vue_this.username = win.data;
      // getchrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      //   console.log("$$$$$$$$$$$$$$$$$", req);
      //   if (req.from == "background") {
      //     sendResponse("我收到了你的来信");
      //     console.log("popup: 接收了来自 background.js的消息", req.info);
      //     vue_this.activeUser.name = req.info;
      //   }
      // });
      this.axios
        .post("http://172.31.128.207:8082/chrome-extension/userinfo", {
          username: this.username
        })
        .then(res => {
          let result = res.data;
          if (result && result.status === 200) {
            this.loadNews(result.data['news_id'])
          } else {
            console.log("获取用户数据失败");
            this.loading = false
          }
        });
    },
    loadNews(history) {
      this.loading = true
      this.axios
        .post("http://172.31.128.207:8082/chrome-extension/findByIdList", {
          newsIdList: history
        })
        .then(res => {
          let data = res.data.data;
          this.categoryCount = data.categoryCount;
          this.newsList = data.newsList;
          this.newsIndex = 0;
          this.newsListLength = this.newsList.length
          this.loadHistory();
          this.loadCategoryRank(data.categoryCount, "category");
          this.loading = false

        });
    },
    loadHistory(){
      let gap = 5;
      let length = this.newsList.length;
      if (length - this.newsIndex >= gap){
        this.historyNewsList = this.historyNewsList.concat(this.newsList.slice(length - this.newsIndex - gap, length- this.newsIndex))
      }else if(length - this.newsIndex > 0) {
        this.historyNewsList = this.historyNewsList.concat(this.newsList.slice(0,length - this.newsIndex))
      }
      this.newsIndex += gap
      // console.log(this.historyNewsList)
      // for (;this.newsList.length > this.newsIndex; this.newsIndex++){
      //   this.historyNewsList.subarray()
      // }
    },
    loadCategoryRank(categoryCount, obj) {
      let max = 0,
        res = "";
      for (let key of Object.keys(categoryCount)) {
        if (categoryCount[key] > max) {
          max = categoryCount[key];
          res = key;
        }
      }
      this[obj] = res;
    },
    loadModelData() {
      this.axios
        .get("http://pred.baizeinfo.com/rec-metrics/metrics", {
          params: {
            algorithm: "toutiao"
          }
        })
        .then(res => {
          this.baseMetrics = res.data;
        });
      this.axios
        .get("http://pred.baizeinfo.com/rec-metrics/metrics", {
          params: {
            algorithm: "toutiao"
          }
        })
        .then(res => {
          this.metrics = res.data;
        });
      this.axios
        .get("http://pred.baizeinfo.com/rec-metrics/robust", {
          params: {
            algorithm: "toutiao"
          }
        })
        .then(res => {
          this.robust = res.data;
        });
    }
  }
};
</script>

<style scoped>
.main_app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
  padding-left: 5px;
  width: 400px;
  min-height: 800px;
  height: 100%;
}

.panel-background {
  width: 390px;
  height: 100%;
  border: 2px solid maroon;
  background-color: #f6f6f6;
  border-radius: 10px;
  /*overflow: scroll;*/
}

.top-icon {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #f6f6f6;
  border: 2px solid maroon;
  position: absolute;
  top: 13px;
  left: 185px;
  color: maroon;
  font-size: 22px;
  line-height: 26px;
}

.top-title {
  width: 100%;
  height: 40px;
  text-align: center;
  font-family: 黑体;
  font-size: 28px;
  font-weight: bold;
}

.divider-container {
  width: 94%;
  margin-left: 3%;
}

.user-info {
  font-family: Arial;
  font-size: 18px;
  width: 92%;
  padding-left: 4%;
  height: 40px;
}

.category-panel {
  background-color: #dbdbdb;
  width: 94%;
  margin-left: 3%;
  height: 50px;
  border-radius: 10px;
}

.category-title {
  height: 34px;
  float: left;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 8px;
  padding-top: 5px;
}

.category {
  height: 28px;
  width: 160px;
  float: right;
  font-size: 16px;
  font-weight: bold;
  background-color: #f6f6f6;
  border-radius: 8px;
  margin-right: 10px;
  margin-top: 8px;
  padding-top: 5px;
}

.category-chart-container {
  width: 94%;
  border: 2px solid #787b93;
  border-radius: 8px;
  margin-left: 3%;
  height: 200px;
  margin-top: 10px;
}

.model-panel {
  width: 94%;
  margin-left: 3%;
  min-height: 400px;
}
</style>

<style>
.el-divider--horizontal {
  margin: 8px 0;
  background: 0 0;
  border-top: 1px solid maroon;
}

.el-collapse {
  border-bottom: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
}

.el-collapse-item__header {
  font-size: 18px;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f6f6f6;
  border-bottom: 1px solid #dbdbdb;
  font-weight: bold;
}

.el-collapse-item__wrap {
  background: #f6f6f6;
  border-bottom: 1px solid #dbdbdb;
}
</style>
