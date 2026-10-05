<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3 text-primary">Bài 3: Form đăng ký người dùng</h3>

    <div class="row g-4">
      <!-- Cột trái: Form Đăng ký -->
      <div class="col-md-6 col-lg-5">
        <div class="border p-4 rounded bg-white shadow-sm">
          <h4 class="fw-bold mb-3">Form Đăng Ký</h4>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label text-secondary small">Họ tên:</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="Nhập họ tên" required />
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary small">Email:</label>
              <input v-model="form.email" type="email" class="form-control" placeholder="Nhập email" required />
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary small">Mật khẩu:</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Nhập mật khẩu" required />
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary small">Ngày sinh:</label>
              <input v-model="form.dob" type="date" class="form-control" required />
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary small me-3 d-block">Giới tính:</label>
              <div class="form-check form-check-inline">
                <input v-model="form.gender" class="form-check-input" type="radio" name="gender" id="male" value="Nam" />
                <label class="form-check-label small" for="male">Nam</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.gender" class="form-check-input" type="radio" name="gender" id="female" value="Nữ" />
                <label class="form-check-label small" for="female">Nữ</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.gender" class="form-check-input" type="radio" name="gender" id="other" value="Khác" />
                <label class="form-check-label small" for="other">Khác</label>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label text-secondary small me-3 d-block">Ngôn ngữ:</label>
              <div class="form-check form-check-inline">
                <input v-model="form.languages" class="form-check-input" type="checkbox" id="langVi" value="Tiếng Việt" />
                <label class="form-check-label small" for="langVi">Tiếng Việt</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.languages" class="form-check-input" type="checkbox" id="langEn" value="Tiếng Anh" />
                <label class="form-check-label small" for="langEn">Tiếng Anh</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="form.languages" class="form-check-input" type="checkbox" id="langJp" value="Tiếng Nhật" />
                <label class="form-check-label small" for="langJp">Tiếng Nhật</label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary px-4">Đăng ký</button>
          </form>
        </div>
      </div>

      <!-- Cột phải: Thông tin đã đăng ký -->
      <div class="col-md-6 col-lg-5">
        <div class="border p-4 rounded bg-white shadow-sm h-100">
          <h4 class="fw-bold mb-3">Thông tin đã đăng ký:</h4>
          
          <div v-if="registeredInfo" class="d-flex flex-column gap-2 text-secondary">
            <p class="mb-1"><strong>Họ tên:</strong> {{ registeredInfo.name }}</p>
            <p class="mb-1"><strong>Email:</strong> {{ registeredInfo.email }}</p>
            <p class="mb-1"><strong>Ngày sinh:</strong> {{ registeredInfo.dob }}</p>
            <p class="mb-1"><strong>Giới tính:</strong> {{ registeredInfo.gender }}</p>
            <p class="mb-1">
              <strong>Ngôn ngữ:</strong> 
              {{ registeredInfo.languages && registeredInfo.languages.length > 0 ? registeredInfo.languages.join(', ') : 'Chưa chọn' }}
            </p>
          </div>
          <div v-else class="text-muted fst-italic">
            Chưa có thông tin đăng ký. Vui lòng điền form bên trái và bấm Đăng ký.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  name: 'Tèo',
  email: 'tien@gmail.com',
  password: '•••',
  dob: '2024-08-30',
  gender: 'Nam',
  languages: ['Tiếng Việt', 'Tiếng Anh']
});

const registeredInfo = ref({
  name: 'Tèo',
  email: 'tien@gmail.com',
  dob: '2024-08-30',
  gender: 'Nam',
  languages: ['Tiếng Việt', 'Tiếng Anh']
});

const register = () => {
  registeredInfo.value = {
    name: form.name,
    email: form.email,
    dob: form.dob,
    gender: form.gender,
    languages: [...form.languages]
  };
};
</script>

<style scoped>
</style>
