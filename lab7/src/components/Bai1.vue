<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3 text-primary">Bài 1: Tạo ứng dụng quản lý công việc</h3>
    
    <div class="col-md-6 col-lg-5">
      <div class="border p-4 rounded bg-white shadow-sm">
        <h4 class="text-center fw-bold mb-3">Quản lý công việc</h4>
        
        <!-- Form thêm công việc -->
        <form @submit.prevent="addList">
          <div class="mb-3">
            <label class="form-label text-secondary small">Tên công việc:</label>
            <input 
              v-model="newTodo" 
              type="text" 
              class="form-control" 
              placeholder="Nhập tên công việc" 
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Thêm công việc</button>
        </form>

        <!-- Danh sách công việc -->
        <ul class="list-group mt-4">
          <li 
            v-for="(job, index) in jobs" 
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{{ job }}</span>
            <button class="btn btn-danger btn-sm" @click="removeList(index)">Xóa</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newTodo = ref('');
const jobs = ref(['Ăn sáng', 'Đi học', 'Chơi bóng rổ']);

const addList = () => {
  if (newTodo.value.trim()) {
    jobs.value.push(newTodo.value.trim());
    newTodo.value = '';
  }
};

const removeList = (index) => {
  jobs.value.splice(index, 1);
};
</script>

<style scoped>
</style>
