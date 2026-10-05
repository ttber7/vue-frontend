<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3 text-primary">Bài 2: Form đăng nhập gồm email và mật khẩu</h3>

    <div class="col-md-6 col-lg-5">
      <!-- Khi chưa đăng nhập -->
      <div v-if="!isLoggedIn" class="border p-4 rounded bg-white shadow-sm">
        <h4 class="fw-bold mb-3">Form Đăng nhập</h4>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label text-secondary small">Email:</label>
            <input 
              v-model="email" 
              type="text" 
              class="form-control" 
              placeholder="Nhập email" 
            />
            <p v-if="emailError" class="text-danger small mt-1 mb-0">{{ emailError }}</p>
          </div>

          <div class="mb-3">
            <label class="form-label text-secondary small">Mật khẩu:</label>
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              placeholder="Nhập mật khẩu" 
            />
            <p v-if="passwordError" class="text-danger small mt-1 mb-0">{{ passwordError }}</p>
          </div>

          <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
        </form>
      </div>

      <!-- Khi đã đăng nhập thành công -->
      <div v-else class="border p-4 rounded bg-white shadow-sm text-center">
        <div class="alert alert-success mb-3">
          <h4 class="alert-heading fw-bold mb-1">Chào mừng, {{ email }}!</h4>
          <p class="small text-muted mb-0">Bạn đã đăng nhập thành công vào hệ thống.</p>
        </div>
        <button class="btn btn-primary px-4" @click="logout">Đăng xuất</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const login = () => {
  // Reset thông điệp lỗi
  emailError.value = '';
  passwordError.value = '';

  // Validate email
  if (!email.value) {
    emailError.value = 'Email là bắt buộc.';
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Vui lòng nhập email hợp lệ.';
  }

  // Validate mật khẩu
  if (!password.value) {
    passwordError.value = 'Mật khẩu là bắt buộc.';
  }

  // Nếu không có lỗi, xử lý login
  if (!emailError.value && !passwordError.value) {
    isLoggedIn.value = true;
  }
};

const logout = () => {
  isLoggedIn.value = false;
  email.value = '';
  password.value = '';
  emailError.value = '';
  passwordError.value = '';
};
</script>

<style scoped>
</style>
