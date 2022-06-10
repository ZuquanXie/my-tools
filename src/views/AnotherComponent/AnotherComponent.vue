<script setup lang="ts" name="AnotherComponent">
import { ref } from "vue";

const value = ref<string>();
</script>

<template>
    <el-form>
        <el-form-item>
            <el-input v-model="value"></el-input>
        </el-form-item>
    </el-form>
</template>
