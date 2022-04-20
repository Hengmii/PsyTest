<template>
<el-container style="height: 1080px; border: 1px solid #B3C0D1">
<el-aside width="200px" style="background-color: rgb(13, 25, 60)">
  <el-menu
    default-active="3"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#0d193c"
    text-color="#fff"
    active-text-color="#ffd04b">
          
    <div style="margin-left:20px;margin-top:20px">
      <el-avatar style="vertical-align: -20%" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
      </el-avatar>
      <span style="color:white">欢迎，管理员</span>
    </div>
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title" v-on:click = "onMain('loginForm')">首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title" v-on:click="onHistory('loginForm')">咨询记录</span>
    </el-menu-item>
    <el-menu-item index="3" >
      <i class="el-icon-document"></i>
      <span slot="title" v-on:click = "onSchedule('loginForm')">排班表</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title" v-on:click = "onConsultant('loginForm')">咨询师管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title" v-on:click = "onMonitor('loginForm')">督导管理</span>
    </el-menu-item>
    <el-menu-item index="6">
    <i class="el-icon-setting"></i>
    <span slot="title" v-on:click="onUser('loginForm')">用户管理</span>
  </el-menu-item>
  </el-menu>
</el-aside>

<el-calendar v-model="value">
  <!-- <template
    slot="dateCell"
    slot-scope="{date, data}">
    
    <p @click="calendar_event(date)" >
      {{ data.day.split('-').slice(1).join('-') }}
    </p>
  </template> -->
   <template
    slot="dateCell"
    slot-scope="{date, data}">
    <p :class="data.isSelected ? 'is-selected' : ''">
      {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
    </p>
    <div style="m">
      <label>咨询师:{{consultantList.filter(item=>item.schedule[date.getDay()-1]==1).length}}</label><br/>
      <label>督导: {{monitorList.filter(item=>item.schedule[date.getDay()-1]==1).length}}</label><br/>
    </div>
  </template>
</el-calendar>

<el-aside width="200px" style="background-color: rgb(256, 256, 256)">

<!-- <br>
<div style="text-align:center; color:gray ; font-size:15px ; font-family:"> {{dateFormat(date)}}  </div> -->

 <el-menu  default-active="1"  class="el-menu-demo" mode="horizontal" @select="handleSelect"
  background-color="#FFFFFF"
  text-color="#000000"
  active-text-color="#409EFF" >
  <el-menu-item index="1" style="width: 100px" @click="changeType(1)">&nbsp;咨询师</el-menu-item>

  <el-menu-item index="2" style="width: 100px" @click="changeType(2)">&nbsp;&nbsp;&nbsp;督导</el-menu-item>
</el-menu>
<br>
<div style="text-align:center">
  <el-button type="text" @click="add_consultant()">＋ 添加{{type===1?'咨询师':'督导'}}</el-button>
</div>
  <el-table
    :data="type===1?inConsultantList:isMonitorList"
    style="width: 100%"
    >
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="60">
      <template slot-scope="scope" style="color:#F56C6C; font-color:#F56C6C">
        <el-button
          @click.native.prevent="deleteRow(scope.row)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</el-aside>
<el-dialog :visible="visible" :title="`添加${type===1?'咨询师':'督导'}`" width="300px" @closed="bind_username=''">
  <el-select
    v-model="bind_username"
    filterable
    allow-create
    default-first-option
    placeholder="请选择">
    <el-option
      v-for="item in (type===1?consultantList:monitorList)"
      :key="item.username"
      :label="item.name"
      :value="item.username">
    </el-option>
  </el-select>
  <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 认</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </span>
</el-dialog>

</el-container>


</template>

<style>

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #2c3e50;
  color: #909399;
}

.calendar-day{
        text-align: center;
        color: #202535;
        line-height: 30px;
        font-size: 12px;
    }
.is-selected{
        color: #F8A535!important;
        /* font-size: 10px;
        margin-top: 5px; */
    }
.el-calendar-table .el-calendar-day {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
    height: 150px;
}
.el-calendar-table .el-calendar-click {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px;
    height: 100px;
}
.el-calendar-table thead th {
    padding: 6px 0;
    color: #606266;
    font-weight: normal;
    text-align: center;
}
/* #calendar .el-button-group>.el-button:not(:first-child):not(:last-child):after{
        content: '当月';
    } */
.el-calendar-table:not(.is-range) td.next, .el-calendar-table:not(.is-range) td.prev{
        opacity: 0.7;

    }
.calendar-day,.is-selected{
            color: white;
    }
 
.fc-day-grid-event {
    margin: 1px 2px 0;
    padding: 0 1px;
}
.fc-event {
    position: relative;
    display: block;
    font-size: 0.85em;
    line-height: 1.2;
    border-radius: 3px;
    color: black;
}
.fc-event,#fc-eventone{
    border: 1px solid LightBLue;
    background-color:LightBLue;
}
.fc-event,#fc-eventtwo{
    border: 1px solid PeachPuff;
    background-color:PeachPuff;
}
</style>

<script>
import {saveApi} from '@/api/request'
export default {
  name: 'Calendar',
  components: {
 
  },
  data: function() {
      return {
      tableData: [],
      orgList: [],
      Calendar: [],
      form: {
        id: null,
        EventTitle: null,
        EventTime: null,
      },
      calendarEvents: [],
      dialogFormVisible: false,
      optTitle: '添加事件',
      loading: false,
      value: new Date(),
      date: new Date(),
      consultantList:[],//咨询师
      monitorList:[],//督导
      type:1,
      visible:false,
      bind_username:''
      }
    },
   mounted() {
      this.getConsultantInfo();
      this.getMonitorInfo()
      setTimeout(()=>{
        console.log(this.value)
      },3000)
      },
        
    computed:{
      inConsultantList:function(){
        console.log(this.consultantList,333)
        return this.consultantList.filter(item=>item.schedule[this.value.getDay()-1]==1)
      },
      isMonitorList:function(){
        return this.monitorList.filter(item=>item.schedule[this.value.getDay()-1]==1)
      }
    },
    methods: {
      submitForm(){
        if(!this.bind_username){
          this.$message.warning('请选择')
          return
        }
        let data
        if(this.type===1){
          data=this.consultantList.find(item=>item.username===this.bind_username)
        }else{
           data=this.monitorList.find(item=>item.username===this.bind_username)
        }
        const schedule=data.schedule.split('')
        schedule[this.value.getDay()-1]='1'
        data.schedule=schedule.join('')
        saveApi({...data,schedule_arr:schedule,identity:this.type===1?2:3}).then(res=>{
          if(res.data.status.code===0){
            this.$message.success('添加成功')
            if(this.type===1){
              this.consultantList.some(item=>{
                if(item.username===this.bind_username){
                  item.schedule===data.schedule
                }
              })
              console.log(this.consultantList,333)
            }else{
              this.monitorList.some(item=>{
                if(item.username===this.bind_username){
                  item.schedule===data.schedule
                }
              })
              data.schedule=data.schedule
            }
            this.visible=false
          }
        })
      },

      changeType(type){
        this.type=type
      },
      async getConsultantInfo() {    
      const res = await fetch(`http://139.196.111.161:8080/consultant/list?identity=2`);
      const result = await res.json();
      let list = result["staff_list"];
      this.consultantList=list
    },
     async getMonitorInfo() {
      const res = await fetch(`http://139.196.111.161:8080/consultant/list?identity=3`);
      const result = await res.json();
      let list = result["staff_list"];
      this.monitorList=list
    },
      
      //添加咨询师
      calendar_event(e){
        var month = e.getMonth()+1<10? "0" + (e.getMonth()+1) : e.getMonth() + 1;
        var day = e.getDate()<10 ? "0"+e.getDate() : e.getDate();
        var week = e.getDay();
        var weekArr = [' 星期日',' 星期一',' 星期二',' 星期三',' 星期四',' 星期五',' 星期六'];
        console.log(month + ' 月 ' + day + ' 日 '+ weekArr[week]);
        console.log(weekArr[week]);
      },

      //右边添加
      add_consultant(){
        // var date = this.data.day;
        // console.log(date.day);
        
        // this.$prompt('111','添加咨询师',{
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   //输入约束：inputPattern: 
        //   inputErrorMessage: '输入格式不正确',
          
        // }).then(({ value }) => {
        //   this.$message({
        //     type: 'success',
        //     message: '成功添加 ' + value
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });
        // });
        this.visible=true
      },

      //移除咨询师
      deleteRow(row) {
        const data=row
         const schedule=data.schedule.split('')
        schedule[this.value.getDay()-1]='0'
        data.schedule=schedule.join('')
        saveApi({...data,schedule_arr:schedule,identity:this.type===1?2:3}).then(res=>{
          if(res.data.status.code===0){
            this.$message.success('删除成功')
            if(this.type===1){
              this.consultantList.some(item=>{
                if(item.username===this.bind_username){
                  item.schedule===data.schedule
                }
              })
            }else{
              this.monitorList.some(item=>{
                if(item.username===this.bind_username){
                  item.schedule===data.schedule
                }
              })
              data.schedule=data.schedule
            }
          }
        })
      },
      // dateFormat(time){
      //   var date = new Date(time);
      //   var month = date.getMonth()+1<10? "0" + (date.getMonth()+1) : date.getMonth() + 1;
      //   var day = date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      //   var week = date.getDay();
      //   var weekArr = [' 星期日',' 星期一',' 星期二',' 星期三',' 星期四',' 星期五',' 星期六'];
      //   return month + ' 月 ' + day + ' 日 '+ weekArr[week];
      // },
      handleSelect(key, keyPath) {
          console.log(key, keyPath);
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
          GetCalendar(params)
              .then(result => { 
          this.form = {
          id: result.Calendar[0].id,
        //加上相应的弹窗值，
          };
      });
      },
      // 保存事件
      saveEvent() {
        const _form = this.form;
        SaveCalendar(_form).then(result => {
                  if (result.status.result === true) {
                      if (this.form.id === undefined || this.form.id === '') { // 新增
                          this.$message({
                              message: '新增成功！',
                              type: 'success'
                          });
                      } else {//修改
                          this.$message({
                              message: '修改成功！',
                              type: 'success'
                          });
                      }
                      this.dialogFormVisible = false;
                      this.load()
                  } else {
                      this.$message({
                          message: result.message + '失败',
                          type: 'error'
                      });
              }
          });
      },
      // 删除事件
      delEvent() {
        const _form = this.form;
        SaveCalendar(_form).then(result => { //SaveCalendar(_form)后台存数据
          if (result.status.result === true) {
            this.load()
            this.dialogFormVisible = false;
                      this.$message({
                          message: '删除成功！',
                          type: 'success'
                          });
  
                      // location.reload()
                  } else {
                      this.$message({
                          message: result.message + '删除失败',
                          type: 'error'
                      });
                  }
              });
          },
          onMain(formName){
          this.$router.push('/Main');
          },
        onSchedule(formName){
          this.$router.push('/Schedule');
        },
        onConsultant(formName){
          this.$router.push('/ConsultantManagement');
        },
        onMonitor(formName){
          this.$router.push('/MonitorManagement');
        },
        onHistory(formName){
          this.$router.push('/ConsultHistory');
        },
        onUser(formName) {
           this.$$$router.push('/UserManagement');
        },
        handleOpen(){},
        handleClose(){}
  }
}
</script>