<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3">Bài 3: Nhập và hiển thị thông tin cá nhân</h3>
    <div class="row">
      <div class="col-md-8 col-lg-6">
        <h4 class="text-primary mb-3">Thông tin cá nhân</h4>
        <form @submit.prevent>
          <div class="mb-3">
            <label class="form-label">Họ và Tên:</label>
            <input v-model="userInfo.name" type="text" class="form-control" placeholder="Nhập họ và tên" />
          </div>
          <div class="mb-3">
            <label class="form-label">Tuổi:</label>
            <input v-model="userInfo.age" type="number" class="form-control" placeholder="Nhập tuổi" />
          </div>
          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input v-model="userInfo.email" type="email" class="form-control" placeholder="Nhập email" />
          </div>
        </form>

        <!-- Hiển thị thông tin ngay sau khi nhập -->
        <div class="info-display mt-4 p-3 bg-dark text-white rounded shadow-sm">
          <h4 class="border-bottom pb-2 mb-3">Thông tin đã nhập:</h4>
          <p class="mb-2"><strong>Họ và Tên:</strong> {{ userInfo.name || '(Chưa nhập)' }}</p>
          <p class="mb-2"><strong>Tuổi:</strong> {{ userInfo.age !== null ? userInfo.age : '(Chưa nhập)' }}</p>
          <p class="mb-0"><strong>Email:</strong> {{ userInfo.email || '(Chưa nhập)' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// Khởi tạo đối tượng thông tin người dùng sử dụng reactive để tạo reactivity
const userInfo = reactive({
  name: 'Nguyen Van A',
  age: 18,
  email: 'anv@example.com'
});
</script>

<style scoped>
</style>
