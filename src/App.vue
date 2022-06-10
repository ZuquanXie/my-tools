<script setup lang="ts">
import { menus } from "@/views/menus";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <el-container id="appMain">
    <el-aside>
      <el-scrollbar>
        <el-menu router :default-active="route.fullPath">
          <el-menu-item
            v-for="menu in menus"
            :key="menu.index"
            :index="menu.index"
          >
            <el-icon>
              <component :is="menu.icon"></component>
            </el-icon>
            <span>{{ menu.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-main>
        <el-scrollbar>
          <router-view v-slot="{ Component }">
            <keep-alive :include="['AnotherComponent']">
              <component :is="Component"></component>
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
html,
body,
#app,
#appMain {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
