<template>
  <div class="user-settings-view py-3">
    <h4 class="fw-bold text-primary mb-3">Cài đặt người dùng</h4>
    <form @submit.prevent="saveSettings">
      <div class="mb-3">
        <label class="form-label text-secondary small">Đổi mật khẩu mới</label>
        <input type="password" class="form-control" placeholder="Nhập mật khẩu mới" />
      </div>

      <div class="mb-3">
        <label class="form-label text-secondary small">Ngôn ngữ hiển thị</label>
        <select class="form-select">
          <option selected>Tiếng Việt</option>
          <option>Tiếng Anh (English)</option>
        </select>
      </div>

      <div class="form-check form-switch mb-4">
        <input class="form-check-input" type="checkbox" id="emailNoti" checked />
        <label class="form-check-label text-secondary small" for="emailNoti">
          Nhận thông báo qua email khi có bài viết hoặc bình luận mới
        </label>
      </div>

      <button type="submit" class="btn btn-primary px-4">Lưu cài đặt</button>
      <span v-if="savedMessage" class="text-success ms-3 small fw-bold">{{ savedMessage }}</span>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const savedMessage = ref('');

function saveSettings() {
  savedMessage.value = 'Cài đặt đã được lưu thành công!';
  setTimeout(() => {
    savedMessage.value = '';
  }, 3000);
}
</script>

<style scoped>
</style>
