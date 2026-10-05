<template>
  <div class="create-post-container card p-4 shadow-sm mb-4">
    <h2 class="fw-bold fs-4 mb-3">Tạo bài viết mới</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" class="form-control mb-3" placeholder="Tiêu đề bài viết" required />
      <input v-model="author" class="form-control mb-3" placeholder="Tên tác giả" required />
      <textarea v-model="content" class="form-control mb-3" rows="4" placeholder="Nội dung bài viết" required></textarea>
      <button type="submit" class="btn btn-primary px-4">Đăng bài</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sử dụng defineEmits để emit sự kiện
const emit = defineEmits(['add-post']);

const title = ref('');
const content = ref('');
const author = ref('');

function submitPost() {
  if (title.value && content.value && author.value) {
    const newPost = {
      title: title.value,
      content: content.value,
      author: author.value
    };

    // Gửi sự kiện 'add-post' với dữ liệu của bài viết
    emit('add-post', newPost);

    // Reset fields
    title.value = '';
    content.value = '';
    author.value = '';
  }
}
</script>

<style scoped>
input,
textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #2980b9;
}
</style>
