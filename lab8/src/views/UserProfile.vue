<template>
  <div class="user-profile-container py-4">
    <div class="col-lg-9 mx-auto">
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body p-4">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h2 class="fw-bold mb-1">Trang hồ sơ người dùng</h2>
              <p class="text-secondary small mb-0">
                Route lồng nhau (Nested Routes) &bull; Hỗ trợ Alias: <code>/me</code> & <code>/profile</code>
              </p>
            </div>
            <span class="badge bg-info text-dark">URL hiện tại: {{ currentPath }}</span>
          </div>

          <!-- Thanh điều hướng giữa 2 route con info và settings -->
          <ul class="nav nav-tabs mt-3">
            <li class="nav-item">
              <router-link 
                :to="{ name: 'UserProfileInfo' }" 
                class="nav-link"
                :class="{ active: $route.name === 'UserProfileInfo' }"
              >
                Thông tin cá nhân (/info)
              </router-link>
            </li>
            <li class="nav-item">
              <router-link 
                :to="{ name: 'UserProfileSettings' }" 
                class="nav-link"
                :class="{ active: $route.name === 'UserProfileSettings' }"
              >
                Cài đặt người dùng (/settings)
              </router-link>
            </li>
          </ul>

          <!-- Router-view để render component con (UserProfileInfo hoặc UserProfileSettings) -->
          <div class="p-3 border border-top-0 rounded-bottom bg-white">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPath = computed(() => route.path);
</script>

<style scoped>
</style>
