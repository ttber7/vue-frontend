<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import type { Product } from '../stores/Product';

const products = ref<Product[]>([]);
const route = useRoute();
const keyword = ref(String(route.query.tukhoa || ''));
const isLoading = ref(true);

onMounted(async () => {
  await fetchProducts();
});

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    const res = await fetch('http://localhost:3000/products');
    products.value = await res.json();
  } catch (err) {
    console.error('Lỗi tải bài viết:', err);
  } finally {
    isLoading.value = false;
  }
};

const filteredProducts = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  if (!kw) return products.value;
  return products.value.filter(post => 
    (post.name && post.name.toLowerCase().includes(kw)) ||
    (post.title && post.title.toLowerCase().includes(kw)) ||
    (post.description && post.description.toLowerCase().includes(kw)) ||
    (post.categoryName && post.categoryName.toLowerCase().includes(kw)) ||
    (post.author && post.author.toLowerCase().includes(kw))
  );
});

watch(() => route.query.tukhoa, (newQuery) => {
  keyword.value = String(newQuery || '');
});
</script>

<template>
  <div class="container py-5">
    <div class="mb-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/">Trang chủ</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page">Tìm kiếm bài viết</li>
        </ol>
      </nav>
      <h3 class="fw-bold">
        <i class="bi bi-search me-2 text-primary"></i>Kết quả tìm kiếm
      </h3>
      <p class="text-muted" v-if="keyword">
        Tìm kiếm với từ khóa: <strong class="text-primary">"{{ keyword }}"</strong> 
        ({{ filteredProducts.length }} kết quả)
      </p>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="text-muted mt-2">Đang tìm bài viết...</p>
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-center py-5">
      <i class="bi bi-journal-x display-1 text-muted"></i>
      <h5 class="mt-3 text-secondary">Không tìm thấy bài viết nào phù hợp</h5>
      <p class="text-muted">Hãy thử tìm kiếm với từ khóa khác hoặc quay lại danh sách bài viết.</p>
      <RouterLink to="/services" class="btn btn-primary mt-2">
        <i class="bi bi-arrow-left me-1"></i>Tất cả bài viết
      </RouterLink>
    </div>

    <div v-else class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="post in filteredProducts" :key="post.id">
        <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
          <div class="position-relative">
            <img
              :src="'/images/' + (post.image || 'tap-piltes.jpg')"
              class="card-img-top object-fit-cover"
              style="height: 220px;"
              :alt="post.name || post.title"
            />
            <span class="badge bg-primary position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill">
              {{ post.categoryName || 'Chung' }}
            </span>
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between text-muted small mb-2">
              <span><i class="bi bi-person me-1"></i>{{ post.author || 'Tác giả' }}</span>
              <span><i class="bi bi-eye me-1"></i>{{ post.views || 0 }} lượt xem</span>
            </div>
            <h5 class="card-title fw-bold text-dark mb-2 line-clamp-2">
              {{ post.name || post.title }}
            </h5>
            <p class="card-text text-secondary small flex-grow-1 line-clamp-3">
              {{ post.description }}
            </p>
            <div class="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
              <span class="text-muted small">
                <i class="bi bi-calendar3 me-1"></i>{{ post.createdAt || 'Mới cập nhật' }}
              </span>
              <RouterLink :to="'/detail/' + post.id" class="btn btn-outline-primary btn-sm rounded-pill px-3">
                Đọc tiếp <i class="bi bi-arrow-right"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
