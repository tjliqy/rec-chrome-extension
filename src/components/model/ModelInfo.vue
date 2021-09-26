<template>
  <div class="model-info-container">
    <!--    <sub-title>新闻推荐算法</sub-title>-->
    <!--    <model-table :model-list="modelList"></model-table>-->
    <div style="display: flex; justify-content: space-between">
      <sub-title>{{ model }}算法评测</sub-title>
    </div>

    <el-collapse>
      <el-collapse-item title="准确度 Correctness">
        <sub-title
            :tips="'（指标定义）ROC曲线下方的面积(Area under the Curve)<br/>（结果数字解释）AUC越接近1，表示排序效果越好<br/>（基准数值）协同滤波结果：'+baseMetrics.auc.toFixed(4)">
          · AUC
        </sub-title>
        <div class="metrics">
          <a>AUC面积</a>：
          <a class="num">
            {{ metrics.auc.toFixed(4) }}
          </a>
        </div>
        <sub-title
            :tips="'（指标定义）横坐标：伪阳性率（FPR）指出现在推荐列表前半段，但没有被用户点击的概率；纵坐标：真阳性率（TPR）指出现在推荐列表前半段，且被用户点击的概率<br/>（结果解释）每一个点纵坐标比横坐标的值大得越多表示排序效果越好，说明推荐是有效的，推荐在前列的新闻大概率被点击'">
          · ROC曲线
        </sub-title>
        <roc-line-chart :fpr="metrics.fpr" :tpr="metrics.tpr"/>
        <sub-title
            :tips="'（指标定义）若用户点击的第一条新闻排在推荐列表的第n位，则MRR得分就是1/n<br/>（结果数字解释）MRR得分越接近1，表示排序效果越好。<br/>（基准数值）协同滤波结果：'+baseMetrics.mean_mrr">
          · MRR
        </sub-title>
        <div class="metrics">
          <a>MRR得分</a>：
          <a class="num">
            {{ metrics.mean_mrr }}
          </a>
        </div>


        <sub-title :tips="'（指标定义）Normalized Discounted Cumulative Gain(归一化折损累计增益)，该指标主要考虑被推荐内容与用户关注度之间的相关性以及推荐位置因素，通常用于评价排序列表与用户真实点击的差距<br/>（结果数字解释）<br/>1）被推荐内容与用户关注度之间的相关性越大（可以看作点击率越高越相关），则NDCG越大，表明推荐效果越好\n'+
'<br/>2）相关性越大的新闻内容排在推荐列表越前的话，则NDCG越大，表明推荐效果越好<br/>（基准数值）协同滤波结果：<br/>nDCG@5:'+baseMetrics['ndcg@5']+'<br/>nDCG@10:'+baseMetrics['ndcg@10']">
          · nDCG
        </sub-title>
        <div class="metrics"><a>nDCG@5</a>：<a class="num">{{ metrics['ndcg@5'] }}</a></div>
        <div class="metrics"><a>nDCG@10</a>：<a class="num">{{ metrics['ndcg@10'] }}</a></div>
        <!--                <img src="@/assets/imgs/ndcg.png" style="max-width: 280px"/>-->
<!--        <NDCGTable/>-->

      </el-collapse-item>
      <el-collapse-item title="覆盖度 Coverage">
        <div class="metrics">
          <a>被推荐新闻</a>占<a>所有新闻</a>的比例：
          <a class="num">
            {{ metrics.coverage[0] | percentage }}
          </a>
        </div>
        <div class="metrics">
          <a>被推荐类别</a>占<a>所有类别</a>的比例：
          <a class="num">
            {{ metrics.coverage[1] | percentage }}
          </a>
        </div>
        <div class="metrics">
          <a>被推荐子类</a>占<a>所有子类</a>的比例：
          <a class="num">
            {{ metrics.coverage[2]| percentage }}
          </a>
        </div>
        <div class="metrics">
          由系统<a>主动推荐的类别</a>的覆盖率：
          <a class="num">
            {{ metrics.coverage[3]| percentage }}
          </a>
        </div>
      </el-collapse-item>
      <el-collapse-item title="多样度 Diversity">
        <sub-title
            :tips="'（指标定义）用于度量推荐系统是否能覆盖用户的不同兴趣领域<br/>（结果数字解释）每个用户推荐列表的多样度越高，则表示推荐列表中新闻间的差异越大。<br/>（基准数值）协同滤波结果：'+ percentage(metrics['diversity'])">
          Diversity
        </sub-title>
        <div class="metrics"><a>所有用户平均多样性</a>：<a class="num">{{ metrics['diversity']| percentage }}</a></div>
        <DiversityChart/>
      </el-collapse-item>
      <el-collapse-item title="隐私度 Privacy">
        <sub-title :tips="tips.privacy+ percentage(baseMetrics['privacy'])">Privacy
        </sub-title>

        <div class="metrics"><a>对用户历史浏览记录差异的敏感性</a>：<a class="num">{{ metrics['privacy']| percentage }}</a>
        </div>

      </el-collapse-item>
      <el-collapse-item title="鲁棒度 Robust">
        <sub-title :tips="tips.robust">鲁棒度测试模块</sub-title>
        <RobustChart :robust="robust"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import SubTitle from "../SubTitle";
import RocLineChart from "../model/RocLineChart";
import DiversityChart from "./DiversityChart";
import NDCGTable from "./NDCGTable";
import RobustChart from "../model/RobustChart";

export default {
  name: "ModelInfo",
  components: {RobustChart, NDCGTable, DiversityChart, RocLineChart, SubTitle},
  props: {
    metrics: {
      type: Object,
      default() {
        return {
          coverage: [0, 0, 0],
          tpr: [],
          fpr: []
        }
      },
    },
    baseMetrics: {
      type: Object,
      default() {
        return {
          coverage: [0, 0, 0],
          tpr: [],
          fpr: []
        }
      }
    },
    robust: {
      type: Object,
      default() {
        return {
          half_history: {},
          drop_category: {},
          random_insert: {},
          random_swap: {},
          random_delete: {}
        }
      },
    },
    model: {
      type: String
    }
  },
  mounted() {
    window.console.log(this.metrics)
  },
  data() {
    return {
      tips: {
        privacy: "（指标定义）我们使用敏感度对模型的差分隐私进行衡量，敏感度定义：" +
            "<br/>对于两个只相差一个历史浏览记录的用户，敏感度指推荐系统所推荐出的新闻列表的差异" +
            "<br/>（结果数字解释）实现中使用Wilcox双侧检验，进行输出间的显著性差异检验，求得pvalue：" +
            "<br/>pvalue > 0.05 ，表示没有显著性差异，则系统对于输入数据中变化的敏感度低，说明系统的隐私保护效果不佳，攻击者能够通过相似的输出推导出用于预测的用户信息或用户输入；" +
            "<br/>pvalue < 0.05 ，表示输入相似，输出间有显著性差异，则系统对于输入数据中变化的敏感度高，说明系统的隐私保护效果良好，攻击者无法通过相似的输出推导出用于预测的用户信息或用户输入。" +
            "<br/>（基准数值）协同滤波结果：",
        robust: "鲁棒度，度量的是推荐系统容忍用户意外提供的错误信息的能力，也可以延申为容忍恶意用户故意提供的虚假信息的能力。<br/>" +
            "1. 系统中鲁棒度模块中的柱状图，展示了准确度指标，在加入噪音的对抗数据集上，与在正常数据集之间的差异。差异越小，则表示推荐算法的鲁棒度越好。<br/>" +
            "2. 现阶段加噪加干扰，构造攻击数据集的方法：<br/>" +
            "1) 用户的历史浏览记录砍半（相当于图像里随机丢掉一半的像素点，观察预测结果）<br/>" +
            "2) 抹去新闻的类别（Category）信息\n" +
            "3) 随机抽取一个词，然后在该词的同义词集合中随机选择一个，插入原句子中的随机位置。该过程可以重复n次。<br/>" +
            "4) 随机选择两个词，位置交换。该过程可以重复n次。<br/>" +
            "5) 句子中的每个词，以概率p随机删除。<br/>"
      }
    }
  },
  methods: {
    percentage(value) {
      if (!value) return "0%"
      return (value * 100).toFixed(2) + "%"
    }
  },
  filters: {
    percentage(value) {
      if (!value) return "0%"
      return (value * 100).toFixed(2) + "%"
    }
  }
}
</script>

<style>
.model-info-container::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.model-info-container {
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
}

.metrics {
  font-size: 14px;
  margin-bottom: 4px;
}

.metrics a {
  font-weight: bold;
}

.metrics .num {
  color: #42b983;
}

.baseline {
  font-size: 12px;
  margin-bottom: 4px;
  color: #888888;
}
</style>
