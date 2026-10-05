<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import type { Product } from '../stores/Product';
import { isAuthenticated, fullName, email } from '../stores/user';
import axios from 'axios';

interface Comment {
  id?: number | string;
  productId: number;
  author: string;
  authorEmail: string;
  content: string;
  createdAt: string;
}

const product = ref<Product | null>(null);
const comments = ref<Comment[]>([]);
const newComment = ref('');
const isSubmitting = ref(false);

const route = useRoute();
const postId = Number(route.params.id);

onMounted(async () => {
  await fetchPostDetail();
  await fetchComments();
});

const fetchPostDetail = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/products/${postId}`);
    product.value = res.data;
  } catch (err) {
    console.error('Lỗi tải bài viết:', err);
  }
};

const fetchComments = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/comments?productId=${postId}`);
    comments.value = res.data;
  } catch (err) {
    console.error('Lỗi tải bình luận:', err);
  }
};

const handleAddComment = async () => {
  if (!newComment.value.trim()) return;

  isSubmitting.value = true;
  try {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const commentData: Comment = {
      productId: postId,
      author: fullName.value || email.value?.split('@')[0] || 'Thành viên',
      authorEmail: email.value || '',
      content: newComment.value.trim(),
      createdAt: formattedDate
    };

    const res = await axios.post('http://localhost:3000/comments', commentData);
    comments.value.push(res.data);
    newComment.value = '';
  } catch (err) {
    console.error('Lỗi gửi bình luận:', err);
    alert('Không thể gửi bình luận. Vui lòng thử lại!');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container my-5">
    <div v-if="product" class="row g-5 justify-content-center">
      <!-- Cột chính: Nội dung bài viết -->
      <div class="col-lg-8">
        <div class="card p-4 shadow-sm border-0 mb-5">
          <!-- Danh mục & Meta -->
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="badge bg-primary px-3 py-2 fs-7">
              {{ product.categoryName || 'Blog Chuyên Đề' }}
            </span>
            <span class="text-muted small">
              <i class="bi bi-clock"></i> {{ product.createdAt || 'Mới cập nhật' }} &bull;
              <i class="bi bi-eye"></i> {{ product.views || 0 }} lượt xem
            </span>
          </div>

          <!-- Tiêu đề lớn -->
          <h1 class="fw-bold text-dark mb-3 fs-2">{{ product.name }}</h1>

          <!-- Tác giả -->
          <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
            <img src="/images/avatar.png" class="rounded-circle border" width="48" height="48" alt="Avatar" />
            <div>
              <p class="mb-0 fw-semibold text-dark">{{ product.author || 'TS. Trần Hoàng' }}</p>
              <small class="text-muted">Tác giả chuyên mục &bull; Chia sẻ kiến thức cộng đồng</small>
            </div>
          </div>

          <!-- Ảnh đại diện bài viết -->
          <div class="text-center mb-4">
            <img 
              class="img-fluid rounded-3 shadow-sm w-100" 
              style="max-height: 450px; object-fit: cover;" 
              :src="'/images/' + product.image" 
              :alt="product.name"
            />
          </div>

          <!-- Đoạn tóm tắt -->
          <p class="lead text-dark fst-italic mb-4" style="line-height: 1.8;">
            {{ product.description }}
          </p>

          <!-- Chi tiết nội dung -->
          <div class="post-body text-secondary" style="line-height: 1.9; font-size: 1.05rem; white-space: pre-line;">
            {{ product.details || product.description }}
          </div>
        </div>

        <!-- Khối bình luận bài viết (Y2.3) -->
        <div class="card p-4 shadow-sm border-0">
          <h3 class="fw-bold mb-4 text-dark fs-4">
            <i class="bi bi-chat-dots-fill text-primary"></i> Bình luận bài viết ({{ comments.length }})
          </h3>

          <!-- Form nhập bình luận -->
          <div v-if="isAuthenticated" class="mb-4">
            <form @submit.prevent="handleAddComment">
              <div class="mb-3">
                <label class="form-label text-secondary small fw-semibold">
                  Viết bình luận với tư cách: <strong class="text-primary">{{ fullName || email }}</strong>
                </label>
                <textarea 
                  v-model="newComment" 
                  class="form-control" 
                  rows="3" 
                  placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..." 
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary px-4" :disabled="isSubmitting">
                <i class="bi bi-send-fill me-1"></i> Gửi bình luận
              </button>
            </form>
          </div>

          <div v-else class="alert alert-warning d-flex align-items-center justify-content-between mb-4">
            <span><i class="bi bi-lock-fill me-2"></i> Vui lòng đăng nhập để tham gia bình luận bài viết.</span>
            <RouterLink to="/login" class="btn btn-warning btn-sm fw-bold">Đăng nhập ngay</RouterLink>
          </div>

          <!-- Danh sách bình luận đã có -->
          <div class="comments-list">
            <div v-if="comments.length === 0" class="text-muted fst-italic py-3">
              Chưa có bình luận nào. Hãy là người đầu tiên để lại ý kiến!
            </div>

            <div 
              v-for="(cmt, idx) in comments" 
              :key="cmt.id || idx" 
              class="d-flex gap-3 mb-3 p-3 bg-light rounded-3"
            >
              <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0" style="width: 42px; height: 42px;">
                {{ cmt.author ? cmt.author.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h6 class="fw-bold mb-0 text-dark">{{ cmt.author }}</h6>
                  <small class="text-muted">{{ cmt.createdAt }}</small>
                </div>
                <p class="mb-0 text-secondary small" style="white-space: pre-line;">{{ cmt.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phụ: Tác giả & Bài viết liên quan -->
      <div class="col-lg-4">
        <!-- Card thông tin tác giả -->
        <div class="card p-4 shadow-sm border-0 mb-4 text-center">
          <img src="/images/avatar.png" class="rounded-circle mx-auto mb-3 border p-1" width="90" height="90" alt="Avatar tác giả" />
          <h5 class="fw-bold mb-1">{{ product.author || 'Ban biên tập MyBlog' }}</h5>
          <p class="text-muted small mb-3">Tác giả chuyên mục Blog</p>
          <p class="text-secondary small fst-italic mb-3">
            "Không ngừng học hỏi, rèn luyện và chia sẻ tri thức mỗi ngày."
          </p>
          <RouterLink to="/services" class="btn btn-outline-primary btn-sm w-100">
            Xem thêm bài viết khác
          </RouterLink>
        </div>

        <!-- Điều hướng quay lại -->
        <div class="card p-3 shadow-sm border-0">
          <RouterLink to="/services" class="btn btn-light text-secondary w-100">
            &larr; Quay lại danh sách Blog
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Trạng thái Loading -->
    <div v-else class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Đang tải nội dung bài viết...</p>
    </div>
  </div>
</template>

<style scoped>
</style>
