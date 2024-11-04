import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Qiitaのアクセストークン
const qiitaToken: string = process.env.QIITA_ACCESS_TOKEN!;

// 取得する記事のタグ。複数指定する場合はカンマ区切りで指定する
const targetTag: string = "flutter,dart"

const endpoint = "https://qiita.com/api/v2/items"

// Qiitaの記事の型定義
// 参考：https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF
type QiitaArticle = {
  title: string;
  url: string;
}

export const getArticleFromQiita = async (fromDateString: string): Promise<QiitaArticle[]> => {
  try {
    const response = await axios.get<QiitaArticle[]>(`${endpoint}?page=1&per_page=30&query=tag:${targetTag} created:>=${fromDateString}`, {
        headers: {
            'Authorization': `Bearer ${qiitaToken}`
        }
    });
    return response.data;
} catch (error) {
    console.error('Error fetching Qiita articles:', error);
    return [];
}
}