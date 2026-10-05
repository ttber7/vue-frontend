<template>
  <div class="home-container py-4">
    <!-- Banner chào mừng -->
    <div class="p-5 mb-4 bg-primary text-white rounded-3 shadow-sm">
      <div class="container-fluid py-3">
        <h1 class="display-5 fw-bold">Chào mừng bạn đến với MyBlog!</h1>
        <p class="col-md-9 fs-5">
          Nền tảng chia sẻ kiến thức, lập trình Vue.js và các bài viết công nghệ hấp dẫn. Ứng dụng thực hành đầy đủ các tính năng nâng cao của Vue Router.
        </p>
        <div class="d-flex gap-3 mt-4">
          <!-- Điều hướng bằng router-link -->
          <router-link to="/blog" class="btn btn-light btn-lg fw-bold text-primary">
            Khám phá Blog
          </router-link>
          <!-- Điều hướng lập trình bằng router.push -->
          <button @click="goToProfile" class="btn btn-outline-light btn-lg">
            Trang cá nhân (router.push)
          </button>
        </div>
      </div>
    </div>

    <!-- Giới thiệu các tính năng của Lab 8 -->
    <div class="row g-4 mt-2">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 p-3">
          <div class="card-body">
            <h5 class="card-title fw-bold text-primary">1. Routes lồng nhau (Nested)</h5>
            <p class="card-text text-secondary small">
              Trang hồ sơ người dùng <code>/profile</code> gồm 2 route con: <code>/profile/info</code> và <code>/profile/settings</code>, đồng thời hỗ trợ alias <code>/me</code>.
            </p>
            <router-link to="/profile/info" class="btn btn-outline-primary btn-sm">Xem Profile</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 p-3">
          <div class="card-body">
            <h5 class="card-title fw-bold text-success">2. Routes động (Dynamic)</h5>
            <p class="card-text text-secondary small">
              Xem chi tiết bài viết với tham số động <code>/blog/:id</code>, trích xuất chính xác ID bài viết từ URL để hiển thị nội dung.
            </p>
            <router-link to="/blog" class="btn btn-outline-success btn-sm">Danh sách Blog</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card h-100 shadow-sm border-0 p-3">
          <div class="card-body">
            <h5 class="card-title fw-bold text-danger">3. Bảo vệ Routes (Guard)</h5>
            <p class="card-text text-secondary small">
              Route <code>/dashboard</code> được bảo vệ nghiêm ngặt bằng Navigation Guard. Nếu chưa đăng nhập, hệ thống tự động chuyển hướng về <code>/login</code>.
            </p>
            <button @click="goToDashboard" class="btn btn-outline-danger btn-sm">Vào Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// Điều hướng lập trình bằng router.push()
function goToProfile() {
  router.push({ name: 'UserProfile' });
}

function goToDashboard() {
  router.push({ name: 'Dashboard' });
}
</script>

<style scoped>
</style>
