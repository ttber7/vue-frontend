<template>
  <div class="card p-4 shadow-sm">
    <!-- Hiển thị lời chào -->
    <h1 class="text-primary mb-3">{{ greeting }}</h1>
    
    <!-- Tạo nút thay đổi nội dung -->
    <div>
      <button 
        class="btn btn-primary px-4 py-2" 
        v-bind:title="buttonTitle" 
        @click="changeGreeting"
      >
        Click để thay đổi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bai3',
  data() {
    return {
      greeting: 'Xin chào bạn!',
      buttonTitle: 'Nhấn để thay đổi lời chào'
    };
  },
  methods: {
    changeGreeting() {
      this.greeting = 'Hello, World!';
      this.buttonTitle = 'Lời chào mới đã được cập nhật';
    }
  }
};
</script>
