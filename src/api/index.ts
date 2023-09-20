
// const baseUrl = 'https://yantu-playground.anatta.vip:8090'
const baseUrl = 'http://36.103.177.208:9020'
// 聊天前的准备
export async function reqGetPreparationChatData(uuid: string, options?: { [key: string]: any }) {
  return fetch(`${baseUrl}/v1/open/chat/prepare?integration_type=2&integration_uuid=${uuid}`, {
    ...(options || {}),
  }).then(response=>response.json());
}
// export async function reqGetPreparationChatData(uuid: string, options?: { [key: string]: any }) {
//   return request<IResponse>(`/v1/open/chat/prepare`, {
//     method: 'GET',
//     params: {
//       integration_type: 1,
//       integration_uuid: uuid,
//     },
//     ...(options || {}),
//   });
// }