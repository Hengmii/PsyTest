<template xmlns:font-size="http://www.w3.org/1999/xhtml">

  <el-container style="height: 990px; border: 1px solid #B3C0D1">
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="6"
        class="el-menu-vertical-demo"
        @open.native="handleOpen"
        @close.native="handleClose"
        background-color="#0d193c"
        text-color="#fff"
        active-text-color="#ffd04b">
        
        <div style="margin-left:20px;margin-top:20px">
      <el-avatar style="vertical-align: -20%" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
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
          <span slot="title" v-on:click="onConsultant('loginForm')">咨询师管理</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title" v-on:click="onMonitor('loginForm')">督导管理</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-user"></i>
          <span slot="title" v-on:click="onUser('loginForm')">用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>

      <el-header style="; font-size: 12px">
        <el-image style="width: 30px; height: 30px" :src="url" 
        ></el-image>
        <span style="text-align: left; font-size: 25px">心理学院热线咨询</span>
      </el-header>

      <el-main>
        
<el-col :span="12">
            <el-input
              class="search"
              type="text"
              style="width: 220px" 
              placeholder="输入姓名进行搜索"
              prefix-icon="el-icon-search"
              v-model="username">
            </el-input>
            <el-button @click="input()">确定</el-button>
            <el-button @click="reset()">取消</el-button>
            <!-- <div class="org">
              <div v-for="(item,index) in list" :key="index">
                {{ item }}
              </div>
            </div> -->
            
          </el-col>
        <el-table :data="tableData.slice((currentPage-1) * pagesize, currentPage * pagesize)">
          <el-table-column prop="name" label="姓名" width="140">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="140">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话" width="140">
          </el-table-column>
          <el-table-column prop="emergencyName" label="紧急联系人" width="140">
          </el-table-column>
          <el-table-column prop="emergencyPhone" label="紧急联系电话" width="140">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="170">
            <template slot-scope="scope">
              {{scope.row.state?'正常':'禁用'}}
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">  
              <el-button
                  size="mini"
                  :disabled="scope.row.state?false:true"
                  type="danger"
                  @click="clickDel(scope.row)">禁用
                </el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-main>
      <el-footer align="right">
        <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableData.length"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40">
        </el-pagination>
      </el-footer>
    </el-container>
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

.el-col {
  border-radius: 40px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 20px;
  background-color: #f9fafc;
}
</style>

<script>
import * as vm from "vm";
import Vue from "vue";
import {editUserApi} from '@/api/request'

export default {
  data() {
    return {
      score: 5,
      selectVal: '',
      currentPage: 1,
      pagesize: 10,
      username:'',
      dialogTableVisible: false,
      dialogFormVisible: false,
    //   options: [{
    //     value: '督导1',
    //     label: '督导1'
    //   }, {
    //     value: '督导2',
    //     label: '督导2'
    //   }, {
    //     value: '督导3',
    //     label: '督导3'
    //   }],
      value: [],
    //   ruleForm: {
    //     name: '',
    //     gender: '',
    //     age: '',
    //     phone: '',
    //     type: [],
    //     id: '',
    //     desc: '',
    //   },
    //   rules: {
    //     name: [
    //       {required: true, message: '请输入姓名', trigger: 'blur'},
    //       {min: 2, message: '长度应大于一个字符', trigger: 'blur'},
    //       {max: 32, message: '长度应小于 32 个字符', trigger: 'blur'}
    //     ],
    //     gender: [
    //       {required: true, message: '请选择性别', trigger: 'change'}
    //     ],
    //     age: [
    //       {required: true, message: '请输入年龄', trigger: 'blur'},
    //     ],
    //     id: [
    //       {required: true, message: '请输入身份证号码', trigger: 'blur'},
    //     ],
    //     email: [
    //       {required: true, message: '请输入邮箱地址', trigger: 'blur'},
    //     ],
    //     phone: [
    //       {required: true, message: '请填写电话号码', trigger: 'blur'},
    //       {min: 11, max: 11, message: '请输入正确的电话号码', trigger: 'blur'}
    //     ]
    //   },
      tableData: [],
      orgList: [],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    //   pickerOptions: {
    //     disabledDate(time) {
    //       return time.getTime() > Date.now();
    //     },
    //     shortcuts: [{
    //       text: '今天',
    //       onClick(picker) {
    //         picker.$emit('pick', new Date());
    //       }
    //     }, {
    //       text: '昨天',
    //       onClick(picker) {
    //         const date = new Date();
    //         date.setTime(date.getTime() - 3600 * 1000 * 24);
    //         picker.$emit('pick', date);
    //       }
    //     }, {
    //       text: '一周前',
    //       onClick(picker) {
    //         const date = new Date();
    //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
    //         picker.$emit('pick', date);
    //       }
    //     }]
    //   },
    //   value1: '',
    //   value2: '',
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    
    input() {
      const keywords = this.username;
      const result = this.orgList.filter((item) => item.name.toLowerCase().includes(keywords.toLowerCase()));
      console.log(result);
      console.log(this.username);
      this.tableData = result;
    },
    reset() {
      this.tableData = this.orgList;
    },
    async getUserInfo() {
      this.tableData=[]
      this.orgList=[]
      const res = await fetch(`http://139.196.111.161:8080/visitor/list?identity=1`);
      const result = await res.json();
      console.log('result.status.msg',result.status.msg);
      
      let list = result["visitor_list"];
    //   list.map(e => {
    //     let scheduleInt = parseInt(e.schedule, 2);
    //     let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    //     let weekStr = '';
    //     for (let i = 0; i < 7; i++) {
    //       if (scheduleInt & (1 << (6 - i))) {
    //         weekStr += week[i] + '、';
    //       }
    //     }
    //     e.schedule = weekStr.substring(0, weekStr.length - 1);
    //     return e;
    //   });
      this.tableData.push(...list);
      this.orgList.push(...list);
    },

    // 移除========
    clickDel(row) {
      // this.tableData.splice(index, 1);
      // this.save();
      editUserApi({id:row.id,state:0,identity:1}).then(res=>{
        if(res.data.status.code===0){
          this.$message.success('禁用成功')
          this.getUserInfo()
        }
      })
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    keyUp(e) {
      if (e.target.value.search(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g) !== -1) {
        alert('姓名不能包含特殊字符！');
        return false;
      }
    },
    isIdCardNo(e) {
      var patt = /(^\d{15}$)|(^\d{17}([0-9]|X)$)(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
      if (!patt.test(e.target.value)) {
        alert('请输入正确的身份证号码！')
        return false;
      }
    },
    isPhoneNumber(e) {
      var patt = /(^\d{15}$)|(^\d{17}([0-9]|X)$)(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
      if (!patt.test(e.target.value)) {
        alert('请输入正确的手机号码！')
        return false;
      }
    },
    isEmail(e) {
      var patt = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      if (!patt.test(e.target.value)) {
        alert('请输入正确的邮箱！')
        return false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('已添加');

        } else {
          console.log('添加失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onMain(formName) {
      this.$router.push('/Main');
    },
    onSchedule(formName) {
      this.$router.push('/Schedule');
    },
    onConsultant(formName) {
      this.$router.push('/ConsultantManagement');
    },
    onMonitor(formName) {
      this.$router.push('/MonitorManagement');
    },
    onHistory(formName) {
      this.$router.push('/ConsultHistory');
    },
    onUser(formName) {
           this.$router.push('/UserManagement');
    },
    handleEdit(index, row) {
      console.log(index, row);
    }
  },

};
</script>
