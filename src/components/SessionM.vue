<template>
  <el-container style="height: 1080px; border: 1px solid #b3c0d1">
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="3"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
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
          <span>欢迎，督导</span>
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
          <i class="el-icon-menu"></i>
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

    </el-container>
  </el-container>
</template>

<style>

.el-aside {
  background-color: #2c3e50;
  color: #909399;
}

</style>

<script>
import * as url from "url";

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
      value: 3,
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      src_consult:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",

      today_session_count: 0, //今日咨询数
      current_session_count: 0, //当前会话数
      total_session_time: "00:00:00", //今日咨询时长
      total_session_count: 0, //累计完成会话数
      scheduleList: [], // 日历信息
      tableData: [
        {
          name:"张先生",
          gender:"男",
          phone:"13000000000",
          time:"10:10",
          date:"2022-04-1",
          score:"4.4分",
          comment:"咨询师很好"
        },{
          name:"小试",
          gender:"女",
          phone:"13000000000",
          time:"12:09",
          date:"2022-04-1",
          score:"4.6分",
          comment:"咨询师很好"
        },{
          name:"周小姐",
          gender:"女",
          phone:"13000000000",
          time:"12:09",
          date:"2022-04-1",
          score:"4.6分",
          comment:"咨询师很好"
        },{
          name:"小米",
          gender:"男",
          phone:"13000000000",
          time:"10:10",
          date:"2022-04-1",
          score:"4.5分",
          comment:"咨询师很好"
        },{
          name:"小候",
          gender:"男",
          phone:"13000000000",
          time:"10:10",
          date:"2022-04-1",
          score:"4.4分",
          comment:"咨询师很好"
        }
      ]
    };
  },
  mounted() {
    this.getTimeInfo();
    this.getScheduleList(); // 获取日历信息
  },
  methods: {
    // 获取今日时长
    async getTimeInfo() {
      const res = await fetch(
        `http://139.196.111.161:8080/consultant/current?id=1`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const result = await res.json();
      this.today_session_count = result.today_session_count;
      this.current_session_count = result.current_session_count;
      this.total_session_count = result.total_session_count;
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

    ToDate(tim) {
      //时间处理
      const d = new Date(tim);
      d.setHours(0, 0, 0, 0);
      return (tim = d.setHours(0, 0, 0, 0));
    },
    load() {
      //刷新数据的方法，重新查询一遍数据也可
    },
    // 新增
    handleAddClick(date) {
      this.dialogFormVisible = true;
      this.optTitle = "新增事件";
      this.form.id = "";
      //加入需要在弹窗新增的
    },
    handleEventClick(info) {
      this.dialogFormVisible = true;
      this.optTitle = "修改事件";
      const params = {
        id: info,
      };
    },
    onMain(formName) {
      this.$router.push("/MainConsult");
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
      this.$router.push("/ConsultHistoryC");
    },
    onSession() {
      this.$router.push('/SessionM');
    }
    // ,
    // onUser(formName) {
    //   this.$router.push('/UserManagement');
    // }
  },
};
</script>
