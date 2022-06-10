<script setup lang="ts" name="Movement">
import { onMounted, ref, watch } from "vue";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;

const origin = ref({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 });
const refCanvas = ref<HTMLCanvasElement>();

const mainCanvas = document.createElement("canvas");
const mainCtx = mainCanvas.getContext("2d")!;

const trackCanvas = document.createElement("canvas");
const trackCtx = trackCanvas.getContext("2d")!;

const ballCanvas = document.createElement("canvas");
const ballCtx = ballCanvas.getContext("2d")!;

const pause = ref(false);

const tracks: number[] = [];
const balls = [
  {
    radius: 8,
    x: 0,
    y: 0,
    track: 130,
    start: Math.PI,
    revolution: 100000,
    born: 0,
  },
  { radius: 6, x: 0, y: 0, track: 60, start: 0, revolution: 30000, born: 0 },
  {
    radius: 4,
    x: 0,
    y: 0,
    track: 110,
    start: 1.5 * Math.PI,
    revolution: 200000,
    born: 0,
  },
];

function draw() {
  const ctx = refCanvas.value!.getContext("2d")!;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(mainCanvas, 0, 0);
}

function drawMain() {
  mainCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  mainCtx.drawImage(trackCanvas, 0, 0);
  mainCtx.drawImage(ballCanvas, 0, 0);
}

function drawTrack() {
  const ctx = trackCtx;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.save();
  ctx.strokeStyle = "#eee";
  ctx.translate(origin.value.x, origin.value.y);
  tracks.forEach(radius => {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function drawBall() {
  const ctx = ballCtx;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.save();
  ctx.fillStyle = "#999";
  ctx.translate(origin.value.x, origin.value.y);
  balls.forEach(ball => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function updateBallsPosition() {
  const timestamp = new Date().getTime();
  balls.forEach(ball => {
    const angle =
      (((timestamp - ball.born) % ball.revolution) / ball.revolution) *
      2 *
      Math.PI;
    ball.x = ball.track * Math.cos(angle);
    ball.y = ball.track * Math.sin(angle);
  });
}

function init() {
  const timestamp = new Date().getTime();
  const animate = () => {
    window.requestAnimationFrame(animate);
    if (!pause.value) {
      updateBallsPosition();
      drawBall();
      drawMain();
      draw();
    }
  };
  mainCanvas.width = trackCanvas.width = ballCanvas.width = CANVAS_WIDTH;
  mainCanvas.height = trackCanvas.height = ballCanvas.height = CANVAS_HEIGHT;

  balls.forEach(ball => {
    ball.x = ball.track * Math.cos(ball.start);
    ball.y = ball.track * Math.sin(ball.start);
    ball.born = timestamp;
    if (!tracks.includes(ball.track)) {
      tracks.push(ball.track);
    }
  });

  drawTrack();
  animate();
}

onMounted(() => {
  init();
});
</script>

<template>
  <div>
    <el-form inline>
      <el-form-item label="暂停">
        <el-switch v-model="pause"></el-switch>
      </el-form-item>
    </el-form>
    <canvas
      ref="refCanvas"
      style="border: 1px solid #ddd"
      :width="CANVAS_WIDTH"
      :height="CANVAS_HEIGHT"
    ></canvas>
  </div>
</template>
