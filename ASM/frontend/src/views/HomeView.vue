<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductList from '../components/ProductList.vue';
import type { Product } from '../stores/Product';

const hotProducts = ref<Product[]>([]);
const category1Products = ref<Product[]>([]);
const category2Products = ref<Product[]>([]);

onMounted(async () => {
  try {
    hotProducts.value = await fetch('http://localhost:3000/products?hot=1').then(r => r.json());
    category1Products.value = await fetch('http://localhost:3000/products?category=1').then(r => r.json());
    category2Products.value = await fetch('http://localhost:3000/products?category=2').then(r => r.json());
  } catch (err) {
    console.error('Lỗi tải bài viết:', err);
  }
});
</script>

<template>
  <main>
    <!-- Banner Hero Blog -->
    <div class="hero-section py-5 mb-5 text-white" style="background: linear-gradient(135deg, #1f4068 0%, #162447 100%);">
      <div class="container py-4">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <span class="badge bg-warning text-dark px-3 py-2 mb-3 fw-semibold">
              <i class="bi bi-stars"></i> MyBlog - Nền tảng chia sẻ tri thức
            </span>
            <h1 class="display-4 fw-bold mb-3">Khám phá tri thức, công nghệ & phong cách sống</h1>
            <p class="lead text-light-50 mb-4">
              Nơi cập nhật những bài viết chuyên sâu về lập trình Vue.js, mẹo rèn luyện sức khỏe, bài học cuộc sống và ẩm thực dinh dưỡng.
            </p>
            <div class="d-flex gap-3">
              <RouterLink to="/services" class="btn btn-warning text-dark px-4 py-2 fw-bold">
                Tất cả bài viết &rarr;
              </RouterLink>
              <RouterLink to="/contact" class="btn btn-outline-light px-4 py-2">
                Liên hệ hợp tác
              </RouterLink>
            </div>
          </div>
          <div class="col-lg-5 text-center">
            <img src="/images/banner1.jpg" class="img-fluid rounded-4 shadow-lg border border-2 border-white" alt="Hero Banner" style="max-height: 320px; object-fit: cover;" />
          </div>
        </div>
      </div>
    </div>

    <!-- Nội dung chính -->
    <div class="container my-5">
      <!-- Bài viết nổi bật -->
      <ProductList title="🔥 Bài viết nổi bật nhất" :products="hotProducts" />

      <!-- Danh mục 1: Công nghệ -->
      <ProductList title="💻 Công Nghệ & Lập Trình" :products="category1Products" />

      <!-- Danh mục 2: Sức khỏe -->
      <ProductList title="🌿 Sức Khỏe & Thể Thao" :products="category2Products" />
    </div>
  </main>
</template>

<style scoped>
.hero-section {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
</style>
