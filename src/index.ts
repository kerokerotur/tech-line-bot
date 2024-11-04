import axios from 'axios';
import dotenv from 'dotenv';
import {format, subDays} from 'date-fns'
import { getArticleFromQiita } from './adapter/qiita';
dotenv.config();

// 環境変数はgithub actions側で指定する

// Qiitaのアクセストークン
// const qiitaToken: string = process.env.QIITA_ACCESS_TOKEN!;
// LINEのチャンネルアクセストークン
const lineToken: string = process.env.LINE_CHANNEL_ACCESS_TOKEN!;
// LINEチャンネルのユーザーID
const userId: string = process.env.LINE_CHANNEL_USER_ID!;
// 取得する記事のタグ。複数指定する場合はカンマ区切りで指定する
// const targetTag: string = "flutter,dart"

// Qiitaの記事の型定義
// 参考：https://qiita.com/api/v2/docs#%E6%8A%95%E7%A8%BF
// interface QiitaArticle {
//     title: string;
//     url: string;
// }

// Qiitaの最新記事を取得する関数
// async function fetchQiitaArticles(fromDateString: string): Promise<QiitaArticle[]> {
//     try {
//         const response = await axios.get<QiitaArticle[]>(`https://qiita.com/api/v2/items?page=1&query=tag:${targetTag} created:>=${fromDateString}&per_page=30`, {
//             headers: {
//                 'Authorization': `Bearer ${qiitaToken}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching Qiita articles:', error);
//         return [];
//     }
// }

// LINEにメッセージを送信する関数
async function sendLineMessage(message: string): Promise<void> {
    try {
        await axios.post('https://api.line.me/v2/bot/message/push', {
            to: userId,  // 送信先のユーザーID
            messages: [
                {
                    type: 'text',
                    text: message
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${lineToken}`,
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error sending LINE message:', error);
    }
}

const _format = (date: Date) => {
  return format(date, "yyyy-MM-dd")
}

// メイン処理
(async () => {
    const today = new Date()
    const yesterday = subDays(today, 1)
    console.log(`executionDate: ${_format(today)}`)
    const articles = await getArticleFromQiita(_format(yesterday));
    if (!articles.length) return
    console.log(`${articles.length}件の記事を取得しました`)
    const promise = articles.map(article => {
      const message = `${article.title}\n${article.url}`
      return sendLineMessage(message);
    })
    await Promise.all(promise)
})();