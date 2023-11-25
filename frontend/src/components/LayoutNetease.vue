<script setup>
import TopNav from './TopNav.vue'
import LeftNav from './LeftNav.vue'
import Player from './Player.vue'
import { onMounted } from 'vue'
import { currentTab } from './store.js'
import ContentSearch from './ContentSearch.vue'

onMounted(() => {
    currentTab.value = ContentSearch;         // 页面加载显示指定内容
})

</script>

<template>
    <div style="height: 100vh; display: flex;">
        <div style="width: 0px; background-color: cornflowerblue; overflow: auto;">
            <p>左侧留白</p>
        </div>


        <div style="display: flex; flex-direction: column; width: 100%;">
            <div style="display: flex; flex: 1; overflow:auto;">
                <div style="width: 200px; background-color: #f0f3f6;">
                    <!-- 左侧导航 -->
                    <LeftNav />
                </div>
                <div style="display: flex; flex-direction: column; width: 100%;">
                    <div style="height: 50px;">
                        <!-- 顶部导航 -->
                        <TopNav />
                    </div>
                    <div style="overflow: auto; height: 100%;">
                        <!-- 内容 -->
                        <KeepAlive>
                            <component :is="currentTab"></component>
                        </KeepAlive>
                    </div>
                </div>
            </div>
            <div style="height: 100px; width: 100%;">
                <!-- 底部播放器 -->
                <Player />
            </div>
        </div>


        <div style="width: 0px; background-color: rgb(237, 194, 100); overflow: auto;">
            <p>右侧留白</p>
        </div>
    </div>
</template>
  
<style scoped></style>
  