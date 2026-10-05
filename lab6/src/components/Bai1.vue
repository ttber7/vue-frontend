<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3 text-primary">Bài 1: Xếp loại học sinh</h3>
    
    <div class="border p-4 rounded bg-white col-md-6 col-lg-5">
      <h4 class="fw-bold mb-3 fs-5">Nhập điểm của bạn:</h4>
      
      <div class="mb-3">
        <input 
          v-model.number="score" 
          type="number" 
          step="0.1" 
          min="0" 
          max="10" 
          class="form-control" 
          placeholder="Nhập điểm (0 - 10)" 
        />
      </div>

      <div class="mt-2">
        <span v-if="score === null || score === ''" class="text-muted">
          Vui lòng nhập điểm để xem xếp loại.
        </span>
        <span v-else-if="score < 0 || score > 10" class="text-danger fw-bold">
          Điểm không hợp lệ! Vui lòng nhập từ 0 đến 10.
        </span>
        <span v-else-if="score < 5.0" class="text-danger fw-bold fs-5">
          Yếu
        </span>
        <span v-else-if="score < 6.5" class="text-warning fw-bold fs-5">
          Trung bình
        </span>
        <span v-else-if="score < 8.0" class="text-primary fw-bold fs-5">
          Khá
        </span>
        <span v-else-if="score < 9.0" class="text-info fw-bold fs-5">
          Giỏi
        </span>
        <span v-else class="text-success fw-bold fs-5">
          Xuất sắc
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const score = ref(9);
</script>

<style scoped>
</style>
