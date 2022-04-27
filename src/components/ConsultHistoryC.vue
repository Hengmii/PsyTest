<template>
  <el-container style="height: 1080px; border: 1px solid #b3c0d1">
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#0d193c"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <div style="margin-left: 20px; margin-top: 20px; font-color: white">
          <el-avatar
            style="vertical-align: -20%"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
          </el-avatar>
          <span style="color:white">欢迎，李咨询师</span>
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
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="font-size: 12px">
        <el-image
          style="width: 30px; height: 30px"
          :src="url"
          :fit="contain"
        ></el-image>
        <span style="text-align: left; font-size: 25px">心理学院热线咨询</span>
      </el-header>

      <el-main>
        <div class="block">
          <!--          <span class="demonstration">默认</span>-->
          <!-- <el-input
            style="width: 220px"
            placeholder="输入姓名进行搜索"
            prefix-icon="el-icon-search"
            v-model="input2"
          >
          </el-input> -->
          <!-- <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker> -->
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="150">
          </el-table-column>

          <el-table-column prop="create_time" label="开始咨询时间" width="240">
          </el-table-column>

          <el-table-column prop="finish_time" label="结束咨询时间" width="240">
          </el-table-column>

          <el-table-column prop="consultant_comment" label="咨询评价" width="300">
          </el-table-column>

          <!-- <el-table-column
      prop="help"
      label="咨询求助"
      width="200">
    </el-table-column> -->

          <el-table-column fixed="right" label="导出记录" width="100">
            <template
              slot-scope="scope"
              style="color: #f56c6c; font-color: #f56c6c"
            >
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "ConsultHistory",
  components: {},
  data: function () {
    return {
      tableData: [],
      orgList: [],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  mounted() {
    this.getSessionList();
  },
  methods: {
    handleOpen() {},
    handleClose() {},

    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(timeNum) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(timeNum);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        this.add0(m) +
        "-" +
        this.add0(d) +
        " " +
        this.add0(h) +
        ":" +
        this.add0(mm) +
        ":" +
        this.add0(s)
      );
    },

    async getSessionList() {
      this.tableData = [];
      const res = await fetch(`http://139.196.111.161:8080/session/list?id=2`);
      const result = await res.json();
      console.log("result", result);
      let list = result["session_list"];
      const newData = [];
      if (list && list.length) {
        list.forEach((val) => {
          val.order.create_time = this.format(val.order.create_time);
          val.order.finish_time = this.format(val.order.finish_time);
          newData.push({
            ...val.order,
            name: val.name,
          });
        });
      }
      this.tableData.push(...newData);
      this.orgList.push(...newData);
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
    onSession(formName) {
      this.$router.push("SessionC");
    },
    // ,
    // onUser(formName) {
    //   this.$router.push('/UserManagement');
    // }
  },
};
</script>

<style scoped>
</style>
