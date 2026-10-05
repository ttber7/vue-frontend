<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  fullname: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitted = ref(false);

const handleSubmit = () => {
  if (form.value.fullname && form.value.email && form.value.message) {
    isSubmitted.value = true;
    setTimeout(() => {
      alert('Cảm ơn bạn đã gửi liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
      form.value = { fullname: '', email: '', subject: '', message: '' };
      isSubmitted.value = false;
    }, 500);
  }
};
</script>

<template>
  <div>
    <!-- Banner Liên hệ -->
    <div class="py-5 text-white" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
      <div class="container text-center py-4">
        <h1 class="fw-bold mb-2">Liên Hệ Với Chúng Tôi</h1>
        <p class="lead mb-0 text-white-50">
          Hãy để lại thông tin hoặc câu hỏi của bạn. Đội ngũ biên tập luôn sẵn sàng kết nối cùng bạn!
        </p>
      </div>
    </div>

    <div class="container py-5">
      <div class="row g-5">
        <!-- Thông tin liên hệ -->
        <div class="col-lg-5">
          <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h4 class="fw-bold text-primary mb-4">Thông Tin Kết Nối</h4>

            <div class="d-flex align-items-start mb-4">
              <div class="bg-primary-subtle text-primary p-3 rounded-circle me-3">
                <i class="bi bi-geo-alt fs-5"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-1">Địa chỉ tòa soạn</h6>
                <p class="text-secondary small mb-0">Công viên phần mềm Quang Trung, Quận 12, TP. Hồ Chí Minh</p>
              </div>
            </div>

            <div class="d-flex align-items-start mb-4">
              <div class="bg-primary-subtle text-primary p-3 rounded-circle me-3">
                <i class="bi bi-envelope fs-5"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-1">Email hỗ trợ</h6>
                <p class="text-secondary small mb-0">contact@vueblog.vn</p>
              </div>
            </div>

            <div class="d-flex align-items-start mb-4">
              <div class="bg-primary-subtle text-primary p-3 rounded-circle me-3">
                <i class="bi bi-telephone fs-5"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-1">Hotline</h6>
                <p class="text-secondary small mb-0">+84 (0) 901 234 567 (8:00 - 18:00)</p>
              </div>
            </div>

            <hr class="my-4 text-muted" />

            <h6 class="fw-bold mb-3">Mạng xã hội</h6>
            <div class="d-flex gap-2">
              <a href="#" class="btn btn-outline-primary btn-sm rounded-circle" style="width: 38px; height: 38px; line-height: 24px;"><i class="bi bi-facebook"></i></a>
              <a href="#" class="btn btn-outline-info btn-sm rounded-circle" style="width: 38px; height: 38px; line-height: 24px;"><i class="bi bi-twitter"></i></a>
              <a href="#" class="btn btn-outline-danger btn-sm rounded-circle" style="width: 38px; height: 38px; line-height: 24px;"><i class="bi bi-youtube"></i></a>
              <a href="#" class="btn btn-outline-dark btn-sm rounded-circle" style="width: 38px; height: 38px; line-height: 24px;"><i class="bi bi-github"></i></a>
            </div>
          </div>
        </div>

        <!-- Form liên hệ -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5">
            <h4 class="fw-bold mb-4">Gửi Lời Nhắn</h4>

            <form @submit.prevent="handleSubmit">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Họ và tên *</label>
                  <input v-model="form.fullname" type="text" class="form-control" placeholder="Nguyễn Văn A" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Email *</label>
                  <input v-model="form.email" type="email" class="form-control" placeholder="name@example.com" required />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Chủ đề</label>
                <input v-model="form.subject" type="text" class="form-control" placeholder="Đóng góp ý kiến, bài viết..." />
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Nội dung tin nhắn *</label>
                <textarea v-model="form.message" class="form-control" rows="5" placeholder="Nhập nội dung bạn muốn gửi gắm..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary px-4 py-2 rounded-pill shadow-sm" :disabled="isSubmitted">
                <i class="bi bi-send me-1"></i> {{ isSubmitted ? 'Đang gửi...' : 'Gửi Tin Nhắn' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
