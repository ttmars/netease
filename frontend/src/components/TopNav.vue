<template>
  <div style="width: 100%; height: 100%;">
    <div style="display: flex; height: 100%;">
      <div style="display: flex; flex: 1; height: 100%; align-items: center;">
        <el-button style="margin-right: 5px; margin-left: 30px; width: 1px;" icon="ArrowLeft" />
        <el-input v-model="input" @keyup.enter="submit" style="margin-right: 5px;width: 250px; height: 32px;"
          :placeholder="placeholder" prefix-icon="Search" />
        <!-- <el-button @click="submit" style="margin-right: 60px;" icon="Microphone" /> -->
        <el-button @click="submit" style="margin-right: 60px;" :loading="submiting">搜索</el-button>
        <!-- <el-button @click="submitDebug" style="margin-right: 60px;" :loading="submiting">debug</el-button> -->
      </div>

      <div style="display: flex; flex: 1; justify-content: end; align-items: center;">
        <el-button style="border: none;" circle icon="Tools" />
        <el-button style="border: none;" circle icon="Message" />
        <el-button style="border: none;" circle>
          <template #icon>
            <img src="../assets/theme.svg" alt="" width="15" height="15">
          </template>
        </el-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { player } from './store.js'
import ContentSearch from './ContentSearch.vue'
import { currentTab } from './store.js'
import { search } from './request.js'

// 搜索值
const input = ref('')
const placeholder = ref('起风了')
const submiting = ref(false)

const submit = async () => {
  try {
    submiting.value = true;
    const resp = await search({ keywords: input.value })
    submiting.value = false;

    placeholder.value = input.value;
    player.value.searchValue = input.value;
    input.value = '';

    player.value.musicList = resp.data.result.songs;
    // 格式化时间
    player.value.musicList.forEach(item => {
      const totalSeconds = Math.floor(item.duration / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      item.duration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    });
    currentTab.value = ContentSearch;
  } catch (error) {
    // 异常处理
    console.error(error);
  }
}

</script>

<style></style>