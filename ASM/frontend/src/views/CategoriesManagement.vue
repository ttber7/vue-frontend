<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Category } from '../stores/Category';
import axios from 'axios';

const API_URL = 'http://localhost:3000/categories';
const categories = ref<Category[]>([]);
const editingCategory = ref<any>({
  name: '',
  description: '',
  isActive: true
});
const showModal = ref(false);
const keyword = ref('');
const isEditing = ref(false);

onMounted(async () => {
  await fetchCategories();
});

async function fetchCategories() {
  try {
    const response = await axios.get(API_URL);
    categories.value = response.data;
  } catch (err) {
    console.error('Lỗi tải danh mục:', err);
  }
}

const filteredCategories = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  if (!kw) return categories.value;
  return categories.value.filter(cat =>
    cat.name.toLowerCase().includes(kw) ||
    (cat.description && cat.description.toLowerCase().includes(kw))
  );
});

function openCreateModal() {
  isEditing.value = false;
  editingCategory.value = {
    name: '',
    description: '',
    isActive: true
  };
  showModal.value = true;
}

function openEditModal(cat: Category) {
  isEditing.value = true;
  editingCategory.value = { ...cat };
  showModal.value = true;
}

async function saveCategory() {
  try {
    if (isEditing.value && editingCategory.value.id) {
      await axios.put(`${API_URL}/${editingCategory.value.id}`, editingCategory.value);
      alert('Cập nhật chuyên mục thành công!');
    } else {
      await axios.post(API_URL, editingCategory.value);
      alert('Thêm chuyên mục mới thành công!');
    }
    showModal.value = false;
    await fetchCategories();
  } catch (err) {
    console.error('Lỗi lưu danh mục:', err);
    alert('Có lỗi xảy ra khi lưu chuyên mục!');
  }
}

async function deleteCategory(id: string | number) {
  if (confirm('Bạn có chắc chắn muốn xóa chuyên mục này không?')) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Xóa chuyên mục thành công!');
      await fetchCategories();
    } catch (err) {
      console.error('Lỗi xóa danh mục:', err);
      alert('Có lỗi xảy ra khi xóa chuyên mục!');
    }
  }
}
</script>

<template>
  <div class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item"><RouterLink to="/">Trang chủ</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">Quản lý danh mục</li>
          </ol>
        </nav>
        <h3 class="fw-bold mb-0">
          <i class="bi bi-folder2-open text-primary me-2"></i>Quản lý danh mục bài viết
        </h3>
        <p class="text-muted small mt-1 mb-0">
          Khu vực dành riêng cho Quản trị viên để quản lý các chủ đề blog.
        </p>
      </div>
      <button @click="openCreateModal" class="btn btn-primary px-3 shadow-sm rounded-pill">
        <i class="bi bi-plus-circle me-1"></i> Thêm chuyên mục mới
      </button>
    </div>

    <!-- Thanh tìm kiếm -->
    <div class="card p-3 shadow-sm border-0 mb-4 rounded-3">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-text bg-light"><i class="bi bi-search"></i></span>
            <input 
              v-model="keyword" 
              type="text" 
              class="form-control" 
              placeholder="Tìm theo tên hoặc mô tả chuyên mục..." 
            />
          </div>
        </div>
        <div class="col-md-6 text-md-end text-muted small mt-2 mt-md-0">
          Tổng số chuyên mục: <strong>{{ categories.length }}</strong>
        </div>
      </div>
    </div>

    <!-- Bảng danh sách danh mục -->
    <div class="card shadow-sm border-0 rounded-3 overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th style="width: 80px;">Mã</th>
              <th>Tên chuyên mục</th>
              <th>Mô tả chuyên mục</th>
              <th class="text-center" style="width: 140px;">Trạng thái</th>
              <th class="text-center" style="width: 140px;">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredCategories.length === 0">
              <td colspan="5" class="text-center py-4 text-muted">
                Không tìm thấy chuyên mục nào phù hợp.
              </td>
            </tr>
            <tr v-for="cat in filteredCategories" :key="cat.id">
              <td class="fw-bold text-secondary">#{{ cat.id }}</td>
              <td class="fw-bold text-dark">{{ cat.name }}</td>
              <td class="text-secondary small">{{ cat.description || 'Chưa có mô tả' }}</td>
              <td class="text-center">
                <span class="badge" :class="cat.isActive !== false ? 'bg-success' : 'bg-secondary'">
                  {{ cat.isActive !== false ? 'Đang hoạt động' : 'Tạm ẩn' }}
                </span>
              </td>
              <td class="text-center">
                <button @click="openEditModal(cat)" class="btn btn-warning btn-sm me-2" title="Chỉnh sửa">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button @click="deleteCategory(cat.id)" class="btn btn-danger btn-sm" title="Xóa">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Thêm / Chỉnh sửa danh mục -->
    <div 
      v-if="showModal" 
      class="modal fade show d-block" 
      tabindex="-1" 
      style="background: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content shadow border-0 rounded-4 overflow-hidden">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fw-bold">
              {{ isEditing ? 'Chỉnh sửa chuyên mục' : 'Thêm chuyên mục mới' }}
            </h5>
            <button @click="showModal = false" type="button" class="btn-close btn-close-white"></button>
          </div>

          <div class="modal-body p-4">
            <form @submit.prevent="saveCategory">
              <div class="mb-3">
                <label class="form-label fw-semibold">Tên chuyên mục *</label>
                <input 
                  v-model="editingCategory.name" 
                  type="text" 
                  class="form-control" 
                  placeholder="Ví dụ: Công Nghệ, Sức Khỏe..." 
                  required 
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Mô tả chi tiết</label>
                <textarea 
                  v-model="editingCategory.description" 
                  class="form-control" 
                  rows="3" 
                  placeholder="Nhập mô tả tóm tắt cho chuyên mục này..."
                ></textarea>
              </div>

              <div class="mb-4 form-check form-switch">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="categoryStatus" 
                  v-model="editingCategory.isActive" 
                />
                <label class="form-check-label fw-semibold" for="categoryStatus">
                  Hiển thị trên hệ thống
                </label>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button @click="showModal = false" type="button" class="btn btn-secondary px-3 rounded-pill">
                  Hủy
                </button>
                <button type="submit" class="btn btn-primary px-4 rounded-pill shadow-sm">
                  <i class="bi bi-check-circle me-1"></i> Lưu chuyên mục
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
