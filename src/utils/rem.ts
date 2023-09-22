export function setRem() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let rootDom = document.getElementById('myRoot');
  if (htmlWidth <= 750) {
    (rootDom as HTMLElement).style.display = 'none';
  } else {
    (rootDom as HTMLElement).style.display = 'block';
  }
}
