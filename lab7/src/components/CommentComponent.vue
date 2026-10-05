<template>
  <div class="border p-4 rounded bg-white shadow-sm col-md-10 col-lg-8 mx-auto">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="fw-bold mb-0">Bình luận bài viết</h3>
      <span class="badge bg-light text-dark border p-2">
        Xin chào, <strong class="text-primary">{{ username }}</strong>
      </span>
    </div>

    <!-- Khối bài viết -->
    <div class="card mb-4 border shadow-sm">
      <img src="../assets/images/img1.jpg" class="card-img-top" alt="Hình ảnh" style="max-height: 280px; object-fit: cover;" />
      <div class="card-body">
        <h4 class="card-title fw-bold fs-5 text-dark">8 loại rau củ quả giàu canxi</h4>
        <p class="card-text text-secondary small mb-0">
          Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...
        </p>
      </div>
    </div>

    <!-- Form bình luận -->
    <form @submit.prevent="submitComment">
      <div class="mb-3">
        <textarea 
          v-model="commentText" 
          class="form-control" 
          rows="3" 
          placeholder="Nhập bình luận của bạn" 
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success px-4">Gửi bình luận</button>
    </form>

    <!-- Danh sách các bình luận -->
    <div v-if="comments.length > 0" class="mt-4 pt-3 border-top">
      <h5 class="fw-bold mb-3 fs-6">Danh sách các bình luận:</h5>
      <ul style="list-style-type: circle;" class="ps-3 text-secondary mb-0">
        <li v-for="(comment, index) in comments" :key="index" class="mb-2">
          <strong>{{ comment.name }}:</strong> {{ comment.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['username']);
const commentText = ref('');
const comments = ref([
  { name: 'Bình An', text: 'Bài viết rất hữu ích' }
]);

function submitComment() {
  if (commentText.value.trim()) {
    comments.value.push({
      name: props.username,
      text: commentText.value.trim()
    });
    commentText.value = '';
  }
}
</script>

<style scoped>
</style>
