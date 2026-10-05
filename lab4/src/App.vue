<template>
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Header / Navbar điều hướng các bài tập -->
    <header class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          FPT Polytechnic - Lab 4
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

    <!-- Main Container -->
    <main class="container py-4 flex-grow-1">
      
      <!-- Hiển thị Bài 2 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai2'" class="mb-5">
        <div class="card shadow-sm border-0 mb-3">
          <div class="card-header bg-white fw-bold text-secondary">
            Bài 2 (2 điểm): Viết chương trình VueJS đầu tiên - Component Hello.vue
          </div>
          <div class="card-body">
            <Hello />
          </div>
        </div>
      </section>

      <!-- Hiển thị Bài 3 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai3'" class="mb-5">
        <div class="card shadow-sm border-0 mb-3">
          <div class="card-header bg-white fw-bold text-secondary">
            Bài 3 (3 điểm): Thao tác cơ bản với VueJS (Interpolation, v-bind, v-on)
          </div>
          <div class="card-body">
            <Bai3 />
          </div>
        </div>
      </section>

      <!-- Hiển thị Bài 4 -->
      <section v-if="activeTab === 'all' || activeTab === 'bai4'" class="mb-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white fw-bold text-secondary">
            Bài 4 (3 điểm): Kết hợp Bootstrap và Vue - Hiển thị danh sách tin tức
          </div>
          <div class="card-body">
            <Bai4 />
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <small>&copy; Copyright by FPT Polytechnic - Lab 4: VueJS</small>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Hello from './components/Hello.vue';
import Bai3 from './components/Bai3.vue';
import Bai4 from './components/Bai4.vue';

const activeTab = ref('all');
</script>

<style scoped>
</style>
