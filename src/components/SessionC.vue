<template >
<div class="background">
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
          <span>欢迎，咨询师</span>
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
      <div class="chat-wrapper">
        <button @click="send">发送</button>
        <button @click="receive">接收</button>
        <el-row>
          <el-col :xs="10" :sm="10" :md="8" :lg="8" :xl="7">
          </el-col>
          <el-col :xs="14" :sm="14" :md="16" :lg="16" :xl="17">
          </el-col>
        </el-row>
      </div>
    </el-container>
  </el-container>
</div>
  
</template>

<style>

.background{  
        background: url("../img/bg.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
  }

.el-aside {
  background-color: #2c3e50;
  color: #909399;
}
/* 
.side-bar-wrapper{
  margin-left: 100px;
  margin-top: 40px;
  width: 80px;
  height: 600px;
  color: black;
  background-color: #ffffff;
}

.bar-left{
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    width: 80px;
    height: 600px;
    background-color: #303841;
}

.tab-items{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
}

.iconfont {
  position: relative;
  margin: 0;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  color: #a5b5c1;
  user-select: none;
  -moz-user-select: none;
}

.active {
  color: #ffffff;
  background-color: #363e47;
}

.active.after {
  content: ' ';
  display: block;
  position: absolute;
  top: 0;
  z-index: 0;
  height: 70px;
  border-left: 4px solid #5cadff;
}

.unread {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  display: inline-block;
  height: 18px;
  padding: 0 6px;
  font-size: 12px;
  color: #FFF;
  line-height: 18px;
  ext-align: center;
  white-space: nowrap;
  border-radius: 10px;
  background-color: #f35f5f;
}

.bar-right {
  width: 100px;
  min-width: 0;
  height: 600px;
  background-color: #363e47;
} */

.chat-wrapper {
  margin-top: 40px;
  margin-left: 60px;
  width: 800px;
  height: 600px;
  /* max-width: 100px; */
  box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);

}

</style>

<script>
import * as url from "url";
import TIM from 'tim-wx-sdk';

export default {

  data: function () {
    return {
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  mounted() {

  },
  methods: {

    send(){
      let message = tim.createTextMessage({
      to: 'C-003',
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: 'Hello world!'
      }
    });
      //发送消息
      let promise = tim.sendMessage(message);
      promise.then(function(imResponse) {
        // 发送成功
        console.log("成功了！")
        console.log(imResponse);
      }).catch(function(imError) {
        // 发送失败
        console.log("失败了。。")
        console.warn('sendMessage error:', imError);
      });
    },
    receive(){
      let onMessageReceived = function(event) {
        // event.data - 存储 Message 对象的数组 - [Message]

      };
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
    },

    handleOpen(){},
    handleClose(){},

    onMain(formName) {
      this.$router.push("/MainConsult");
    },
    onHistory(formName) {
      this.$router.push("/ConsultHistoryC");
    },
    onSession() {
      this.$router.push();
    }
  }
};
</script>
