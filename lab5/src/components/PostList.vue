<template>
  <div class="post-list-container">
    <h2 class="fw-bold fs-4 mb-3">Danh sách bài viết</h2>

    <div v-if="posts.length === 0" class="text-muted fst-italic">
      Chưa có bài viết nào được đăng.
    </div>

    <div
      v-for="(post, index) in posts"
      :key="index"
      class="post mb-3"
      :class="{ 'highlighted': post.title.length > 20 }"
      :style="{ backgroundColor: post.backgroundColor, color: post.textColor }"
    >
      <h3 class="text-success fw-bold fs-5 mb-1">{{ post.title }}</h3>
      <h4 class="text-danger fw-semibold fs-6 mb-2">{{ post.author }}</h4>
      <p class="mb-0 text-secondary" style="line-height: 1.6;">{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.post {
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  transition: all 0.3s ease;
}

.highlighted {
  border: 2px solid lightgray;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}
</style>
