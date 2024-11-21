<template>
  <div>
    <h1>文章列表</h1>

    <!-- 加载状态 -->
    <div v-if="loading">加载中...</div>

    <!-- 错误提示 -->
    <div v-if="error">加载失败，请重试。</div>

    <!-- 文章列表 -->
    <div v-if="articles.length && !loading && !error">
      <ul>
        <li v-for="article in articles" :key="article.id">
          <h3>{{ article.title }}</h3>
          <p>{{ article.description }}</p>
          <router-link :to="`/article-info/${article.id}`">查看文章</router-link>
        </li>
      </ul>
    </div>

    <!-- 分页 -->
    <div v-if="totalPages > 1" class="pagination">
      <ul>
        <li v-if="page > 1">
          <NuxtLink :to="`/articles/${page - 1}`">« 上一页</NuxtLink>
        </li>

        <!-- 第一页和省略号 -->
        <li v-if="page > 2">
          <NuxtLink :to="`/articles/1`">1</NuxtLink>
          <span>...</span>
        </li>

        <!-- 中间页码 -->
        <li v-for="n in totalPages" :key="n">
          <NuxtLink :to="`/articles/${n}`" :class="{ active: n === page }">{{ n }}</NuxtLink>
        </li>

        <li v-if="page < totalPages">
          <NuxtLink :to="`/articles/${page + 1}`">下一页 »</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchArticles } from '~/server/article' // 导入封装的 API 函数

const route = useRoute()
const articles = ref([])
const loading = ref(true)
const error = ref(false)
const totalPages = ref(1)

// 获取当前页码，默认是 1
const page = parseInt(route.params.p || 1)
const limit = 10

// 获取文章数据并处理分页
const getArticles = async (page) => {
  try {
    loading.value = true
    const data = await fetchArticles(28, limit, (page - 1) * limit)
    console.log(data)
    articles.value = data.data.rows || []  // 获取文章数据
    totalPages.value = Math.ceil(data.total / limit)  // 计算总页数
  } catch (err) {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getArticles(page)
})
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.pagination ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.pagination li {
  margin: 0 5px;
}
.pagination .active {
  font-weight: bold;
}
</style>
