<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { email, fullName, userLogin, userLogout } from '../stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';

const user = ref<any>({});
const isEditing = ref(false);
const editData = ref<any>({
  fullname: '',
  phone: '',
  address: '',
  avatar: 'avatar.png'
});
const router = useRouter();

onMounted(async () => {
  await fetchUserProfile();
});

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/user?email=${email.value}`);
    if (res.data.length > 0) {
      user.value = res.data[0];
      editData.value = {
        fullname: user.value.fullname || '',
        phone: user.value.phone || '',
        address: user.value.address || '',
        avatar: user.value.avatar || 'avatar.png'
      };
    }
  } catch (err) {
    console.error('Lỗi tải thông tin cá nhân:', err);
  }
};

const handleUpdateProfile = async () => {
  try {
    if (!user.value.id) return;

    const payload = {
      ...user.value,
      fullname: editData.value.fullname,
      phone: editData.value.phone,
      address: editData.value.address,
      avatar: editData.value.avatar
    };

    await axios.put(`http://localhost:3000/user/${user.value.id}`, payload);
    user.value = payload;
    
    // Cập nhật lại state & localStorage
    userLogin({
      email: user.value.email,
      role: user.value.role || 'user',
      fullName: user.value.fullname
    });

    isEditing.value = false;
    alert('Cập nhật thông tin cá nhân thành công!');
  } catch (err) {
    console.error('Lỗi cập nhật:', err);
    alert('Không thể cập nhật thông tin!');
  }
};

const handleLogout = () => {
  userLogout();
  router.push('/login');
};
</script>

<template>
  <div class="container my-5">
    <div class="col-lg-8 mx-auto">
      <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
        <!-- Header Profile Banner -->
        <div class="bg-primary text-white p-4 d-flex justify-content-between align-items-center">
          <div>
            <h3 class="fw-bold mb-1">Hồ Sơ Cá Nhân</h3>
            <p class="small text-light-50 mb-0">Quản lý thông tin tài khoản thành viên Blog</p>
          </div>
          <button @click="handleLogout" class="btn btn-outline-light btn-sm">
            <i class="bi bi-box-arrow-right me-1"></i> Đăng xuất
          </button>
        </div>

        <div class="card-body p-4 p-md-5">
          <div class="row align-items-center mb-4 pb-4 border-bottom">
            <div class="col-md-4 text-center mb-3 mb-md-0">
              <img 
                :src="'/images/' + (user.avatar || 'avatar.png')" 
                class="rounded-circle border border-3 border-primary shadow-sm" 
                width="130" 
                height="130" 
                style="object-fit: cover;" 
                alt="Avatar" 
              />
              <div class="mt-2">
                <span class="badge" :class="user.role === 'admin' ? 'bg-danger' : 'bg-success'">
                  {{ user.role === 'admin' ? 'Quản trị viên (Admin)' : 'Thành viên tác giả' }}
                </span>
              </div>
            </div>
            <div class="col-md-8">
              <h4 class="fw-bold text-dark mb-1">{{ user.fullname || 'Người dùng MyBlog' }}</h4>
              <p class="text-secondary small mb-2"><i class="bi bi-envelope"></i> {{ user.email }}</p>
              <p class="text-secondary small mb-2"><i class="bi bi-telephone"></i> {{ user.phone || 'Chưa cập nhật' }}</p>
              <p class="text-secondary small mb-0"><i class="bi bi-geo-alt"></i> {{ user.address || 'Chưa cập nhật' }}</p>
            </div>
          </div>

          <!-- Nút kích hoạt chỉnh sửa -->
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">Thông tin chi tiết</h5>
            <button 
              @click="isEditing = !isEditing" 
              class="btn btn-sm"
              :class="isEditing ? 'btn-secondary' : 'btn-outline-primary'"
            >
              <i class="bi" :class="isEditing ? 'bi-x-circle' : 'bi-pencil'"></i>
              {{ isEditing ? ' Hủy chỉnh sửa' : ' Chỉnh sửa hồ sơ' }}
            </button>
          </div>

          <!-- Form chỉnh sửa thông tin (Y2.4) -->
          <form v-if="isEditing" @submit.prevent="handleUpdateProfile" class="bg-light p-4 rounded-3 border">
            <div class="mb-3">
              <label class="form-label fw-semibold small">Họ và tên:</label>
              <input v-model="editData.fullname" type="text" class="form-control" required />
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Số điện thoại:</label>
                <input v-model="editData.phone" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-semibold small">Địa chỉ:</label>
                <input v-model="editData.address" type="text" class="form-control" />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold small">Chọn ảnh đại diện:</label>
              <select v-model="editData.avatar" class="form-select">
                <option value="avatar.png">Avatar mặc định (TS. Trần Hoàng)</option>
                <option value="gal_1.jpg">Avatar 1 (gal_1.jpg)</option>
                <option value="corevalue.jpg">Avatar 2 (corevalue.jpg)</option>
              </select>
            </div>

            <div class="text-end">
              <button type="submit" class="btn btn-primary px-4">
                <i class="bi bi-save me-1"></i> Lưu thay đổi
              </button>
            </div>
          </form>

          <!-- Xem thông tin dạng tĩnh -->
          <div v-else class="row g-3">
            <div class="col-md-6">
              <div class="p-3 bg-light rounded border-0">
                <small class="text-muted d-block mb-1">Họ và tên</small>
                <strong>{{ user.fullname || 'Chưa cập nhật' }}</strong>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 bg-light rounded border-0">
                <small class="text-muted d-block mb-1">Địa chỉ Email</small>
                <strong>{{ user.email }}</strong>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 bg-light rounded border-0">
                <small class="text-muted d-block mb-1">Số điện thoại</small>
                <strong>{{ user.phone || 'Chưa cập nhật' }}</strong>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 bg-light rounded border-0">
                <small class="text-muted d-block mb-1">Địa chỉ</small>
                <strong>{{ user.address || 'Chưa cập nhật' }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
