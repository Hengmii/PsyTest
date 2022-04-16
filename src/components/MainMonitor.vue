<template>
  <el-container style="height: 1080px; border: 1px solid #B3C0D1">
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#0d193c"
        text-color="#fff"
        active-text-color="#ffd04b">

        <div style="margin-left:20px;margin-top:20px">
          <el-avatar style="vertical-align: -20%"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
          </el-avatar>
          <span>欢迎，督导</span>
        </div>

        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title" v-on:click="onMain('loginForm')">首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-time"></i>
          <span slot="title" v-on:click="onHistory('loginForm')">咨询记录</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title" v-on:click="onSession('loginForm')">会话列表</span>
        </el-menu-item>
        <!-- <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title" v-on:click="onSchedule('loginForm')">排班表</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onConsultant('loginForm')">咨询师管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onMonitor('loginForm')">督导管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onUser('loginForm')">用户管理</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="; font-size: 12px">
        <el-image style="width: 30px; height: 30px" :src="url" :fit="contain"></el-image>
        <span style="text-align: left; font-size: 25px">心理学院热线咨询</span>
      </el-header>

      <div class="top-box">
        <!-- 卡片1 -->
        <el-card class="box-card info-card">
          <div class="card-content">
            <div class="card-left" style="margin-left:-40px;top:5px">
              <el-image style="width: 240px; height: 200px; margin-top:30px" :src="src_consult"></el-image>
            </div>
            <div class="card-right" style="margin-left:-80px;margin-top:-10px">
              <p>督导 </p>
              <p><i class="el-icon-success" style="color:#67C23A">在线</i></p>
              <p>我的综合评价</p>
              <p>
                <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </p>
            </div>
          </div>
        </el-card>

        <!-- 卡片2 -->
        <el-card class="box-card num-card">
          <div class="card-content">
            <div class="card-left">
              <div class="card-title">今日咨询数</div>
              <div class="card-num">{{ today_session_count }}</div>
            </div>
            <div class="line"></div>
            <div class="card-center">
              <div class="card-title">当前会话数量</div>
              <div class="card-num">{{ current_session_count }}</div>
            </div>
            <div class="line"></div>
            <div class="card-right">
              <div class="card-title">今日咨询时长</div>
              <div class="card-num">{{ total_session_time }}</div>
            </div>
          </div>
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
            >空闲
            </el-tag
            >
            <el-tag type="danger" size="small" v-else>忙碌</el-tag>
          </div>
        </el-card>
      </div>

      <div class="center-box calendar">
        <!-- 日历 -->
        <!-- 卡片4 -->
        <el-card>
          <el-calendar>
            <template slot="dateCell" slot-scope="{ date, data }">
              <div class="dateItem">
                <div class="day">{{ Number(data.day.split("-")[2]) }}</div>
                <i
                  class="el-icon-s-flag icon"
                  v-if="scheduleList[Number(date.getDay()-1)]"
                ></i>
              </div>
            </template>
          </el-calendar>
        </el-card>
      </div>
      <div class="table-box">
        <el-table style="margin-top: -700px" :data="tableData">
          <el-table-column prop="name" label="咨询人" width="80">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="80">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="120">
          </el-table-column>
          <el-table-column prop="time" label="咨询时长" width="120">
          </el-table-column>
          <el-table-column prop="date" label="咨询日期" width="120">
          </el-table-column>
          <el-table-column prop="score" label="咨询评级" width="100">
          </el-table-column>
          <el-table-column prop="comment" label="咨询评价" width="150">
          </el-table-column>
        </el-table>
      </div>
    </el-container>
  </el-container>


</template>

<style>

.top-box {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.center-box {
  padding: 0 12px;
  display: flex;
  align-items: center;
}

.calendar_card {
  padding: 12px;
  /* display: flex; */
  align-items: center;
  width: 450px;
  height: 500px;
}


.card-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 160px;
  box-sizing: border-box;
}

.info-card {
  width: 480px;
  height: 200px;
}

.num-card {
  margin-left: 12px;
  flex: 1;
  height: 200px;
}

.num-card .card-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 160px;
  box-sizing: border-box;
}


.num-card .card-left,
.num-card .card-center,
.num-card .card-right {
  text-align: center;
}


.num-card .card-num {
  margin-top: 8px;
  font-size: 30px;
  font-weight: bold;
  color: #333;
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

/* ===========online========*/
.online-list {
  width: 1400px;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* calendar */
.calendar_card {
  padding: 12px;
  /* display: flex; */
  align-items: center;
  width: 450px;
  height: 500px;
}

.calendar-day {
  text-align: center;
  color: #202535;
  line-height: 30px;
  font-size: 12px;
}

.calendar {
  width: 30%;
}

.dateItem {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dateItem .day {
  position: absolute;
  top: -8px;
  left: -8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #75cea3;
  color: #fff;
}

.dateItem .icon {
  font-size: 20px;
  color: #75cea3;
}

.el-calendar-table:not(.is-range) td.next .dateItem .day,
.el-calendar-table:not(.is-range) td.prev .dateItem .day {
  background: #e5eaed;
}

/* table  */
.table-box {
  margin-left: 700px;
  width: 600px;
}

#numberOfInquiries {
  jstify-content: center;
  flex-wrap: nowrap;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.el-card {
  transition: all .5s;
  float: left;
  margin-right: calc(25% - 350px);
}

.el-card:hover {
  margin-top: -5px;
}

.is-selected {
  color: #1989FA;
}

.el-header {
  background-color: #B3C0D1;
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
  color: #F8A535;
  /* font-size: 10px;
  margin-top: 5px; */
}

</style>

<script>
import * as url from "url";

export default {

  name: 'Calendar',
  components: {},
  data: function () {
    return {
      onlineConsultant: [{
        name: '咨询师1',
        tag: '1'
      },
        {name: '咨询师2', tag: '0'}
      ],
      form: {
        id: null,
        EventTitle: null,
        EventTime: null,
      },
      optTitle: '添加事件',
      loading: false,
      value: 3,
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      src_consult: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',

      today_session_count: 0, //今日咨询数
      current_session_count: 0, //当前会话数
      total_session_time: 0, //今日咨询时长
      consultantList: [], // 咨询师列表
      scheduleList: [],   //日历
      tableData: [
        {
          name: "张先生",
          gender: "男",
          phone: "13000000000",
          time: "10:10",
          date: "2022-04-1",
          score: "4.4分",
          comment: "咨询师很好"
        }, {
          name: "小试",
          gender: "女",
          phone: "13000000000",
          time: "12:09",
          date: "2022-04-1",
          score: "4.6分",
          comment: "咨询师很好"
        }, {
          name: "周小姐",
          gender: "女",
          phone: "13000000000",
          time: "12:09",
          date: "2022-04-1",
          score: "4.6分",
          comment: "咨询师很好"
        }, {
          name: "小米",
          gender: "男",
          phone: "13000000000",
          time: "10:10",
          date: "2022-04-1",
          score: "4.5分",
          comment: "咨询师很好"
        }, {
          name: "小候",
          gender: "男",
          phone: "13000000000",
          time: "10:10",
          date: "2022-04-1",
          score: "4.4分",
          comment: "咨询师很好"
        }
      ]
    }
  },
  mounted() {
    this.getTimeInfo();
    this.getConsultantList(); //咨询师列表
    this.getScheduleList();
  },
  methods: {

    // 获取日历
    async getScheduleList() {
      const res = await fetch(
        `http://139.196.111.161:8080/schedule/list?id=1`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const result = await res.json();
      if (result.status && result.status.code == 0) {
        this.scheduleList = result.schedule;
      }
    },

    // 获取今日时长
    async getTimeInfo() {
      const res = await fetch(`http://139.196.111.161:8080/consultant/current?id=1`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await res.json();
      this.today_session_count = result.today_session_count;
      this.current_session_count = result.current_session_count;
      this.total_session_count = result.total_session_count;
    },
    //查看咨询师列表
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

    ToDate(tim) {//时间处理
      const d = new Date(tim)
      d.setHours(0, 0, 0, 0);
      return tim = d.setHours(0, 0, 0, 0)
    },
    load() {
      //刷新数据的方法，重新查询一遍数据也可
    },
    // 新增
    handleAddClick(date) {
      this.dialogFormVisible = true
      this.optTitle = '新增事件';
      this.form.id = '';
      //加入需要在弹窗新增的

    },
    handleEventClick(info) {
      this.dialogFormVisible = true;
      this.optTitle = '修改事件';
      const params = {
        id: info
      };
    },
    onMain(formName) {
      this.$router.push('/MainMonitor');
    },
    // onSchedule(formName) {
    //   this.$router.push('/Schedule');
    // },
    // onConsultant(formName) {
    //   this.$router.push('/ConsultantManagement');
    // },
    // onMonitor(formName) {
    //   this.$router.push('/MonitorManagement');
    // },
    onHistory(formName) {
      this.$router.push('/ConsultHistoryM');
    },
    onSession(formName) {
      this.$router.push('/SessionM');
    }
    // ,
    // onUser(formName) {
    //   this.$router.push('/UserManagement');
    // }
  }
}
</script>
