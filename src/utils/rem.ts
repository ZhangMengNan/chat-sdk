export function setRem() {
  let htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth
  let rootDom = document.getElementById('myRoot')
  console.log('htmlWidth--', htmlWidth)
  if (htmlWidth <= 750) {
    ;(rootDom as HTMLElement).style.display = 'block'
  } else {
    ;(rootDom as HTMLElement).style.display = 'block'
  }
}
