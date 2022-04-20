<template>
  <div class="background">
    <el-form ref="loginForm" :model="user" :rules="rules" label-width="8epx" class="login-box">
        <h2 class = "login-title"> 欢迎登录</h2>
        <el-form-item label="用户名" prop="id">
            <el-input type="text" v-model="user.id" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="请输入密码" ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="login-button" type="primary" @click.native.prevent="onSubmit">登录</el-button>
            <!-- <el-button @click="gologin">点我试试</el-button> -->
        </el-form-item>
     <el-dialog title="温馨提示" :visible.sync= "dialogVisible" width="30%" :before-close="handleClose">
        <span>请输入用户名和密码</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click = "dialogVisible = false">确定</el-button>

        </span>
    </el-dialog>

    </el-form>


  </div>
</template>

<script>
import MainVue from './Main.vue';

  export default {
    name: "Login",
    data() {
      return {
        user:{
            id:'',
            password:''
        },
        rules: {
            id: [
                {required: true , message:'用户名不可为空' , trigger: 'blur'},
                //{min: 2 , message: "用户名至少3位" , trigger: 'blur'}
            ],
            password: [
                {required: true , message:'密码不可为空' , trigger: 'blur'},
                //{min: 6 , message: '密码长度至少6位' , trigger: 'blur'}
            ]
        },
        dialogVisible: false
      }
    },
    methods: {
      onSubmit(){
        this.$refs.loginForm.validate( async (valid)=>{
          if(valid){
            let s = 'http://139.196.111.161:8080/user/login?username='+this.user.id+'&password='+this.user.password+'&identity=0';
            const res = await fetch (s,{

              method: 'GET',
              headers: {
                "Content-Type": "application/json;charset-utf-8;"
              }

            })
            // axios.get('http://139.196.111.161:8080/user/login?username=${this.user.id}&password=${this.user.password}&identity=0')
            // .then((res) => {
            //   console.log('res===', res)
            // })
            console.log(res)
            const returnInfo = await res.json();

            if(returnInfo.status.code == 0){
              if(returnInfo.identity == 4){
                this.$router.push('/Main');
              }
              if(returnInfo.identity == 3){
                // let promise = tim.login({userID: this.user.id, userSig: returnInfo.user_sig});
                // promise.then(function(imResponse) {
                //   console.log(imResponse.data); // 登录成功
                //   console.log(1111111111111111);
                //   if (imResponse.data.repeatLogin === true) {
                //     // 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
                //     console.log(imResponse.data.errorInfo);
                //   }
                // }).catch(function(imError) {
                //   console.warn('login error:', imError); // 登录失败的相关信息
                // });

                this.$router.push('/MainMonitor');
              }
              if(returnInfo.identity == 2){
                //IM登录
                // let promise = tim.login({userID: this.user.id, userSig: returnInfo.user_sig});
                // promise.then(function(imResponse) {
                //   console.log(imResponse.data); // 登录成功
                //   console.log(1111111111111111);
                //   if (imResponse.data.repeatLogin === true) {
                //     // 标识帐号已登录，本次登录操作为重复登录。v2.5.1 起支持
                //     console.log(imResponse.data.errorInfo);
                //   }
                // }).catch(function(imError) {
                //   console.warn('login error:', imError); // 登录失败的相关信息
                // });

                this.$router.push('/MainConsult');
              }
            }
            else{
              alert('用户名或密码不正确');
            }

          }
          else{
            this.dialogVisible = true;
            return false;
          }
        })
      },
      handleClose(){}
    }
  }
</script>

<style scoped>
    .background{
        background: url("../img/login_img.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
  }
    .login-box {
    background-color: rgb(220, 231, 241);
    border: 1px solid #DCDFE6;
    width: 400px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }
    .login-title {
  text-align: center;
  margin: 0 auto 40px auto;
    color: #041922;
  }
  .login-button{
      width:150px;
      margin-left: 120px;
  }
</style>
