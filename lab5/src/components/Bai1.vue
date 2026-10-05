<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3">Bài 1: Làm quen cơ bản với sự kiện và binding động</h3>
    <p class="fs-5 text-primary fw-medium mb-3">{{ message }}</p>
    <div>
      <button class="btn btn-dark px-4" @click="updateMessage">Thay đổi thông điệp</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Thông điệp ban đầu');

const updateMessage = () => {
  message.value = 'Thông điệp đã được thay đổi!';
};
</script>

<style scoped>
</style>
