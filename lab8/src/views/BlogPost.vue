<template>
  <div class="blog-post-container py-4">
    <div class="col-lg-9 mx-auto">
      <!-- Nút quay lại -->
      <div class="mb-3">
        <button @click="goBack" class="btn btn-outline-secondary btn-sm">
          &larr; Quay lại danh sách Blog (router.push)
        </button>
      </div>

      <div class="card p-4 shadow-sm border-0">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge bg-primary">{{ post.category }}</span>
          <span class="badge bg-secondary">Route ID: {{ postId }}</span>
          <span class="text-muted small ms-auto">Đăng ngày: {{ post.date }}</span>
        </div>

        <h1 class="fw-bold fs-3 text-dark mb-3">{{ post.title }}</h1>
        <div class="text-muted small mb-4 pb-2 border-bottom">
          Tác giả: <strong>Nguyễn Văn Tèo</strong> &bull; Lượt xem: 1,250
        </div>

        <div class="post-content text-secondary" style="line-height: 1.8;">
          <p class="lead text-dark">{{ post.summary }}</p>
          <p>{{ post.content }}</p>
          <div class="alert alert-info border-0 mt-4">
            <strong>Ghi chú kỹ thuật:</strong> Trang này là một <code>Dynamic Route</code> với mẫu đường dẫn <code>/blog/:id</code>. Tham số ID trích xuất hiện tại là: <strong>{{ postId }}</strong>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Lấy tham số động id từ URL
const postId = computed(() => route.params.id);

// Dữ liệu mô phỏng theo từng id
const postDataMap = {
  '1': {
    title: 'Khám phá các tính năng mới trong Vue 3.5',
    category: 'Vue.js',
    summary: 'Tìm hiểu về tối ưu hóa reactivity, Reactive Props Destructure và các cải tiến hiệu năng vượt bậc trong bản cập nhật Vue 3.5.',
    content: 'Vue 3.5 mang lại nhiều cải tiến đáng kể cho bộ nhớ và tốc độ thực thi của hệ thống reactivity. Điểm đáng chú ý nhất là cú pháp Reactive Props Destructure giờ đây đã ổn định, giúp lập trình viên viết code ngắn gọn và tự nhiên hơn bao giờ hết.',
    date: '01/10/2026'
  },
  '2': {
    title: 'Làm chủ Vue Router 4 từ cơ bản đến nâng cao',
    category: 'Routing',
    summary: 'Hướng dẫn toàn diện về Dynamic Routing, Nested Routes, Alias và kỹ thuật bảo vệ đường dẫn bằng Navigation Guards.',
    content: 'Vue Router 4 là giải pháp định tuyến chính thức cho Vue 3. Nó hỗ trợ cấu hình nested routes để xây dựng giao diện nhiều tầng phức tạp, dynamic routes để tái sử dụng component cho nhiều bài viết, và Navigation Guards để kiểm soát quyền truy cập trang chặt chẽ.',
    date: '03/10/2026'
  },
  '3': {
    title: 'Xây dựng giao diện Responsive đẹp mắt với Bootstrap 5',
    category: 'Frontend UI',
    summary: 'Cách tận dụng Grid System, Flexbox utilities và các component hiện đại của Bootstrap 5 trong ứng dụng web thực tế.',
    content: 'Bootstrap 5 đã loại bỏ hoàn toàn jQuery, chuyển sang sử dụng Vanilla JavaScript giúp tối ưu tốc độ tải trang. Hệ thống lưới linh hoạt với các breakpoint từ mobile đến màn hình cực lớn giúp giao diện luôn hiển thị hoàn hảo trên mọi thiết bị.',
    date: '05/10/2026'
  }
};

const post = computed(() => {
  return postDataMap[postId.value] || {
    title: `Bài viết số #${postId.value}`,
    category: 'Chung',
    summary: `Tóm tắt nội dung của bài viết có mã số định danh là ${postId.value}.`,
    content: `Nội dung chi tiết của bài viết số ${postId.value} đang được cập nhật. Bạn đang xem trang chi tiết bài viết thông qua cơ chế Dynamic Route trong Vue Router.`,
    date: 'Hôm nay'
  };
});

function goBack() {
  router.push({ name: 'BlogList' });
}
</script>

<style scoped>
</style>
