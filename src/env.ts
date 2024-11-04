import dotenv from 'dotenv';
dotenv.config();

// LINEのチャンネルアクセストークン
export const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
// LINEチャンネルのユーザーID
export const LINE_CHANNEL_USER_ID = process.env.LINE_CHANNEL_USER_ID
// Qiitaのアクセストークン
export const QIITA_ACCESS_TOKEN = process.env.QIITA_ACCESS_TOKEN