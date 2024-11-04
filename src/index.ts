import {format, subDays} from 'date-fns'
import { getArticleFromQiita } from './adapter/qiita';
import { sendMessage } from './adapter/line';

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
      return sendMessage(message);
    })
    await Promise.all(promise)
})();