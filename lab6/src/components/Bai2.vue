<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3 text-primary">Bài 2: Nhập tháng và in ra mùa tương ứng</h3>
    
    <div class="border p-4 rounded bg-white col-md-6 col-lg-5">
      <h4 class="fw-bold mb-3 fs-5">Nhập tháng của bạn:</h4>
      
      <div class="mb-3">
        <input 
          v-model.number="month" 
          type="number" 
          class="form-control" 
          placeholder="Nhập tháng (1 - 12)" 
        />
      </div>

      <div class="mt-2 fs-5 fw-bold">
        <p v-if="month < 1 || month > 12" style="color: red;" class="mb-0">
          Vui lòng nhập tháng từ 1 đến 12!
        </p>
        <p v-else-if="month >= 1 && month <= 3" class="text-success mb-0">
          Mùa Xuân
        </p>
        <p v-else-if="month <= 6" class="text-danger mb-0">
          Mùa Hè
        </p>
        <p v-else-if="month <= 9" class="text-warning mb-0">
          Mùa Thu
        </p>
        <p v-else class="text-info mb-0">
          Mùa Đông
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const month = ref(1);
</script>

<style scoped>
</style>
