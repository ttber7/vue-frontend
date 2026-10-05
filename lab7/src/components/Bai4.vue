<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-4 text-primary">Bài 4: Ứng dụng bình luận bài viết (Giao tiếp Props & Emit)</h3>

    <!-- Nếu người dùng chưa đăng nhập, hiển thị form đăng nhập -->
    <LoginComponent v-if="!isLoggedIn" @loggedIn="handleLoginSuccess" />

    <!-- Nếu người dùng đã đăng nhập, hiển thị component bình luận -->
    <div v-else>
      <div class="text-end mb-3 col-md-10 col-lg-8 mx-auto">
        <button class="btn btn-outline-danger btn-sm" @click="handleLogout">
          Đăng xuất tài khoản
        </button>
      </div>
      <CommentComponent :username="loggedInUser" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue';
import CommentComponent from './CommentComponent.vue';

// Quản lý trạng thái đăng nhập và tên người dùng đã đăng nhập
const isLoggedIn = ref(false);
const loggedInUser = ref('');

// Xử lý khi người dùng đăng nhập thành công
function handleLoginSuccess(username) {
  loggedInUser.value = username;
  isLoggedIn.value = true;
}

function handleLogout() {
  isLoggedIn.value = false;
  loggedInUser.value = '';
}
</script>

<style scoped>
</style>
