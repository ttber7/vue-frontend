<template>
  <div class="blog-list-container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Danh sách bài viết Blog</h2>
        <p class="text-secondary mb-0">Các bài viết mới nhất trên hệ thống MyBlog</p>
      </div>
      <router-link to="/" class="btn btn-outline-secondary btn-sm">&larr; Quay lại Trang chủ</router-link>
    </div>

    <div class="row g-4">
      <div v-for="post in posts" :key="post.id" class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm border-0">
          <div class="card-body d-flex flex-column">
            <div class="badge bg-primary-subtle text-primary align-self-start mb-2 px-2 py-1">
              {{ post.category }}
            </div>
            <h5 class="card-title fw-bold text-dark">{{ post.title }}</h5>
            <p class="card-text text-secondary small flex-grow-1">
              {{ post.summary }}
            </p>
            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <small class="text-muted">{{ post.date }}</small>
              <!-- Điều hướng động sang /blog/:id -->
              <router-link 
                :to="{ name: 'BlogPost', params: { id: post.id } }" 
                class="btn btn-primary btn-sm"
              >
                Đọc bài &rarr;
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const posts = ref([
  {
    id: 1,
    title: 'Khám phá các tính năng mới trong Vue 3.5',
    category: 'Vue.js',
    summary: 'Tìm hiểu về tối ưu hóa reactivity, Reactive Props Destructure và các cải tiến hiệu năng vượt bậc trong bản cập nhật Vue 3.5.',
    date: '01/10/2026'
  },
  {
    id: 2,
    title: 'Làm chủ Vue Router 4 từ cơ bản đến nâng cao',
    category: 'Routing',
    summary: 'Hướng dẫn toàn diện về Dynamic Routing, Nested Routes, Alias và kỹ thuật bảo vệ đường dẫn bằng Navigation Guards.',
    date: '03/10/2026'
  },
  {
    id: 3,
    title: 'Xây dựng giao diện Responsive đẹp mắt với Bootstrap 5',
    category: 'Frontend UI',
    summary: 'Cách tận dụng Grid System, Flexbox utilities và các component hiện đại của Bootstrap 5 trong ứng dụng web thực tế.',
    date: '05/10/2026'
  }
]);
</script>

<style scoped>
</style>
