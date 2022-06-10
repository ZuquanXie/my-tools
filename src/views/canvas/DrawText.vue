<script setup lang="ts" name="DrawText">
import { ref } from "vue";

const fontFamilyOptions = [
  { label: "宋体", value: "SimSun" },
  { label: "黑体", value: "SimHei" },
  { label: "楷体", value: "KaiTi" },
  { label: "新宋体", value: "NSimSun" },
  { label: "仿宋", value: "FangSong" },
  { label: "微软雅黑", value: "Microsoft Yahei" },
];

const textAlignOptions = [
  { label: "start", value: "start" },
  { label: "end", value: "end" },
  { label: "left", value: "left" },
  { label: "right", value: "right" },
  { label: "center", value: "center" },
];

const textBaselineOptions = [
  { label: "top", value: "top" },
  { label: "hanging", value: "hanging" },
  { label: "middle", value: "middle" },
  { label: "alphabetic", value: "alphabetic" },
  { label: "ideographic", value: "ideographic" },
  { label: "bottom", value: "bottom" },
];

const textDirectionOptions = [
  { label: "ltr", value: "ltr" },
  { label: "rtl", value: "rtl" },
  { label: "inherit", value: "inherit" },
];

const refCanvas = ref<HTMLCanvasElement>();

const text = ref<string>("测试文本");
const textPositionX = ref(24);
const textPositionY = ref(24);
const fontSize = ref<string>("14");
const fontFamily = ref<string>();
const textAlign = ref<CanvasTextAlign | undefined>();
const textBaseline = ref<CanvasTextBaseline | undefined>();
const textDirection = ref<CanvasDirection | undefined>();

function draw() {
  clear();
  const ctx = refCanvas.value!.getContext("2d")!;
  drawText(ctx);
  drawHelper(ctx);
}

function drawHelper(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.strokeStyle = "green";
  ctx.fillStyle = "green";
  ctx.fillRect(textPositionX.value, textPositionY.value, 1, 1);
  ctx.beginPath();
  ctx.moveTo(textPositionX.value, textPositionY.value);
  ctx.lineTo(refCanvas.value?.width || 0, textPositionY.value);
  ctx.moveTo(textPositionX.value, textPositionY.value);
  ctx.lineTo(textPositionX.value, refCanvas.value?.height || 0);
  ctx.stroke();
  ctx.restore();
}

function drawText(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.fillStyle = "orange";
  ctx.font = `${fontSize.value || 12}px ${fontFamily.value || "serif"}`;
  if (textAlign.value) {
    ctx.textAlign = textAlign.value;
  }
  if (textBaseline.value) {
    ctx.textBaseline = textBaseline.value;
  }
  if (textDirection.value) {
    ctx.direction = textDirection.value;
  }
  ctx.fillText(text.value || "", textPositionX.value, textPositionY.value);
  ctx.restore();
}

function clear() {
  refCanvas.value!.width = 0;
  refCanvas.value!.width = 150;
}
</script>

<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="text" placeholder="文本"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input-number
          v-model="textPositionX"
          placeholder="X"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input-number
          v-model="textPositionY"
          placeholder="Y"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input v-model="fontSize" placeholder="字号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="fontFamily" placeholder="字体">
          <el-option
            v-for="item in fontFamilyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="textAlign" placeholder="对齐">
          <el-option
            v-for="item in textAlignOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="textBaseline" placeholder="基线">
          <el-option
            v-for="item in textBaselineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="textDirection" placeholder="文字方向">
          <el-option
            v-for="item in textDirectionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="draw">绘制</el-button>
      </el-form-item>
    </el-form>
    <canvas
      ref="refCanvas"
      width="150"
      height="150"
      style="border: 1px solid #aaa"
    ></canvas>
  </div>
</template>
