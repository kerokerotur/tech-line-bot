import axios from "axios";
import { LINE_CHANNEL_USER_ID, LINE_CHANNEL_ACCESS_TOKEN } from "../env";

const endpoint = "https://api.line.me/v2/bot/message/push"

export const sendMessage = async (message: string): Promise<void> => {
  try {
    await axios.post(endpoint, {
        to: LINE_CHANNEL_USER_ID,  // 送信先のユーザーID
        messages: [
            {
                type: 'text',
                text: message
            }
        ]
    }, {
        headers: {
            'Authorization': `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });
} catch (error) {
    console.error('Error sending LINE message:', error);
}
}