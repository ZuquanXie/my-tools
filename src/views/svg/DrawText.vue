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

const textAnchorOptions = [
  { label: "start", value: "start" },
  { label: "end", value: "end" },
  { label: "middle", value: "middle" },
  { label: "inherit", value: "inherit" },
];

const lengthAdjustOptions = [
  { label: "spacing", value: "spacing" },
  { label: "spacingAndGlyphs", value: "spacingAndGlyphs" },
];

const text = ref<string>("测试文本");
const textPositionX = ref(24);
const textPositionY = ref(24);
const fontSize = ref<string>("14");
const fontFamily = ref<string>();
const textAnchor = ref<string>();
const hOffset = ref<string>();
const vOffset = ref<string>();
const textLength = ref<string>();
const textLengthAdjust = ref<string>();

function clear() {
  const svg = document.getElementById("mySvg");
  if (svg) svg.innerHTML = "";
}

function draw() {
  const svg = document.getElementById("mySvg") as unknown as SVGElement;
  clear();
  drawText(svg);
  drawHelper(svg);
}

function drawHelper(el: SVGElement) {
  const hLine = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  const vLine = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  hLine.setAttribute("x", "0");
  hLine.setAttribute("y", `${textPositionY.value}`);
  hLine.setAttribute("width", `${el.clientWidth}`);
  hLine.setAttribute("height", "1");
  hLine.setAttribute("fill", "green");
  vLine.setAttribute("x", `${textPositionX.value}`);
  vLine.setAttribute("y", "0");
  vLine.setAttribute("width", "1");
  vLine.setAttribute("height", `${el.clientHeight}`);
  vLine.setAttribute("fill", "green");
  el.appendChild(hLine);
  el.appendChild(vLine);
}

function drawText(el: SVGElement) {
  const textEle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  textEle.setAttribute("x", `${textPositionX.value}`);
  textEle.setAttribute("y", `${textPositionY.value}`);
  if (hOffset.value) textEle.setAttribute("dx", hOffset.value);
  if (vOffset.value) textEle.setAttribute("dy", vOffset.value);
  textEle.setAttribute("font-size", fontSize.value);
  if (fontFamily.value) textEle.setAttribute("font-family", fontFamily.value);
  textEle.setAttribute("fill", "orange");
  if (textAnchor.value) textEle.setAttribute("text-anchor", textAnchor.value);
  if (textLength.value) textEle.setAttribute("textLength", textLength.value);
  if (textLengthAdjust.value)
    textEle.setAttribute("lengthAdjust", textLengthAdjust.value);
  textEle.innerHTML = text.value;
  el.appendChild(textEle);
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
        <el-select v-model="textAnchor" placeholder="对齐">
          <el-option
            v-for="item in textAnchorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="hOffset" clearable placeholder="水平偏移"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="vOffset" clearable placeholder="垂直偏移"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="textLength"
          clearable
          placeholder="文本宽度"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="textLengthAdjust" placeholder="宽度适应">
          <el-option
            v-for="item in lengthAdjustOptions"
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
    <svg
      id="mySvg"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="300"
      height="300"
    ></svg>
  </div>
</template>
