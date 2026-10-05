<template>
  <div class="container py-5 text-center my-auto">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="card shadow-lg border-0 rounded-4 p-4 p-md-5">
          <div class="mb-3">
            <i class="bi bi-compass text-warning display-1"></i>
          </div>
          <h2 class="fw-bold text-dark mb-2">404 - Không Tìm Thấy Trang</h2>
          <p class="text-secondary small mb-4">
            Địa chỉ liên kết bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ khỏi hệ thống.
          </p>
          <div>
            <RouterLink to="/" class="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
              <i class="bi bi-house-door me-1"></i>Quay lại Trang chủ
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
