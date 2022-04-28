<script setup lang="ts" name="Transformer">
import { ElMessage } from "element-plus";
import { ref } from "vue";
const source = ref<string>();
const result = ref<string>();

function onGetType() {
  const jsonString = source.value;
  const types: string[] = [];
  let parsedObj: Record<string, unknown>;
  if (!jsonString) {
    return;
  }
  try {
    parsedObj = JSON.parse(jsonString);
    Object.keys(parsedObj).forEach(key => {
      let value = parsedObj[key] ?? null;
      types.push(
        `${key}${value === null ? "?" : ""}: ${
          value === null ? "unknown" : typeof value
        };`
      );
    });
    result.value = `{\r\n  ${types.join("\r\n  ")}\r\n}`;
  } catch (err) {
    ElMessage.error("错误的格式");
    return;
  }
}
</script>

<template>
  <div>
    <el-row>
      <el-col>
        <el-row>
          <el-col>
            <el-button @click="onGetType">GetType</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col style="margin-top: 24px">
        <el-input v-model="source" type="textarea" :rows="10"></el-input>
      </el-col>
      <el-col style="margin-top: 24px">
        <el-input type="textarea" :rows="10" :model-value="result"></el-input>
      </el-col>
    </el-row>
  </div>
</template>
