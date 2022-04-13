<template xmlns:font-size="http://www.w3.org/1999/xhtml">

  <el-container style="height: 990px; border: 1px solid #B3C0D1">
    <el-aside width="200px" style="background-color: rgb(13, 25, 60)">
      <el-menu
        default-active="4"
        class="el-menu-vertical-demo"
        @open.native="handleOpen"
        @close.native="handleClose"
        background-color="#0d193c"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="0">
          <span slot="title">欢迎，机构管理员</span>
        </el-menu-item>
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
        <el-image style="width: 30px; height: 30px" :src="url" ></el-image>
        <span style="text-align: left; font-size: 25px">心理学院热线咨询</span>
      </el-header>

      <el-main>
        

        <div class="block">
          <!--          <span class="demonstration">默认</span>-->
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
          <el-col :span="12">
            <!--             添加咨询师-->
            <el-container>
              <el-button type="primary" @click="dialogFormVisible = true" style="margin-left:70%">添加咨询师</el-button>
              <el-dialog :visible.sync="dialogFormVisible" center @closed="closed">
                <template slot="title">
                  <div style="font-size: 25px; color:cornflowerblue; font-weight: bold">添加咨询师</div>
                  <span>添加咨询师账号并添加其个人信息</span>
                </template>
                <el-tabs v-model="activeName" @tab-click="addConsultant">
                  <el-tab-pane label="个人信息" name="first">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="姓名" prop="name">
                        <el-col :span="11">
                          <el-input v-model="ruleForm.name" placeholder="请输入姓名" ></el-input>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="ruleForm.gender">
                              <el-radio label="男"></el-radio>
                              <el-radio label="女"></el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-form-item>

                      <el-form-item label="年龄" prop="age" required>
                        <el-col :span="8">
                          <el-input v-model="ruleForm.age" placeholder="请输入年龄"></el-input>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item label="身份证号码" prop="idCard" required>
                            <el-input v-model="ruleForm.idCard" placeholder="请输入身份证号码" ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-form-item>

                      <el-form-item label="电话" prop="phone" required>
                        <el-col :span="8">
                          <el-input v-model="ruleForm.phone" placeholder="请输入联系电话" ></el-input>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item label="邮箱地址" prop="email" required>
                            <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-form-item>

                      <el-form-item label="绑定督导" prop="bind_username">
                        <el-select
                          v-model="ruleForm.bind_username"
                          multiple
                          filterable
                          allow-create
                          default-first-option
                          placeholder="请选择督导">
                          <el-option
                            v-for="item in monitorList"
                            :key="item.username"
                            :label="item.name"
                            :value="item.username">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="工作信息" name="second">工作信息
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="用户名" prop="username" required>
                        <el-col :span="8">
                          <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item label="密码" prop="password" required>
                            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="工作单位" prop="workplace" required>
                        <el-col :span="8">
                          <el-input v-model="ruleForm.workplace" placeholder="请输入工作单位"></el-input>
                        </el-col>
                        <el-col :span="14">
                          <el-form-item label="职称" prop="title" required>
                            <el-input v-model="ruleForm.title" placeholder="请输入个人职称"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-form-item>

                    </el-form>
                  </el-tab-pane>
                </el-tabs>
                <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                    </span>
              </el-dialog>
            </el-container>
          </el-col>
        </div>
        <!--        表格内容-->
        <el-table :data="tableData.slice((currentPage-1) * pagesize, currentPage * pagesize)">
          <el-table-column prop="name" label="姓名" width="140">
          </el-table-column>
          <el-table-column prop="title" label="身份" width="140">
          </el-table-column>
          <el-table-column prop="bind_username" label="绑定督导" width="140">
            <!-- <template slot-scope="scope">
                {{scope.row.bind_username.jion}}
            </template> -->
          </el-table-column>
          <el-table-column prop="total_session_count" label="总咨询数" width="140">
          </el-table-column>
          <el-table-column prop="total_work_time" label="咨询总时长" width="140">
          </el-table-column>
          <el-table-column prop="score" label="平均咨询评级" width="170">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.score"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="schedule" label="周值班安排" width="170">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary" plain
                @click="editForm(scope.row)">修改
              </el-button>
              <el-dialog :visible.sync="editDialogForm" center width="30%">

                <template slot="title">
                  <div style="font-size: 25px; color:cornflowerblue; font-weight: bold">修改咨询师信息</div>
                  <span>修改咨询师个人信息</span>
                </template>
                <el-form :model="toModifyForm" :rules="rules">
                  <el-form-item label="姓名" label-width="70px">
                    <el-input id="name" name="name" v-model="toModifyForm.name" autocomplete="off"
                              style="width: 300px"></el-input>
                  </el-form-item>                  
                    <el-form-item label="绑定督导" prop="bind_username">
                      <el-select
                        v-model="ruleForm.bind_username"
                        multiple
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择督导">
                        <el-option
                          v-for="item in monitorList"
                          :key="item.username"
                          :label="item.name"
                          :value="item.username">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item>
                    <el-checkbox-group
                      v-model="checkSchedule">周值班安排
                      <el-checkbox name="checkbox" label="周一"></el-checkbox>
                      <el-checkbox name="checkbox" label="周二"></el-checkbox>
                      <el-checkbox name="checkbox" label="周三"></el-checkbox>
                      <el-checkbox name="checkbox" label="周四"></el-checkbox>
                      <el-checkbox name="checkbox" label="周五"></el-checkbox>
                      <el-checkbox name="checkbox" label="周六"></el-checkbox>
                      <el-checkbox name="checkbox" label="周日"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-footer>
                    <el-button type="primary" @click="confirmEdit">确认</el-button>
                    <el-button @click="editDialogForm=false">取 消</el-button>
                  </el-footer>
                </el-form>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.state?false:true"
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
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
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

import {addApi,saveApi,editUserApi} from '@/api/request.js'

export default {
  data() {
    const nameValid=(rule,value,cb)=>{
      const pattern=/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/
      if(!pattern.test(value)){
        return cb()
      }
      cb(new Error('名字中不能含有特殊字符'))
    }
    return {
      // selected: -1,
      toModifyForm: {
        name: "aaa",
        bind_username: "bbb"
      },
      checkSchedule: [],
      check_val: [],
      formLabelWidth: '120px',
      editDialogForm: false,
      activeName: 'first',
      username: '',
      title: '',
      search: [],
      score: 5,
      // selectVal: '',
      currentPage: 1,
      pagesize: 10,
      // dialogTableVisible: false,
      dialogFormVisible: false,
      // editFormVisible: false,
      value: [],
      form: {
        name: '',
        bind_username: '',
        schedule: ''
      },
      ruleForm: {
        username: '',
        password: '',
        workplace: '',
        title: '',
        name: '',
        gender: '',
        age: '',//
        email:'',
        phone: '',
        bind_username:[],
        idCard: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min:2,max:32,message:'用户名长度应为2-32',trigger:'blur'},
          {validator:nameValid,trigger:'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, message: '密码至少为 6 个字符', trigger: 'blur'},
        ],
        workplace: [
          {required: true, message: '请输入工作单位', trigger: 'blur'},
        ],
        title: [
          {required: true, message: '请输入个人职称', trigger: 'blur'},
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        age: [
          {required: true, message: '请输入年龄', trigger: 'blur'},
          {pattern:/^(?:0|[1-9][0-9]?|100)$/,message:'请输入合法年龄',trigger:'blur' }
        ],
        idCard: [
          {required: true, message: '请输入身份证号码', trigger: 'blur'},
          {pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)(^\d{15}$)|(^\d{17}([0-9]|X)$)/,message:'请输入正确格式的身份证号码',trigger:'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          { pattern: /^\w+@\w+(\.\w+)+$/,message:'请输入正确格式的邮箱', trigger: 'blur' }
        ],
        phone: [
          {required: true, message: '请填写电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message:'请输入正确格式的手机号',trigger:'blur'}
        ],
        username:[
          {required:true,message:'用户名不能为空',trigger:'blur'},
          {pattern:/^[a-zA-Z_]+/,message:'用户名只能包含大小写字母和下划线',trigger:'blur'}
        ]
      },
      tableData: [],
      orgList: [],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      pickermonitorList: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      // value1: '',
      // value2: '',
      monitorList:[],//督导列表
    };
  },
  mounted() {
    this.getConsultantInfo()
    this.getMonitorList()
  },
  methods: {
    closed(){
       this.ruleForm= {
        username: '',
        password: '',
        workplace: '',
        title: '',
        name: '',
        gender: '',
        age: '',//
        email:'',
        phone: '',
        bind_username:[],
        idCard: '',
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    addConsultant(tab, event) {
      console.log(tab, event);
    },
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
    editForm(row) {
      this.editDialogForm = true;
      this.toModifyForm = JSON.parse(JSON.stringify(row));
      console.log(this.toModifyForm,222)
      this.checkSchedule = row.schedule.split("、");
    },
    async confirmEdit() {
      // var name = document.getElementById("name").value;
      // var bind_username = document.getElementById("bind_username").value;
      var obj = document.getElementsByName('checkbox');
      let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].checked) {
          if(!this.check_val.includes(obj[i].value)) {
            this.check_val.push(obj[i].value);
          }
        }
      }
      this.checkSchedule=week.reduce((pre,item)=>{
        pre.push(this.check_val.includes(item)?1:0)
        return pre
      },[]);
       saveApi({...this.toModifyForm,schedule_arr:this.checkSchedule,identity:2}).then(res=>{
         if(res.data.status.code===0){
           this.$message.success('修改成功')
           this.getConsultantInfo()
           this.editDialogForm=false
         }else{
            this.$message.error('修改失败')
         }
       })

      // alert(this.checkSchedule);
    },
    // 新增
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
         addApi({...this.ruleForm,identity:2}).then(res=>{
            if(res.data.status.code===0){
              this.$message.success('添加成功')
              this.getConsultantInfo()
              this.dialogFormVisible=false
            }else{
              this.$message.error(res.dtat.status.msg)
            }
          })
        } else {
         this.$message.warning('请检查输入信息')
          return false;
        }
      });
    },
    // 禁用
    //  clickDel(index) {
    //   this.tableData.splice(index, 1);
    //   this.save();
    // },
    async getConsultantInfo() {
      this.tableData=[]
      this.orgList=[]
      const res = await fetch(`http://139.196.111.161:8080/consultant/list?identity=2`);
      const result = await res.json();
      let list = result["staff_list"];
      list.map(e => {
        let scheduleInt = parseInt(e.schedule, 2);
        let week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        let weekStr = '';
        for (let i = 0; i < 7; i++) {
          if (scheduleInt & (1 << (6 - i))) {
            weekStr += week[i] + '、';
          }
        }
        e.schedule = weekStr.substring(0, weekStr.length - 1);
        return e;
      });
      this.tableData.push(...list);
      this.orgList.push(...list);
    },

    async getMonitorList(){
       const res = await fetch(`http://139.196.111.161:8080/consultant/list?identity=3`);
       const result = await res.json();
       this.monitorList= result["staff_list"];

    },
    clickDel(row) {
      editUserApi({id:row.id,state:0,identity:2}).then(res=>{
      // saveApi({id:row.id,score:row.score,identity:2,state:0}).then(res=>{
        if(res.data.status.code===0){
          this.$message.success('禁用成功')
          this.getConsultantInfo()
        }else{
          this.$message.error('禁用失败')
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
    }
  },

};
</script>
