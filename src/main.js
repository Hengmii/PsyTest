// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import tim from './tim.js'

// import { MessageBox, Row, Col, Button, Input, Loading, Dialog, Dropdown, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Divider, Popover, Collapse, CollapseItem, Form, FormItem, Select, Option, Menu, MenuItem, MenuItemGroup, Submenu, Tooltip , Message} from 'element-ui'
// import Avatar from './components/avatar.vue'


import axios from 'axios'
// 从v2.11.2起，SDK 支持了 WebSocket，推荐接入；v2.10.2及以下版本，使用 HTTP
import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';

import { MessageBox, Row, Col, Button, Input, Loading, Dialog, Dropdown, DropdownMenu, DropdownItem, Checkbox, CheckboxGroup, Divider, Popover, Collapse, CollapseItem, Form, FormItem, Select, Option, Menu, MenuItem, MenuItemGroup, Submenu, Tooltip} from 'element-ui'
import Avatar from './components/avatar.vue'
import Index from './index.vue'
import TWebLive from 'tweblive'
import VueClipboard from 'vue-clipboard2'
import './assets/icon/iconfont.css'
import './assets/icon/tim.css'
import './assets/css/animate.css'
import trtcCalling from './trtc-calling'
import TRTCCalling from 'trtc-calling-js'

window.tim = tim
window.TIM = TIM
window.TRTCCalling = TRTCCalling
window.trtcCalling = trtcCalling
window.store = store
Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
Vue.prototype.tim = tim
Vue.prototype.TIM = TIM
Vue.prototype.TWebLive = TWebLive
Vue.prototype.$store = store
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.trtcCalling = trtcCalling
Vue.prototype.TRTCCalling = TRTCCalling
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(VueClipboard)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Divider)
Vue.use(Popover)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Tooltip)
Vue.component('avatar', Avatar)


// 监听事件

tim.on(TIM.EVENT.SDK_READY, function(event) {
  console.log(event)
  // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
  // event.name - TIM.EVENT.SDK_READY
});

tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
  console.log(event)
  // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
  // event.name - TIM.EVENT.MESSAGE_RECEIVED
  // event.data - 存储 Message 对象的数组 - [Message]
});

tim.on(TIM.EVENT.MESSAGE_REVOKED, function(event) {
  console.log(event)
  // 收到消息被撤回的通知
  // event.name - TIM.EVENT.MESSAGE_REVOKED
  // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
});

tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, function(event) {
  console.log(event)
  // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
  // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
  // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
});

tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, function(event) {
  console.log(event)
  // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
  // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
  // event.data - 存储 Conversation 对象的数组 - [Conversation]
});

tim.on(TIM.EVENT.GROUP_LIST_UPDATED, function(event) {
  console.log(event)
  // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
  // event.name - TIM.EVENT.GROUP_LIST_UPDATED
  // event.data - 存储 Group 对象的数组 - [Group]
});

tim.on(TIM.EVENT.PROFILE_UPDATED, function(event) {
  console.log(event)
  // 收到自己或好友的资料变更通知
  // event.name - TIM.EVENT.PROFILE_UPDATED
  // event.data - 存储 Profile 对象的数组 - [Profile]
});

tim.on(TIM.EVENT.BLACKLIST_UPDATED, function(event) {
  console.log(event)
  // 收到黑名单列表更新通知
  // event.name - TIM.EVENT.BLACKLIST_UPDATED
  // event.data - 存储 userID 的数组 - [userID]
});

tim.on(TIM.EVENT.ERROR, function(event) {
  console.log(event)
  // 收到 SDK 发生错误通知，可以获取错误码和错误信息
  // event.name - TIM.EVENT.ERROR
  // event.data.code - 错误码
  // event.data.message - 错误信息
});

tim.on(TIM.EVENT.SDK_NOT_READY, function(event) {
  console.log(event)
  // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
  // event.name - TIM.EVENT.SDK_NOT_READY
});

tim.on(TIM.EVENT.KICKED_OUT, function(event) {
  console.log(event)
  // 收到被踢下线通知
  // event.name - TIM.EVENT.KICKED_OUT
  // event.data.type - 被踢下线的原因，例如:
  //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
  //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
  //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。
});

 tim.on(TIM.EVENT.NET_STATE_CHANGE, function(event) {
  console.log(event)
  //  网络状态发生改变（v2.5.0 起支持）。
  // event.name - TIM.EVENT.NET_STATE_CHANGE
  // event.data.state 当前网络状态，枚举值及说明如下：
  //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
  //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
  //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
});





Vue.config.productionTip = false

Vue.prototype.$tim =tim
export default tim

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})
