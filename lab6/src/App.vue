<template>
  <div class="min-vh-100 d-flex flex-column bg-light">
    <!-- Navbar điều hướng các bài tập -->
    <header class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">
          FPT Polytechnic - Lab 6
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
        <Bai4 />
      </section>

    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-auto">
      <small>&copy; Copyright by FPT Polytechnic - Lab 6: VueJS Conditional & List Rendering, CRUD</small>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import Bai4 from './components/Bai4.vue';

const activeTab = ref('all');
</script>

<style scoped>
</style>
