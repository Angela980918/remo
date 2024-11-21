<template>
  <div id="article-info">
    <!-- 显示文章内容 -->
    <div v-if="article.title && article.content">
      <h1>{{ article.title }}</h1>
      <div v-html="article.content"></div> <!-- 渲染富文本内容 -->
    </div>
    <div v-if="error" class="error">加载文章失败，请重试。</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchArticleData } from '~/server/article' // 导入封装的 API 函数

// 用于存储文章数据和加载状态
const article = ref({})
const loading = ref(true) // 加载状态
const error = ref(false) // 错误状态

// 获取当前路由中的 id 参数
const route = useRoute()
const articleId = route.params.id // 获取动态路由参数 id

// 使用封装好的 API 请求函数获取文章数据
onMounted(async () => {
  try {
    // 调用 API，传入 articleId 和 token
    const data = await fetchArticleData(articleId, 'Zt514dB27iXvTvDr1nqsvwAAAMk')
    article.value = data.data // 假设返回的文章数据有 article 字段
    console.log(article.value)

    // 更新 SEO 信息
    useHead({
      title: article.value.title || '默认标题',
      meta: [
        { name: 'description', content: article.value.description || '默认描述' },
        { property: 'og:title', content: article.value.title || '默认标题' },
        { property: 'og:description', content: article.value.description || '默认描述' }
      ]
    })
  } catch (err) {
    console.error('加载文章失败', err)
    error.value = true // 设置错误状态
  } finally {
    loading.value = false // 完成加载，无论成功还是失败
  }

})
</script>

<style scoped>
#article-info{
  color: #021526 !important;
}

</style>