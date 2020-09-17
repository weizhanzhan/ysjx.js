/*
 * @Author: nan
 * @Date: 2020-09-16 14:58:27
 */
/* eslint-disable */
import Vue from 'vue';
import Main from './main.vue';
const NotificationConstructor = Vue.extend(Main);
let instance;  // 单个实例
let instances = []; // 实例弹框集合list
let seed = 1;

const Notification = function (options) {
     options = options || {};  // 配置项
     // 在vue中，调用的时候传来的，在和main中的data合并
     // this.$MyNotification({
     //      title: '???',
     //      message: '右下角弹出的消息',
     //      position: 'bottom-right'
     // });
     const id = 'notification_' + seed++;    // 设置id，用于关闭
     const position = options.position || 'top-right'; // 出现的位置，类名
     // main.vue组件中，data上的onClose属性，在main.vue里定义为null，然后在js中，赋值函数，为实例上的close方法
     // 在单个main.vue实例上，创建的时候，添加一个onClose方法，把id还有userOnClose传进去，实例上就会有这个方法，然后在main中，点击关闭的时候，调用此实例上的方法
     options.onClose = function () {
          console.log('执行删除');
          Notification.close(id);    // 调用实例上close方法
     };
     // 创建main实例dom
     instance = new NotificationConstructor({
          data: options
     });
     instance.id = id;
     instance.$mount();  // 挂载
     document.body.appendChild(instance.$el);     // 添加到body
     instance.visible = true; // 显示 visible属性控制是否显示元素
     instance.dom = instance.$el;  // 设置dom
     instance.dom.style.zIndex = 999;
     // 只要大于5个，就自动删减第一个，以此类推只会出现5个，个性化需求
     if (instances.length >= 5) {
          let ele = instances[0].$el;
          document.body.removeChild(ele);
          instances.splice(0, 1);
          instances.filter(item => item.position === position).forEach(item => {
               let bto = parseInt(item.$el.style.bottom) - item.dom.offsetHeight;;
               console.log(parseInt(item.$el.style.bottom) - item.dom.offsetHeight);
               item.dom.style[item.verticalProperty] = bto - 16 + 'px';
          });
     };
     let verticalOffset = options.offset || 0;    // 设置top或bottom的距离
     // 所有弹框-过滤查找,相同位置的notification,每次增加(自身高度+16),避免覆盖
     instances.filter(item => item.position === position).forEach(item => {
          verticalOffset += item.$el.offsetHeight + 16;     // 加上所有弹框的offsetHeight + 16
     });
     verticalOffset += 16; // 最后一个也加16
     instance.verticalOffset = verticalOffset;    // 设置为当前的偏移量
     console.log(instance);
     instances.push(instance);     // 放入弹框实例数组
     return instance;
}

Notification.close = function (id) {
     console.log('删除');
     let index = -1;
     const len = instances.length;
     // 过滤,查找id
     const instance = instances.filter((instance, i) => {
          if (instance.id === id) {
               index = i;
               return true;
          }
          return false;
     })[0];
     console.log(instance);
     // 不存在,返回
     if (!instance) return;
     // 删除
     instances.splice(index, 1);
     if (len <= 1) return;
     // 删除，剩余el往下落一个元素高度
     const position = instance.position;
     const removedHeight = instance.dom.offsetHeight;
     for (let i = index; i < len - 1 ; i++) {
          if (instances[i].position === position) {
               instances[i].dom.style[instance.verticalProperty] =
               parseInt(instances[i].dom.style[instance.verticalProperty], 10) - removedHeight - 16 + 'px';
          }
     }
};
   // 全部关闭
Notification.closeAll = function () {
     for (let i = instances.length - 1; i >= 0; i--) {
          instances[i].close();
     }
};
export default Notification;