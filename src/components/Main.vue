<template>
  <el-container
    style="height: 100vh; box-sizing: box-border; border: 1px solid #b3c0d1"
  >
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#0d193c"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <div style="margin-left: 20px; margin-top: 20px">
          <el-avatar
            style="vertical-align: -20%"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
          </el-avatar>
          <span>欢迎，机构管理员</span>
        </div>

        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title" v-on:click="onMain('loginForm')">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title" v-on:click="onHistory('loginForm')">咨询记录</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title" v-on:click="onSchedule('loginForm')">排班表</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onConsultant('loginForm')"
            >咨询师管理</span
          >
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onMonitor('loginForm')">督导管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onUser('loginForm')">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px">
        <el-image
          style="width: 30px; height: 30px"
          :src="url"
          fit="contain"
        ></el-image>
        <span style="text-align: left; font-size: 25px">心理学院热线咨询</span>
      </el-header>

      <div class="top-box">
        <!-- 卡片1 -->
        <el-card class="box-card num-card">
          <div class="card-content">
            <div class="crad-left">
              <div class="card-title">今日咨询数</div>
              <div class="card-num">{{ total_session_today }}</div>
            </div>
            <div class="line"></div>
            <div class="crad-right">
              <div class="card-title">今日咨询数时长</div>
              <div class="card-num">{{ total_session_time }}</div>
            </div>
          </div>
        </el-card>

        <!-- 卡片2 -->
        <el-card class="box-card num-change">
          <div
            class="box-content"
            id="numchange"
            style="width: 100%; height: 200px"
          ></div>
        </el-card>
      </div>

      <div class="center-box">
        <!-- 卡片3 -->
        <el-card class="box-card online-list">
          <div slot="header" class="clearfix">
            <span>在线咨询师</span>
            <el-pagination background layout="prev, pager, next" :total="5">
            </el-pagination>
          </div>
          <div
            v-for="(item, index) in consultantList"
            :key="index"
            class="list-content"
          >
            <div class="line-name">{{ item.name }}</div>
            <el-tag type="plain" size="small" v-if="item.online_status == 1"
              >空闲</el-tag
            >
            <el-tag type="danger" size="small" v-else>忙碌</el-tag>
          </div>
        </el-card>

        <!-- 卡片4 -->
        <el-card class="box-card online-list supervise">
          <div slot="header" class="clearfix">
            <span>督导</span>
            <el-pagination background layout="prev, pager, next" :total="5">
            </el-pagination>
          </div>
          <div
            v-for="(item, index) in superviseList"
            :key="index"
            class="list-content"
          >
            <div class="line-name">{{ item.name }}</div>
            <el-tag type="plain" size="small" v-if="item.online_status == 1"
              >空闲</el-tag
            >
            <el-tag type="danger" size="small" v-else>忙碌</el-tag>
          </div>
        </el-card>
      </div>

      <div class="bottom-box">
        <!-- 卡片5-->
        <el-card class="box-card num-statistics">
          <div
            class="box-content"
            id="numStatistics"
            style="width: 100%; height: 250px"
          ></div>
        </el-card>

        <!-- 卡片6-->
        <el-card class="box-card ranking">
          <div slot="header" class="clearfix">
            <span>当月咨询数量排行</span>
          </div>
          <div
            v-for="(item, index) in consultingList"
            :key="index"
            class="ranking-item"
          >
            <div class="index">{{ item.index }}</div>
            <el-avatar class="avatar"></el-avatar>
            <div class="name">{{ item.username }}</div>
            <div class="num">{{ item.sum }}</div>
          </div>
        </el-card>

        <!-- 卡片7 -->
        <el-card class="box-card ranking">
          <div slot="header" class="clearfix">
            <span>当月好评数量排行</span>
          </div>
          <div
            v-for="(item, index) in consultingList"
            :key="index"
            class="ranking-item"
          >
            <div class="index">{{ item.index }}</div>
            <el-avatar class="avatar"></el-avatar>
            <div class="name">{{ item.username }}</div>
            <div class="num">{{ item.sum }}</div>
          </div>
        </el-card>
      </div>
    </el-container>
  </el-container>
</template>

<style>
#numberOfInquiries {
  jstify-content: center;
  flex-wrap: nowrap;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.el-card {
  height: 100%;
  transition: all 0.5s;
  float: left;
  /* margin-right: calc(25% - 350px); */
}

.el-card:hover {
  margin-top: -5px;
}

.is-selected {
  color: #1989fa;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #2c3e50;
  color: #909399;
}

.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}

.is-selected {
  color: #f8a535;
  /* font-size: 10px;
  margin-top: 5px; */
}

.top-box {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.num-card {
  width: 480px;
}

.num-card .card-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 160px;
  box-sizing: border-box;
}

.num-card .card-left,
.num-card .card-right {
  text-align: center;
}

.num-card .card-title {
  font-size: 14px;
  color: #cfd0d2;
}

.num-card .line {
  width: 1px;
  height: 70px;
  background: #cfd0d2;
}

.num-card .card-num {
  margin-top: 8px;
  font-size: 30px;
  font-weight: bold;
  color: #333;
}

.num-change {
  margin-left: 12px;
  flex: 1;
  height: 200px;
}

.center-box {
  padding: 0 12px;
  display: flex;
  align-items: center;
}

.online-list {
  width: 600px;
}

.online-list .clearfix {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.online-list .list-content {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 33.3%;
  padding-right: 4px;
  box-sizing: border-box;
  margin-bottom: 6px;
}

.supervise {
  margin-left: 12px;
  flex: 1;
}

.bottom-box {
  display: flex;
  align-items: center;
  padding: 12px 12px;
}
.bottom-box .el-card {
  overflow: auto;
}

.bottom-box .num-statistics {
  width: 600px;
  height: 240px;
  overflow: hidden;
}

.ranking {
  flex: 1;
  height: 240px;
  margin-left: 12px;
}

.ranking .ranking-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.ranking .index {
  font-size: 14px;
}

.ranking .avatar {
  margin: 0 8px;
}

.ranking .name {
  flex: 1;
  font-size: 12px;
  color: #7e7e7e;
}

.ranking .num {
  font-size: 12px;
  color: #7e7e7e;
}
</style>

<script>
import * as url from "url";
import axios from "axios";
import * as echarts from "echarts";

export default {
  name: "Calendar",
  components: {},
  data: function () {
    return {
      onlineConsultant: [
        {
          name: "咨询师1",
          tag: "1",
        },
        { name: "咨询师2", tag: "0" },
      ],
      form: {
        id: null,
        EventTitle: null,
        EventTime: null,
      },
      optTitle: "添加事件",
      loading: false,
      value: new Date(),
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      src: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",

      total_session_today: 0, //今日咨询数
      total_session_time: "00:00:00", //今日咨询时长
      consultantList: [], // 咨询师列表
      superviseList: [], // 督导列表
      rankingList: [], // 好评列表
      consultingList: [], // 咨询数量
    };
  },
  mounted() {
    // this.getStatCurrent();
    this.getStatNum(); // 好评数量
    this.getTimeInfo(); // 获取今日时长
    this.getConsultantList(); // 咨询师列表
    this.getSuperviseList(); // 督导列表
    this.getConsultingNum(); // 咨询排行数量

    this.makeNumChange();
    this.makeNumStatistics();
  },
  methods: {
    onMain(formName) {
      this.$router.push("/Main");
    },
    onSchedule(formName) {
      this.$router.push("/Schedule");
    },
    onConsultant(formName) {
      this.$router.push("/ConsultantManagement");
    },
    onMonitor(formName) {
      this.$router.push("/MonitorManagement");
    },
    onHistory(formName) {
      this.$router.push("/ConsultHistory");
    },
    onUser(formName) {
      this.$router.push("/UserManagement");
    },

    // 获取今日时长
    async getTimeInfo() {
      const res = await fetch(`http://139.196.111.161:8080/stat/current?id=1`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await res.json();
      this.total_session_today = result.total_session_today;
      this.total_session_time = this.formatSecToDate(result.total_session_time);
    },

    // 时间转换
    formatSecToDate(sec) {
      if (!sec) {
        return "-";
      }
      var min = Math.floor(sec % 3600); //分钟
      return (
        Math.floor(sec / 3600) + ":" + Math.floor(min / 60) + ":" + (sec % 60)
      );
    },

    // 查看咨询师列表
    async getConsultantList() {
      const res = await fetch(
        `http://139.196.111.161:8080/consultant/list?id=1&identity=2`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const result = await res.json();
      this.consultantList = result.staff_list;
    },

    // 查看督导列表
    async getSuperviseList() {
      const res = await fetch(
        `http://139.196.111.161:8080/consultant/list?id=1&identity=3`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const result = await res.json();
      this.superviseList = result.staff_list;
    },

    // 获取当月好评数量
    async getStatNum() {
      const res = await fetch(
        `http://139.196.111.161:8080/stat/ranking?id=1&type=2`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const result = await res.json();
      this.rankingList = result.ranking;
    },

    // 获取当月咨询排行数量
    async getConsultingNum() {
      const res = await fetch(
        `http://139.196.111.161:8080/stat/ranking?id=1&type=1`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const result = await res.json();
      this.consultingList = result.ranking;
    },

    // 获取7日咨询数据量
    async getConsulting() {},

    // 正在进会话画数量
    // async getStatCurrent() {
    //   const res = await fetch(`http://139.196.111.161:8080/stat/current`);
    //   const result = await res.json();
    // },

    // 绘制图表
    async makeNumChange() {
      const res = await fetch(`http://139.196.111.161:8080/stat/chart?id=1`);
      const result = await res.json();
      const xData = [];
      const yData = [];
      try {
        result.data.forEach((val) => {
          xData.push(val.start_time);
          yData.push(val.count);
        });
      } catch (err) {}
      //初始化ehcharts实例
      var myChart = echarts.init(document.getElementById("numchange"));
      //指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "今日咨询数量变化",
        },
        smooth: true,
        //工具箱
        //保存图片
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
            },
          },
        },
        //图例-每一条数据的名字叫销量
        legend: {
          data: ["销量"],
        },
        //x轴
        xAxis: {
          data: xData,
        },
        //y轴没有显式设置，根据值自动生成y轴
        yAxis: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        //数据-data是最终要显示的数据
        series: [
          {
            type: "line",
            smooth: 0.5,
            data: yData,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  color: "#d4c680",
                },
                color: "#d4c680",
                lineStyle: {
                  //线的颜色
                  color: "#d4c680",
                },
              },
            },
          },
        ],
      };
      //使用刚刚指定的配置项和数据项显示图表
      myChart.setOption(option);
    },

    // 制作数量统计（7日咨询数据量统计）
    async makeNumStatistics() {
      const res = await fetch(
        `http://139.196.111.161:8080/stat/period?id=1&from_day=0&to_day=0`
      );
      const result = await res.json();
      const yData = [];
      try {
        result.data.forEach((val) => {
          yData.push(val.sum);
        });
      } catch (err) {}
      //初始化ehcharts实例
      var myChart = echarts.init(document.getElementById("numStatistics"));
      //指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "7日咨询数据量统计",
        },
        smooth: true,
        //工具箱
        //保存图片
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true,
            },
          },
        },
        //图例-每一条数据的名字叫销量
        legend: {
          data: ["销量"],
        },
        //x轴
        xAxis: {
          data: [
            "第一天",
            "第二天",
            "第三天",
            "第四天",
            "第五天",
            "第六天",
            "第七天",
          ],
        },
        //y轴没有显式设置，根据值自动生成y轴
        yAxis: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        //数据-data是最终要显示的数据
        series: [
          {
            type: "line",
            data: yData,
            itemStyle: {
              normal: {
                color: "#79c9b7",
                lineStyle: {
                  //线的颜色
                  color: "#79c9b7",
                },
              },
            },
          },
        ],
      };
      //使用刚刚指定的配置项和数据项显示图表
      myChart.setOption(option);
    },
  },
};
</script>
