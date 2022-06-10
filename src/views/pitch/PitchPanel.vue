<script setup lang="ts" name="PitchPanel">
import { ref, onMounted } from "vue";

const refContainer = ref<HTMLDivElement>();
const data = ref<[boolean, boolean][][]>([]);

function onPitchClick(event: MouseEvent) {
  const dataKey = (event.target as HTMLDivElement).getAttribute("data-key");
  if (dataKey !== undefined) {
    const index = dataKey!.split(",").map(_ => parseInt(_));
    const newValue = !data.value[index[0]][index[1]][index[2]];
    if (newValue) {
      for (let i = 0, l = data.value.length; i < l; i += 1) {
        if (i === index[0]) {
          data.value[i][index[1]][index[2]] = newValue;
        } else {
          data.value[i][index[1]][index[2]] = false;
        }
      }
    }
  }
}

{
  data.value = [];
  for (let i = 0; i < 24; i += 1) {
    const row: [boolean, boolean][] = [];
    for (let j = 0; j < 36; j += 1) {
      row.push([false, false]);
    }
    data.value.push(row);
  }
}

function onReset() {
  data.value.forEach(row => {
    row.forEach(col => {
      col[0] = false;
      col[1] = false;
    });
  });
}

onMounted(() => {
  refContainer.value?.addEventListener("click", onPitchClick, false);
});
</script>

<template>
  <div>
    <el-row>
      <el-col>
        <el-button @click="onReset">重置</el-button>
      </el-col>
    </el-row>
    <div ref="refContainer" class="pitch-panel">
      <div v-for="(row, i) in data" :key="i" class="pitch-row">
        <div v-for="(col, j) in row" :key="j" class="pitch-col">
          <div
            class="top"
            :class="{ active: col[0] }"
            :data-key="`${i},${j},0`"
          ></div>
          <div
            class="bottom"
            :class="{ active: col[1] }"
            :data-key="`${i},${j},1`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.pitch-panel {
  margin-top: 12px;
}
.pitch-row {
  display: flex;
  margin-top: 4px;
}
.pitch-col {
  width: 20px;
  height: 20px;
  margin-right: 4px;
  border: 1px solid #ddd;
  .top,
  .bottom {
    height: 9px;
    &.active,
    &:hover {
      background-color: green;
    }
  }
  .bottom {
    margin-top: 2px;
  }
}
</style>
