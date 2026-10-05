<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { isAuthenticated, userLogout, userRole, fullName, email } from './stores/user';

const router = useRouter();
const keyword = ref('');

const handleSearch = () => {
  if (keyword.value.trim()) {
    router.push({
      path: '/timkiem',
      query: { tukhoa: keyword.value.trim() }
    });
  }
};

const handleLogout = () => {
  userLogout();
  router.push('/login');
};

const isAdmin = computed(() => userRole.value === 'admin');
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header class="sticky-top shadow-sm">
      <nav class="navbar navbar-expand-lg navbar-dark" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
        <div class="container">
          <RouterLink class="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <i class="bi bi-journal-text fs-4 text-warning"></i>
            <span>VUE BLOG</span>
          </RouterLink>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active fw-semibold" to="/">
                  <i class="bi bi-house-door me-1"></i>Trang chủ
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active fw-semibold" to="/services">
                  <i class="bi bi-collection me-1"></i>Bài viết
                </RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated">
                <RouterLink class="nav-link" active-class="active fw-bold text-warning" to="/productManagement">
                  <i class="bi bi-pencil-square me-1"></i>{{ isAdmin ? 'Quản lý bài viết' : 'Bài viết của tôi' }}
                </RouterLink>
              </li>
              <li class="nav-item" v-if="isAuthenticated && isAdmin">
                <RouterLink class="nav-link text-warning" active-class="active fw-bold" to="/categoriesManagement">
                  <i class="bi bi-folder me-1"></i>Quản lý danh mục
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" active-class="active fw-semibold" to="/contact">
                  <i class="bi bi-envelope me-1"></i>Liên hệ
                </RouterLink>
              </li>
            </ul>

            <div class="d-flex align-items-center gap-2">
              <!-- Search box -->
              <div class="input-group" style="max-width: 260px;">
                <input
                  v-model="keyword"
                  @keyup.enter="handleSearch"
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  class="form-control form-control-sm"
                />
                <button @click="handleSearch" class="btn btn-warning btn-sm" type="button">
                  <i class="bi bi-search"></i>
                </button>
              </div>

              <!-- User Dropdown -->
              <div class="dropdown">
                <button
                  class="btn btn-outline-light btn-sm dropdown-toggle d-flex align-items-center gap-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-person-circle fs-5"></i>
                  <span class="d-none d-md-inline" v-if="isAuthenticated">
                    {{ fullName || email }}
                  </span>
                  <span class="badge bg-warning text-dark ms-1" v-if="isAuthenticated && isAdmin">Admin</span>
                </button>

                <ul class="dropdown-menu dropdown-menu-end shadow">
                  <template v-if="!isAuthenticated">
                    <li>
                      <RouterLink class="dropdown-item" to="/login">
                        <i class="bi bi-box-arrow-in-right me-2 text-primary"></i>Đăng nhập
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/signup">
                        <i class="bi bi-person-plus me-2 text-success"></i>Đăng ký tài khoản
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/forgot-password">
                        <i class="bi bi-key me-2 text-secondary"></i>Quên mật khẩu
                      </RouterLink>
                    </li>
                  </template>

                  <template v-else>
                    <li class="dropdown-header">
                      <strong>{{ fullName || 'Người dùng' }}</strong><br />
                      <small class="text-muted">{{ email }}</small>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <RouterLink class="dropdown-item" to="/profile">
                        <i class="bi bi-person-vcard me-2 text-primary"></i>Hồ sơ cá nhân
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink class="dropdown-item" to="/productManagement">
                        <i class="bi bi-file-earmark-post me-2 text-primary"></i>{{ isAdmin ? 'Quản lý bài viết' : 'Bài viết của tôi' }}
                      </RouterLink>
                    </li>
                    <li v-if="isAdmin">
                      <RouterLink class="dropdown-item" to="/categoriesManagement">
                        <i class="bi bi-tags me-2 text-warning"></i>Quản lý danh mục
                      </RouterLink>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <button @click="handleLogout" class="dropdown-item text-danger">
                        <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
                      </button>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="flex-grow-1">
      <RouterView />
    </main>

    <footer class="bg-dark text-white pt-5 pb-3 mt-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-5">
            <h5 class="fw-bold text-warning mb-3">
              <i class="bi bi-journal-text me-2"></i>VUE BLOG
            </h5>
            <p class="text-secondary">
              Nền tảng chia sẻ kiến thức công nghệ, sức khỏe, lối sống và ẩm thực. Cập nhật những bài viết chuyên sâu và tin tức hữu ích mỗi ngày.
            </p>
          </div>
          <div class="col-md-3">
            <h6 class="text-uppercase fw-bold mb-3 text-light">Chuyên mục</h6>
            <ul class="list-unstyled text-secondary">
              <li class="mb-2"><RouterLink to="/services" class="text-decoration-none text-secondary">Công nghệ & Lập trình</RouterLink></li>
              <li class="mb-2"><RouterLink to="/services" class="text-decoration-none text-secondary">Sức khỏe & Đời sống</RouterLink></li>
              <li class="mb-2"><RouterLink to="/services" class="text-decoration-none text-secondary">Ẩm thực & Dinh dưỡng</RouterLink></li>
              <li class="mb-2"><RouterLink to="/services" class="text-decoration-none text-secondary">Kỹ năng phát triển</RouterLink></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6 class="text-uppercase fw-bold mb-3 text-light">Liên hệ & Hỗ trợ</h6>
            <ul class="list-unstyled text-secondary">
              <li class="mb-2"><i class="bi bi-envelope me-2"></i>contact@vueblog.vn</li>
              <li class="mb-2"><i class="bi bi-telephone me-2"></i>+84 (0) 901 234 567</li>
              <li class="mb-2"><i class="bi bi-geo-alt me-2"></i>Tòa nhà FPT Polytechnic, TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>
        <hr class="border-secondary my-4" />
        <div class="text-center text-secondary small">
          © 2026 VUE BLOG - SOF3081 Assignment. All Rights Reserved.
        </div>
      </div>
    </footer>
  </div>
</template>
