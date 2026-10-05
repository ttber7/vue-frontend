<template>
  <div class="border p-4 rounded bg-white shadow-sm col-md-8 col-lg-5 mx-auto">
    <h3 class="fw-bold mb-3 text-dark">Đăng Nhập</h3>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username" class="form-label text-secondary small">Tên đăng nhập:</label>
        <input 
          v-model="username" 
          type="text" 
          class="form-control" 
          id="username" 
          placeholder="Nhập tên đăng nhập" 
          required 
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label text-secondary small">Mật khẩu:</label>
        <input 
          v-model="password" 
          type="password" 
          class="form-control" 
          id="password" 
          placeholder="Nhập mật khẩu" 
          required 
        />
      </div>

      <button type="submit" class="btn btn-primary px-4">Đăng nhập</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('Bình An');
const password = ref('123456');

const emit = defineEmits(['loggedIn']);

function handleLogin() {
  if (username.value && password.value) {
    emit('loggedIn', username.value);
  }
}
</script>

<style scoped>
</style>
