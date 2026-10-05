<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-4 text-primary">Bài 4: Quản lý học sinh (CRUD với Vue 3)</h3>

    <div class="row g-4">
      <!-- Form Thêm / Sửa học sinh -->
      <div class="col-md-5">
        <div class="card p-3 shadow-sm border">
          <h4 class="fw-bold mb-3 fs-5 text-success">
            {{ isEditing ? 'Cập nhật học sinh' : 'Thêm học sinh' }}
          </h4>
          
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="name" class="form-label fw-semibold">Họ tên:</label>
              <input 
                v-model="student.name" 
                type="text" 
                class="form-control" 
                id="name" 
                placeholder="Nhập họ và tên" 
                required 
              />
            </div>

            <div class="mb-3">
              <label for="score" class="form-label fw-semibold">Điểm (0 - 10):</label>
              <input 
                v-model.number="student.score" 
                type="number" 
                step="0.1" 
                min="0" 
                max="10" 
                class="form-control" 
                id="score" 
                placeholder="Nhập điểm" 
                required 
              />
            </div>

            <div class="mb-3">
              <label for="dob" class="form-label fw-semibold">Ngày sinh:</label>
              <input 
                v-model="student.dob" 
                type="date" 
                class="form-control" 
                id="dob" 
                required 
              />
            </div>

            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-success px-4">
                {{ isEditing ? 'Cập nhật' : 'Thêm' }}
              </button>
              <button 
                v-if="isEditing" 
                type="button" 
                class="btn btn-secondary px-3" 
                @click="resetForm"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Danh sách học sinh -->
      <div class="col-md-7">
        <div class="card p-3 shadow-sm border">
          <h4 class="fw-bold mb-3 fs-5 text-secondary">Danh sách học sinh</h4>
          
          <div class="table-responsive">
            <table class="table table-hover table-bordered align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th>Họ và tên</th>
                  <th class="text-center">Điểm</th>
                  <th class="text-center">Ngày sinh</th>
                  <th class="text-center" style="width: 130px;">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="students.length === 0">
                  <td colspan="4" class="text-center text-muted py-3">Chưa có học sinh nào trong danh sách.</td>
                </tr>
                <tr v-for="(stu, index) in students" :key="index">
                  <td class="fw-semibold">{{ stu.name }}</td>
                  <td class="text-center">{{ stu.score }}</td>
                  <td class="text-center">{{ stu.dob }}</td>
                  <td class="text-center">
                    <button 
                      class="btn btn-warning btn-sm me-2" 
                      @click="editStudent(index)"
                    >
                      Sửa
                    </button>
                    <button 
                      class="btn btn-danger btn-sm" 
                      @click="deleteStudent(index)"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Dữ liệu mẫu ban đầu
const students = ref([
  { name: 'Nguyễn Chí Hùng', score: 8, dob: '2006-01-01' },
  { name: 'Phạm Thị Lan', score: 9, dob: '2006-05-15' }
]);

// Biến quản lý trạng thái form
const student = ref({
  name: '',
  score: null,
  dob: ''
});

const isEditing = ref(false);
const editingIndex = ref(null);

function submitForm() {
  if (isEditing.value) {
    // Cập nhật thông tin học sinh
    students.value[editingIndex.value] = { ...student.value };
    isEditing.value = false;
    editingIndex.value = null;
  } else {
    // Thêm học sinh mới
    students.value.push({ ...student.value });
  }
  resetForm();
}

function editStudent(index) {
  student.value = { ...students.value[index] };
  isEditing.value = true;
  editingIndex.value = index;
}

function deleteStudent(index) {
  if (confirm(`Bạn có chắc chắn muốn xóa học sinh "${students.value[index].name}"?`)) {
    students.value.splice(index, 1);
    if (isEditing.value && editingIndex.value === index) {
      resetForm();
    }
  }
}

function resetForm() {
  student.value = {
    name: '',
    score: null,
    dob: ''
  };
  isEditing.value = false;
  editingIndex.value = null;
}
</script>

<style scoped>
</style>
