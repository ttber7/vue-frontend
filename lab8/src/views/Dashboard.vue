<template>
  <div class="dashboard-container py-4">
    <div class="col-lg-10 mx-auto">
      <!-- Header Dashboard -->
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 class="fw-bold mb-1 text-dark">Bảng điều khiển quản trị (Dashboard)</h2>
          <p class="text-secondary small mb-0">
            Route được bảo vệ thành công bởi Navigation Guard (<code>beforeEach</code>).
          </p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-success py-2 px-3">
            Đã xác thực: <strong>{{ auth.user || 'Admin' }}</strong>
          </span>
          <button @click="handleLogout" class="btn btn-danger btn-sm">
            Đăng xuất
          </button>
        </div>
      </div>

      <!-- Thống kê mẫu -->
      <div class="row g-4 mb-4">
        <div class="col-md-4">
          <div class="card p-3 shadow-sm border-0 border-start border-4 border-primary">
            <h6 class="text-muted small mb-1">Tổng số bài viết</h6>
            <h3 class="fw-bold mb-0 text-primary">12</h3>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 shadow-sm border-0 border-start border-4 border-success">
            <h6 class="text-muted small mb-1">Lượt xem bài viết</h6>
            <h3 class="fw-bold mb-0 text-success">3,450</h3>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card p-3 shadow-sm border-0 border-start border-4 border-info">
            <h6 class="text-muted small mb-1">Người dùng đã đăng ký</h6>
            <h3 class="fw-bold mb-0 text-info">158</h3>
          </div>
        </div>
      </div>

      <!-- Hoạt động gần đây -->
      <div class="card p-4 shadow-sm border-0">
        <h5 class="fw-bold mb-3 text-secondary">Hoạt động quản trị</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item px-0 d-flex justify-content-between">
            <span>Đã duyệt bài viết mới "Khám phá các tính năng mới trong Vue 3.5"</span>
            <small class="text-muted">10 phút trước</small>
          </li>
          <li class="list-group-item px-0 d-flex justify-content-between">
            <span>Cập nhật cấu hình bảo mật hệ thống Vue Router Guards</span>
            <small class="text-muted">1 giờ trước</small>
          </li>
          <li class="list-group-item px-0 d-flex justify-content-between">
            <span>Người dùng mới đăng ký qua biểu mẫu Profile</span>
            <small class="text-muted">Hôm qua</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { auth } from '../router';

const router = useRouter();

function handleLogout() {
  auth.isAuthenticated = false;
  auth.user = null;
  router.push({ name: 'Login' });
}
</script>

<style scoped>
</style>
