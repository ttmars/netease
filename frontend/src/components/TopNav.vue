<template>
  <div style="width: 100%; height: 100%;">
    <div style="display: flex; height: 100%;">
      <div style="display: flex; flex: 1; height: 100%; align-items: center;">
        <el-button style="margin-right: 5px; margin-left: 30px; width: 1px;" icon="ArrowLeft" />
        <el-input v-model="input" @keyup.enter="submit" style="margin-right: 5px;width: 250px; height: 32px;"
          :placeholder="player.searchValue" prefix-icon="Search" />
        <!-- <el-button @click="submit" style="margin-right: 60px;" icon="Microphone" /> -->
        <el-button @click="submit" style="margin-right: 60px;" :loading="player.submiting">搜索</el-button>
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
import { setMusicList, setSongList, setMVList } from './utils.js'

// 搜索值
const input = ref('')

const submit = async () => {
  if (input.value == '' && player.value.searchValue == '') {
    return;
  } else if (input.value == '' && player.value.searchValue != '') {
    input.value = player.value.searchValue;
  }

  player.value.searchValue = input.value;
  input.value = '';

  player.value.index = -1;
  player.value.songIndex = -1;
  if (player.value.searchType == '0') {
    setMusicList();
  } else if (player.value.searchType == '1') {
    setSongList();
  } else if (player.value.searchType == '2') {
    setMVList();
  }
}

</script>

<style></style>