<template>
  <div class="container py-5 text-center my-auto">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="card shadow-lg border-0 rounded-4 p-4 p-md-5">
          <div class="mb-3">
            <i class="bi bi-shield-lock-fill text-danger display-1"></i>
          </div>
          <h2 class="fw-bold text-danger mb-2">403 - Truy Cập Bị Từ Chối</h2>
          <p class="text-secondary small mb-4">
            Bạn không có quyền quản trị để truy cập chức năng này. Trang này chỉ dành riêng cho tài khoản có vai trò <strong>Admin</strong>.
          </p>
          <div class="d-flex justify-content-center gap-2">
            <RouterLink to="/" class="btn btn-primary px-3 py-2 rounded-pill shadow-sm">
              <i class="bi bi-house-door me-1"></i>Về Trang chủ
            </RouterLink>
            <RouterLink to="/productManagement" class="btn btn-outline-secondary px-3 py-2 rounded-pill">
              <i class="bi bi-journal-text me-1"></i>Bài viết của tôi
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
