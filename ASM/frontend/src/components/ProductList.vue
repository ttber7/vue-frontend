<script setup lang="ts">
import type { Product } from '../stores/Product';
import { RouterLink } from 'vue-router';

defineProps<{
  title: string;
  products: Product[];
}>();
</script>

<template>
  <div class="mb-5">
    <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
      <h3 class="fw-bold text-dark fs-4 mb-0">{{ title }}</h3>
      <span class="badge bg-secondary">{{ products.length }} bài viết</span>
    </div>

    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="product in products" :key="product.id">
        <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
          <img 
            :src="'/images/' + product.image" 
            class="card-img-top" 
            alt="Hình bài viết" 
            style="height: 200px; object-fit: cover;" 
          />
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="badge bg-primary-subtle text-primary small">
                {{ product.categoryName || 'Blog' }}
              </span>
              <span class="text-muted small">
                <i class="bi bi-eye"></i> {{ product.views || 0 }} lượt xem
              </span>
            </div>

            <h5 class="card-title fw-bold text-dark fs-6 mb-2" style="min-height: 40px;">
              {{ product.name }}
            </h5>

            <p class="card-text text-secondary small flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              {{ product.description }}
            </p>

            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <small class="text-muted">
                <i class="bi bi-person"></i> {{ product.author || 'Tác giả' }}
              </small>
              <RouterLink :to="'/detail/' + product.id" class="btn btn-outline-primary btn-sm">
                Đọc tiếp &rarr;
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12) !important;
}
</style>
