// services/article.js
export const fetchArticleData = async (articleId, token) => {
    const formdata = new FormData();
    formdata.append('id', articleId);  // 使用动态的 articleId 请求文章
    formdata.append('shop_id', '28');  // 固定的 shop_id

    const options = {
        method: 'POST',
        body: formdata,
        headers: {
            'Authorization': `Bearer ${token}`,  // 使用 Bearer token 进行认证
        },
    };

    try {
        const response = await fetch('https://api-article.reloan.hk/v1/get', options);

        if (response.ok) {
            const data = await response.json();
            return data; // 返回获取的文章数据
        } else {
            throw new Error(`请求失败: ${response.statusText}`);
        }
    } catch (error) {
        console.error('请求出错:', error);
        throw error; // 让调用者处理错误
    }
};

export const fetchArticles = async (shopId = 28, limit = 10, offset = 0) => {
    const formdata = new URLSearchParams();
    formdata.append('shop_id', shopId.toString());
    formdata.append('limit', limit.toString());
    formdata.append('offset', offset.toString());

    const options = {
        method: 'POST',
        body: formdata,
        headers: {
            'Authorization': 'Bearer Zt514dB27iXvTvDr1nqsvwAAAMk',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    try {
        const response = await fetch('https://api-article.reloan.hk/v1/get_list', options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // 返回获取的文章列表数据
    } catch (error) {
        console.error('Error fetching articles:', error);
        return null;
    }
};


