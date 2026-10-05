<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import type { Product } from '../stores/Product';
import { fullName, email, userRole } from '../stores/user';

const API_URL = 'http://localhost:3000/products';
const CATEGORIES_URL = 'http://localhost:3000/categories';

const products = ref<Product[]>([]);
const categories = ref<any[]>([]);
const keyword = ref('');

const isAdmin = computed(() => userRole.value === 'admin');

const editingProduct = ref<Partial<Product>>({
  name: '',
  description: '',
  details: '',
  image: 'tap-piltes.jpg',
  category: 1,
  categoryName: 'Công Nghệ & Lập Trình',
  author: '',
  authorEmail: '',
  hot: 0,
  views: 0
});

const showModal = ref(false);
const isEditing = ref(false);

onMounted(async () => {
  await fetchProducts();
  await fetchCategories();
});

const fetchProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    products.value = res.data;
  } catch (err) {
    console.error('Lỗi tải bài viết:', err);
  }
};

const fetchCategories = async () => {
  try {
    const res = await axios.get(CATEGORIES_URL);
    categories.value = res.data;
  } catch (err) {
    console.error('Lỗi tải danh mục:', err);
  }
};

// Phân quyền danh sách bài viết:
// - Admin: xem toàn bộ bài viết trong hệ thống
// - Người dùng thường: xem và quản lý bài viết do chính mình đăng
const userProducts = computed(() => {
  if (isAdmin.value) {
    return products.value;
  }
  const curEmail = (email.value || '').toLowerCase().trim();
  const curName = (fullName.value || '').toLowerCase().trim();

  return products.value.filter(p => {
    const postEmail = (p.authorEmail || '').toLowerCase().trim();
    const postAuthor = (p.author || '').toLowerCase().trim();
    return (postEmail && postEmail === curEmail) ||
           (postAuthor && postAuthor === curName) ||
           (!postEmail && curName && postAuthor.includes(curName));
  });
});

const filteredProducts = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  if (!kw) return userProducts.value;
  return userProducts.value.filter(p => 
    (p.name && p.name.toLowerCase().includes(kw)) ||
    (p.author && p.author.toLowerCase().includes(kw)) ||
    (p.categoryName && p.categoryName.toLowerCase().includes(kw))
  );
});

const openCreateModal = () => {
  isEditing.value = false;
  editingProduct.value = {
    name: '',
    description: '',
    details: '',
    image: 'tap-piltes.jpg',
    category: categories.value.length > 0 ? categories.value[0].id : 1,
    categoryName: categories.value.length > 0 ? categories.value[0].name : 'Công Nghệ',
    author: fullName.value || email.value?.split('@')[0] || 'Tác giả',
    authorEmail: email.value || '',
    createdAt: new Date().toLocaleDateString('vi-VN'),
    hot: 0,
    views: 0,
    price: 0,
    discounted: 0,
    quantity: 100
  };
  showModal.value = true;
};

const openEditModal = (product: Product) => {
  isEditing.value = true;
  editingProduct.value = { ...product };
  showModal.value = true;
};

const saveProduct = async () => {
  try {
    const cat = categories.value.find(c => String(c.id) === String(editingProduct.value.category));
    if (cat) {
      editingProduct.value.categoryName = cat.name;
    }

    if (!editingProduct.value.author) {
      editingProduct.value.author = fullName.value || email.value?.split('@')[0] || 'Tác giả';
    }
    if (!editingProduct.value.authorEmail) {
      editingProduct.value.authorEmail = email.value || '';
    }

    if (isEditing.value && editingProduct.value.id) {
      await axios.put(`${API_URL}/${editingProduct.value.id}`, editingProduct.value);
      alert('Cập nhật bài viết thành công!');
    } else {
      editingProduct.value.createdAt = new Date().toLocaleDateString('vi-VN');
      editingProduct.value.views = 0;
      await axios.post(API_URL, editingProduct.value);
      alert('Đăng bài viết mới thành công!');
    }
    showModal.value = false;
    await fetchProducts();
  } catch (err) {
    console.error('Lỗi lưu bài viết:', err);
    alert('Có lỗi xảy ra khi lưu bài viết!');
  }
};

const deleteProduct = async (id: number | string) => {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      alert('Xóa bài viết thành công!');
      await fetchProducts();
    } catch (err) {
      console.error('Lỗi xóa bài viết:', err);
      alert('Có lỗi xảy ra khi xóa bài viết!');
    }
  }
};
</script>

<template>
  <div class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-1">
            <li class="breadcrumb-item"><RouterLink to="/">Trang chủ</RouterLink></li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ isAdmin ? 'Quản lý toàn bộ bài viết' : 'Bài viết của tôi' }}
            </li>
          </ol>
        </nav>
        <h3 class="fw-bold mb-0">
          <i class="bi bi-file-earmark-text text-primary me-2"></i>
          {{ isAdmin ? 'Quản lý toàn bộ bài viết (Admin)' : 'Quản lý bài viết của tôi' }}
        </h3>
        <p class="text-muted small mt-1 mb-0" v-if="!isAdmin">
          Xin chào <strong>{{ fullName || email }}</strong>, bạn có thể tạo mới, chỉnh sửa hoặc xóa bài viết của chính mình tại đây.
        </p>
      </div>
      <button @click="openCreateModal" class="btn btn-primary px-3 shadow-sm rounded-pill">
        <i class="bi bi-plus-circle me-1"></i> Viết bài mới
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
              placeholder="Tìm theo tiêu đề bài viết hoặc danh mục..." 
            />
          </div>
        </div>
        <div class="col-md-6 text-md-end text-muted small mt-2 mt-md-0">
          Số lượng bài viết: <strong>{{ filteredProducts.length }}</strong>
        </div>
      </div>
    </div>

    <!-- Bảng danh sách bài viết -->
    <div class="card shadow-sm border-0 rounded-3 overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th style="width: 70px;">Ảnh</th>
              <th>Tiêu đề bài viết</th>
              <th>Chuyên mục</th>
              <th>Tác giả</th>
              <th class="text-center">Ngày đăng</th>
              <th class="text-center">Lượt xem</th>
              <th class="text-center" style="width: 140px;">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7" class="text-center py-5 text-muted">
                <i class="bi bi-journal-x fs-1 d-block mb-2"></i>
                Chưa có bài viết nào. Hãy bấm <strong>"Viết bài mới"</strong> để chia sẻ bài viết đầu tiên của bạn!
              </td>
            </tr>
            <tr v-for="post in filteredProducts" :key="post.id">
              <td>
                <img 
                  :src="'/images/' + (post.image || 'tap-piltes.jpg')" 
                  alt="Ảnh bài viết" 
                  class="rounded" 
                  style="width: 55px; height: 45px; object-fit: cover;" 
                />
              </td>
              <td>
                <RouterLink :to="'/detail/' + post.id" class="text-decoration-none fw-bold text-dark fs-6 d-block">
                  {{ post.name }}
                </RouterLink>
                <small class="text-muted text-truncate d-inline-block" style="max-width: 350px;">
                  {{ post.description }}
                </small>
              </td>
              <td>
                <span class="badge bg-primary-subtle text-primary">
                  {{ post.categoryName || 'Blog' }}
                </span>
              </td>
              <td class="text-secondary small">{{ post.author || 'Tác giả' }}</td>
              <td class="text-center text-muted small">{{ post.createdAt || 'N/A' }}</td>
              <td class="text-center"><span class="badge bg-light text-dark border">{{ post.views || 0 }}</span></td>
              <td class="text-center">
                <button @click="openEditModal(post)" class="btn btn-warning btn-sm me-2" title="Chỉnh sửa">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button @click="deleteProduct(post.id)" class="btn btn-danger btn-sm" title="Xóa">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Thêm / Chỉnh sửa bài viết -->
    <div 
      v-if="showModal" 
      class="modal fade show d-block" 
      tabindex="-1" 
      style="background: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content shadow border-0 rounded-4 overflow-hidden">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title fw-bold">
              {{ isEditing ? 'Chỉnh sửa bài viết' : 'Viết bài mới' }}
            </h5>
            <button @click="showModal = false" type="button" class="btn-close btn-close-white"></button>
          </div>

          <div class="modal-body p-4">
            <form @submit.prevent="saveProduct">
              <div class="mb-3">
                <label class="form-label fw-semibold">Tiêu đề bài viết *</label>
                <input 
                  v-model="editingProduct.name" 
                  type="text" 
                  class="form-control" 
                  placeholder="Nhập tiêu đề bài viết" 
                  required 
                />
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Chuyên mục bài viết *</label>
                  <select v-model="editingProduct.category" class="form-select" required>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                      {{ cat.name }}
                    </option>
                  </select>
                </div>

                <div class="col-md-6">
                  <label class="form-label fw-semibold">Tác giả</label>
                  <input 
                    v-model="editingProduct.author" 
                    type="text" 
                    class="form-control" 
                    placeholder="Tên tác giả" 
                  />
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-semibold">Hình ảnh minh họa</label>
                  <select v-model="editingProduct.image" class="form-select">
                    <option value="tap-piltes.jpg">tap-piltes.jpg (Pilates)</option>
                    <option value="banner2.jpg">banner2.jpg (Công nghệ)</option>
                    <option value="corevalue.jpg">corevalue.jpg (Đời sống)</option>
                    <option value="eat-clean.png">eat-clean.png (Eat Clean)</option>
                    <option value="spinach_300x300.jpg">spinach_300x300.jpg (Rau củ quả)</option>
                    <option value="video1.jpg">video1.jpg (Trải nghiệm du lịch)</option>
                    <option value="banner1.jpg">banner1.jpg (Banner)</option>
                  </select>
                </div>
                <div class="col-md-6 text-center">
                  <img 
                    :src="'/images/' + (editingProduct.image || 'tap-piltes.jpg')" 
                    alt="Preview" 
                    class="rounded border mt-2" 
                    style="max-height: 80px; object-fit: cover;" 
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">Tóm tắt ngắn (Description) *</label>
                <textarea 
                  v-model="editingProduct.description" 
                  class="form-control" 
                  rows="2" 
                  placeholder="Mô tả tóm tắt nội dung bài viết..." 
                  required
                ></textarea>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Nội dung chi tiết bài viết (Details)</label>
                <textarea 
                  v-model="editingProduct.details" 
                  class="form-control" 
                  rows="5" 
                  placeholder="Nội dung bài viết đầy đủ..."
                ></textarea>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button @click="showModal = false" type="button" class="btn btn-secondary px-3 rounded-pill">
                  Hủy
                </button>
                <button type="submit" class="btn btn-primary px-4 rounded-pill shadow-sm">
                  <i class="bi bi-check-circle me-1"></i> Lưu bài viết
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
