const baseUrl: any = {
  development: 'https://yantu-playground.anatta.vip:8090',
  production: 'https://yantu-ai-b.anatta.vip:8090',
}
export const url = baseUrl[process.env.NODE_ENV ?? 'development']

// 聊天前的准备(客服智能体)
export async function reqGetPreparationChatData(
  uuid: string,
  options?: { [key: string]: any }
) {
  return fetch(
    `${url}/v1/open/chat/prepare?integration_type=2&integration_uuid=${uuid}`,
    {
      ...(options || {}),
    }
  ).then((response) => response.json())
}

// 聊天前的准备(营销智能体)
export async function reqGetAgentChatData(
  uuid: string,
  options?: { [key: string]: any }
) {
  return fetch(
    `${url}/v1/open/chat/agent?integration_type=2&integration_uuid=${uuid}`,
    {
      ...(options || {}),
    }
  ).then((response) => response.json())
}
