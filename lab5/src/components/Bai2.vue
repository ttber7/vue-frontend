<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3">Bài 2: Two-way Data Binding với v-model</h3>
    <div class="mb-3 col-md-6">
      <label class="form-label text-secondary">Nhập dữ liệu:</label>
      <input v-model="userInput" class="form-control" placeholder="Nhập dữ liệu vào đây" />
    </div>
    <div class="alert alert-info py-2 px-3 d-inline-block mb-0">
      <strong>Giá trị bạn nhập:</strong> {{ userInput }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userInput = ref('FPL');
</script>

<style scoped>
</style>
