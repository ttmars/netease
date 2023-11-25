<script setup>
import { bottomTabs, topTabs, currentTab } from './store.js'
</script>

<template>
  <div style="display: flex; margin-left: 10px; margin-bottom: 20px; margin-top: 5px;">
    <img style="margin-right: 10px;align-items: center;" src="../assets/logo.svg" alt="" width="30" height="30">
    <el-text style="font-size: 20px;"><b>网易云音乐</b></el-text>
  </div>

  <el-button round :class="['left-nav-button', { active: currentTab === tab.cpn }]" v-for="(tab, _) in topTabs" :key="tab"
    :icon="tab.iconName" @click="currentTab = tab.cpn">
    {{ tab.buttonName }}
  </el-button>
  <!-- <el-button round class="left-nav-button" icon="HomeFilled">为我推荐</el-button>
  <el-button round class="left-nav-button" icon="Service">云音乐精选</el-button>
  <el-button round class="left-nav-button" icon="Search">播客</el-button>
  <el-button round class="left-nav-button" icon="Search">私人漫游</el-button>
  <el-button round class="left-nav-button" icon="ChatDotRound">社区</el-button> -->

  <el-divider style="width: 150px;margin-left: 10px;margin-top: 5px;margin-bottom: 15px;" />
  <el-button round :class="['left-nav-button', { active: currentTab === tab.cpn }]"
    v-for="(tab, _) in bottomTabs" :key="tab" :icon="tab.iconName" @click="currentTab = tab.cpn">
    {{ tab.buttonName }}
  </el-button>
  <!-- <el-button round class="left-nav-button" icon="Clock">我喜欢的音乐</el-button>
  <el-button round class="left-nav-button" icon="Clock">最近播放</el-button>
  <el-button round class="left-nav-button" icon="Search">我的播客</el-button>
  <el-button round class="left-nav-button" icon="StarFilled">我的收藏</el-button>
  <el-button round class="left-nav-button" icon="Download">下载管理</el-button>
  <el-button round class="left-nav-button" icon="Search">本地音乐</el-button>
  <el-button round class="left-nav-button" icon="UploadFilled">我的音乐云盘</el-button> -->
</template>

<style scoped>
/* 
自定义按钮样式、动态组件
https://www.cnblogs.com/dengzhaowei/p/15698878.html 
https://cn.vuejs.org/guide/essentials/component-basics.html#dynamic-components
*/
.left-nav-button {
  /* 高不用设置，让字体大小自然撑开 */
  /* height: 40px; */
  width: 150px;
  margin-bottom: 10px;
  margin-left: 10px;
  border-radius: 25px;
  font-size: 15px;
  border: transparent;
  overflow: hidden;

  background-color: #f0f3f6;
  color: black;
  text-align: left;

  /* 鼠标悬浮 */
  /* &:hover{
    background: linear-gradient(139deg, #dd2e9b 0%, #f47039 99%);
    color: white;
  } */

  /* 点击 */
  /* &:focus{
    background: #fc3d49;
    color: white;
  } */
}

/* 鼠标悬浮 */
.left-nav-button:hover {
  background: #e4e7ec;
  color: black;
}

/* 点击-激活 */
.left-nav-button.active {
  background: #fc3d49;
  color: white;
}
</style>