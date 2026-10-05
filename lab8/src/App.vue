<template>
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Navbar điều hướng chính của MyBlog -->
    <header class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold text-info">
          MyBlog <span class="badge bg-secondary fs-7 fw-normal">Lab 8</span>
        </router-link>

        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarMyBlog" 
          aria-controls="navbarMyBlog" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarMyBlog">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active text-info">
                Trang chủ
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/blog" class="nav-link" active-class="active text-info">
                Danh sách Blog
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link" active-class="active text-info">
                Hồ sơ (/profile)
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/me" class="nav-link" active-class="active text-info">
                Alias (/me)
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link text-warning" active-class="active fw-bold">
                Dashboard (Bảo vệ)
              </router-link>
            </li>
          </ul>

          <!-- Trạng thái đăng nhập ở góc phải -->
          <div class="d-flex align-items-center gap-2">
            <template v-if="auth.isAuthenticated">
              <span class="text-white small">
                Hi, <strong>{{ auth.user }}</strong>
              </span>
              <button @click="logout" class="btn btn-outline-danger btn-sm">
                Đăng xuất
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-primary btn-sm px-3">
                Đăng nhập
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </header>

    <!-- Main View hiển thị theo Route -->
    <main class="container py-4 flex-grow-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <small>&copy; Copyright by FPT Polytechnic - Lab 8: Vue Router 4 (Nested, Dynamic, Guards & Alias)</small>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { auth } from './router';

const router = useRouter();

function logout() {
  auth.isAuthenticated = false;
  auth.user = null;
  router.push({ name: 'Home' });
}
</script>

<style scoped>
</style>
