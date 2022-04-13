<template>
 <el-container style="height: 1080px; border: 1px solid #B3C0D1">
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#0d193c"
        text-color="#fff"
        active-text-color="#ffd04b">
        
        <div style="margin-left:20px;margin-top:20px;font-color:white">
      <el-avatar style="vertical-align: -20%" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
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
          <span slot="title" v-on:click="onSession('loginForm')">会话记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="; font-size: 12px">
        <el-image style="width: 30px; height: 30px" :src="url" :fit="contain"></el-image>
        <span style="text-align: left; font-size: 25px">心理学院热线咨询</span>
      </el-header>

      <el-main>
         <div class="block">
      <!--          <span class="demonstration">默认</span>-->
      <el-input
        style="width: 220px"
        placeholder="输入姓名进行搜索"
        prefix-icon="el-icon-search"
        v-model="input2">
      </el-input>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    
    <el-table-column
      prop="create_time"
      label="咨询日期"
      width="150">
    </el-table-column>

    <el-table-column
      prop="name"
      label="咨询评级"
      width="120">
    </el-table-column>

    <el-table-column
      prop="name"
      label="咨询评价"
      width="120">
    </el-table-column>

    <el-table-column
      prop="name"
      label="咨询求助"
      width="120">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="60">

      <template slot-scope="scope" style="color:#F56C6C; font-color:#F56C6C">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
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
  components: {

  },
  data: function(){
    return {
      tableData: [],
      orgList: [],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted(){
    this.getSessionList();
  },
  methods: {
    async getSessionList() {
      
      const res = await fetch(`http://139.196.111.161:8080/session/list?`);
      const result = await res.json();
      debugger;
      let list = result["session_list"];
      this.tableData.push(...list);
      this.orgList.push(...list);
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
    // onUser(formName) {
    //   this.$router.push('/UserManagement');
    // }
  }
}
</script>

<style scoped>

</style>
