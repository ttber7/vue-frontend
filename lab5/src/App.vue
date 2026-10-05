<template>
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Navbar điều hướng -->
    <header class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          FPT Polytechnic - Lab 5
        </a>
        <div class="d-flex gap-2">
          <button 
            class="btn btn-sm" 
            :class="activeTab === 'all' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'"
            @click="activeTab = 'all'"
          >
            Tất cả bài tập
          </button>
          <button 
            class="btn btn-sm" 
            :class="activeTab === 'bai1' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'"
            @click="activeTab = 'bai1'"
          >
            Bài 1
          </button>
          <button 
            class="btn btn-sm" 
            :class="activeTab === 'bai2' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'"
            @click="activeTab = 'bai2'"
          >
            Bài 2
          </button>
          <button 
            class="btn btn-sm" 
            :class="activeTab === 'bai3' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'"
            @click="activeTab = 'bai3'"
          >
            Bài 3
          </button>
          <button 
            class="btn btn-sm" 
            :class="activeTab === 'bai4' ? 'btn-light text-primary fw-bold' : 'btn-outline-light'"
            @click="activeTab = 'bai4'"
          >
            Bài 4
          </button>
        </div>
      </div>
    </header>

    <!-- Nội dung chính -->
    <main class="container py-4 flex-grow-1">
      
      <!-- Bài 1 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai1'" class="mb-4">
        <Bai1 />
      </section>

      <!-- Bài 2 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai2'" class="mb-4">
        <Bai2 />
      </section>

      <!-- Bài 3 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai3'" class="mb-4">
        <Bai3 />
      </section>

      <!-- Bài 4 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai4'" class="mb-4">
        <div class="card p-4 shadow-sm">
          <h3 class="fw-bold mb-4 text-primary">Bài 4: Thao tác với Class và Style binding (Ứng dụng Blog)</h3>
          
          <div class="row">
            <div class="col-lg-5">
              <CreatePost @add-post="addPost" />
            </div>
            <div class="col-lg-7">
              <PostList :posts="posts" />
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <small>&copy; Copyright by FPT Polytechnic - Lab 5: VueJS Reactivity & Bindings</small>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import CreatePost from './components/CreatePost.vue';
import PostList from './components/PostList.vue';

const activeTab = ref('all');

// Mảng quản lý danh sách bài viết (Bài 4)
const posts = ref([
  {
    title: 'Bật Mí 8 Nguyên Tắc Phối Màu Quần Áo Sành Điệu',
    author: 'Nguyễn Văn Tèo',
    content: 'Bạn có thể phối áo màu xanh lá, quần màu kem và giày màu tím theo cách phối màu kiểu tam giác. Hoặc có thể phối các set đồ cùng ton lạnh hoặc nóng ...',
    backgroundColor: '#ffffff',
    textColor: '#333333'
  }
]);

// Hàm thêm bài viết mới nhận từ component con CreatePost
function addPost(post) {
  posts.value.unshift(post);
}
</script>

<style scoped>
</style>
