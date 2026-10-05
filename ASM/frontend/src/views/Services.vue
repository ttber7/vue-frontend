<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Product } from '../stores/Product';
import { RouterLink } from 'vue-router';

const products = ref<Product[]>([]);
const keyword = ref('');
const selectedCategory = ref<string>('all');
const sortOrder = ref<'newest' | 'views'>('newest');

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/products');
    products.value = await res.json();
  } catch (err) {
    console.error('Lỗi tải danh sách bài viết:', err);
  }
});

const filteredAndSortedProducts = computed(() => {
  let result = products.value.filter(post => {
    const matchKeyword = post.name.toLowerCase().includes(keyword.value.toLowerCase()) ||
                         (post.description && post.description.toLowerCase().includes(keyword.value.toLowerCase()));
    const matchCategory = selectedCategory.value === 'all' || String(post.category) === String(selectedCategory.value);
    return matchKeyword && matchCategory;
  });

  if (sortOrder.value === 'views') {
    result.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else {
    result.sort((a, b) => (b.id || 0) - (a.id || 0));
  }

  return result;
});
</script>

<template>
  <div class="container my-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold text-dark mb-2">Khám Phá Tất Cả Bài Viết</h1>
      <p class="text-secondary">Tìm kiếm và lọc bài viết theo chủ đề bạn quan tâm</p>
    </div>

    <!-- Thanh tìm kiếm và bộ lọc -->
    <div class="row g-3 mb-4 p-3 bg-white rounded shadow-sm align-items-center">
      <!-- Tìm kiếm -->
      <div class="col-md-5">
        <div class="input-group">
          <span class="input-group-text bg-light"><i class="bi bi-search"></i></span>
          <input 
            v-model="keyword" 
            type="text" 
            class="form-control" 
            placeholder="Tìm kiếm bài viết theo từ khóa..." 
          />
        </div>
      </div>

      <!-- Lọc theo danh mục -->
      <div class="col-md-4">
        <select v-model="selectedCategory" class="form-select">
          <option value="all">-- Tất cả danh mục --</option>
          <option value="1">Công Nghệ & Lập Trình</option>
          <option value="2">Sức Khỏe & Thể Thao</option>
          <option value="3">Đời Sống & Kỹ Năng</option>
          <option value="4">Ẩm Thực & Dinh Dưỡng</option>
        </select>
      </div>

      <!-- Sắp xếp -->
      <div class="col-md-3">
        <select v-model="sortOrder" class="form-select">
          <option value="newest">Mới nhất</option>
          <option value="views">Lượt xem nhiều nhất</option>
        </select>
      </div>
    </div>

    <!-- Danh sách bài viết -->
    <div v-if="filteredAndSortedProducts.length === 0" class="text-center py-5 text-muted">
      <i class="bi bi-inbox fs-1 d-block mb-2"></i>
      Không tìm thấy bài viết nào phù hợp với bộ lọc hiện tại.
    </div>

    <div v-else class="row g-4">
      <div 
        class="col-md-6 col-lg-4" 
        v-for="post in filteredAndSortedProducts" 
        :key="post.id"
      >
        <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden post-card">
          <img 
            :src="'/images/' + post.image" 
            class="card-img-top" 
            alt="Hình bài viết" 
            style="height: 210px; object-fit: cover;" 
          />
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary-subtle text-primary">
                {{ post.categoryName || 'Blog' }}
              </span>
              <span class="text-muted small">
                <i class="bi bi-eye"></i> {{ post.views || 0 }}
              </span>
            </div>

            <h5 class="card-title fw-bold text-dark fs-6 mb-2">
              {{ post.name }}
            </h5>

            <p class="card-text text-secondary small flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              {{ post.description }}
            </p>

            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <small class="text-muted">
                <i class="bi bi-person"></i> {{ post.author || 'Tác giả' }}
              </small>
              <RouterLink :to="'/detail/' + post.id" class="btn btn-primary btn-sm">
                Đọc bài &rarr;
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12) !important;
}
</style>
