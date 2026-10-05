<template>
  <div class="login-container py-5">
    <div class="col-md-6 col-lg-4 mx-auto">
      <div class="card p-4 shadow-sm border-0">
        <h3 class="fw-bold mb-3 text-center text-primary">Đăng Nhập</h3>
        <p class="text-secondary small text-center mb-4">
          Đăng nhập để truy cập vào Route được bảo vệ: <code>/dashboard</code>
        </p>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label text-secondary small">Email hoặc Tên đăng nhập</label>
            <input 
              v-model="username" 
              type="text" 
              class="form-control" 
              placeholder="Nhập email hoặc username" 
              required 
            />
          </div>

          <div class="mb-3">
            <label class="form-label text-secondary small">Mật khẩu</label>
            <input 
              v-model="password" 
              type="password" 
              class="form-control" 
              placeholder="Nhập mật khẩu" 
              required 
            />
          </div>

          <button type="submit" class="btn btn-primary w-100 py-2 fw-semibold">
            Đăng nhập
          </button>
        </form>

        <div class="mt-4 p-3 bg-light rounded text-muted small">
          <strong>Lưu ý giả lập:</strong> Bạn chỉ cần nhập thông tin bất kỳ và nhấn <em>Đăng nhập</em>, hệ thống sẽ xác thực thành công và tự động chuyển hướng đến <strong>Dashboard</strong>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../router';

const router = useRouter();
const username = ref('teonv@gmail.com');
const password = ref('123456');

function handleLogin() {
  if (username.value && password.value) {
    // Cập nhật trạng thái xác thực
    auth.isAuthenticated = true;
    auth.user = username.value;

    // Chuyển hướng người dùng đến Dashboard
    router.push({ name: 'Dashboard' });
  }
}
</script>

<style scoped>
</style>
