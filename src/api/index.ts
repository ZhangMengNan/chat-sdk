// const baseUrl = 'https://yantu-playground.anatta.vip:8090' // TODO（配置环境变量）测试
const baseUrl = 'https://yantu-ai-b.anatta.vip:8090' // 正式
// const baseUrl = 'http://36.103.177.208:9020'
// 聊天前的准备
export async function reqGetPreparationChatData(
  uuid: string,
  options?: { [key: string]: any }
) {
  return fetch(
    `${baseUrl}/v1/open/chat/prepare?integration_type=2&integration_uuid=${uuid}`,
    {
      ...(options || {}),
    }
  ).then((response) => response.json())
}
