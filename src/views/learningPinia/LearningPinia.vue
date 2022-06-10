<script setup lang="ts" name="LearningPinia">
import { onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "@/store/learningPinia";
const texts = [
  "Define State",
  "Mutating State",
  "Replace State",
  "Getters",
  "Actions",
];
const store = useStore();

const unsubscribe = store.$onAction(({ name, store, args, after, onError }) => {
  after(() => {
    if (name === "learnPart") {
      ElMessage.success(`Finished the learning of ${texts[args[0]]}`);
    }
  });
});

function onButtonClick(index: number) {
  store.learnPart(index);
}

onBeforeUnmount(() => {
  unsubscribe();
});
</script>

<template>
  <div>
    <h4>{{ store.title }}</h4>
    <h6>当前进度</h6>
    <el-progress :percentage="store.progress"></el-progress>
    <el-row style="margin-top: 24px">
      <el-col>
        <el-button
          v-for="(text, index) in texts"
          :key="index"
          :disabled="store.statusList[index]"
          :loading="store.loadingList[index]"
          @click="onButtonClick(index)"
          >{{ text }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
