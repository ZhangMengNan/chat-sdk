// const baseUrl = 'http://36.103.177.208:9020'
const baseUrl: any = {
  development: 'https://yantu-playground.anatta.vip:8090',
  production: 'https://yantu-ai-b.anatta.vip:8090',
}

// 聊天前的准备
export async function reqGetPreparationChatData(
  uuid: string,
  options?: { [key: string]: any }
) {
  const url = baseUrl[process.env.NODE_ENV ?? 'development']

  return fetch(
    `${url}/v1/open/chat/prepare?integration_type=2&integration_uuid=${uuid}`,
    {
      ...(options || {}),
    }
  ).then((response) => response.json())
}
