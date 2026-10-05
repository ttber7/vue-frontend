<template>
  <div class="card p-4 shadow-sm">
    <h3 class="fw-bold mb-3 text-primary">Bài 3: Hiển thị danh sách bài viết (sử dụng v-for)</h3>

    <div class="container mt-2">
      <h2 class="text-center fw-bold mb-4">Kiến thức sức khỏe cộng đồng</h2>
      
      <div class="row g-4">
        <div 
          class="col-sm-4" 
          v-for="(item, index) in items" 
          :key="index"
        >
          <div class="card h-100 shadow-sm border-0">
            <img :src="item.image" class="card-img-top img-fluid" alt="Hình ảnh" style="height: 200px; object-fit: cover;" />
            <div class="card-body d-flex flex-column">
              <h3 class="card-title fs-5 fw-bold mb-2">{{ item.title }}</h3>
              <p class="card-text text-secondary small flex-grow-1">{{ item.content }}</p>
              <button class="btn btn-info text-white mt-auto align-self-start">Xem chi tiết</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';

const items = [
  {
    title: '8 loại rau củ quả giàu canxi',
    content: 'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...',
    image: img1
  },
  {
    title: 'Các loại gia vị tốt cho sức khỏe',
    content: 'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn đã thêm hương thơm và vị hấp dẫn...',
    image: img2
  },
  {
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content: 'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cùng nhiều vitamin và khoáng chất giúp giảm lượng đường trong máu, tốt cho tim...',
    image: img3
  }
];
</script>

<style scoped>
</style>
