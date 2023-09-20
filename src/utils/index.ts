export function getCurrentDateTime() {
  const now = new Date();
  
  // const year = now.getFullYear();
  // const month = ("0" + (now.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以需要+1
  // const day = ("0" + now.getDate()).slice(-2); // 日期可能是单数，所以需要+0
  const hour = ("0" + now.getHours()).slice(-2); // 小时可能是一位数，所以需要+0
  const minute = ("0" + now.getMinutes()).slice(-2); // 分钟可能是一位数，所以需要+0
  const second = ("0" + now.getSeconds()).slice(-2); // 秒数可能是一位数，所以需要+0

  return `${hour}:${minute}:${second}`;
}