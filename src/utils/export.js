import { Message } from 'element-ui'
export function exportDowload(res) {
  return new Promise((resolve, reject) => {
    let fileName = '附件.xls';
    let name = res.headers['content-disposition'];
    if(!name){
      Message({
        message: '文件下载失败！无法读取文件名',
        type: 'error',
        duration: 3000
      })
      reject('文件下载失败！无法读取文件名')
      return false
    }
    if(name){
      fileName = name.split('=')[1]
    }
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(new Blob([res.data]), decodeURI(fileName));
    }
    // for Non-IE (chrome, firefox etc.)
    else {
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        var url = window.URL.createObjectURL(new Blob([res.data]));
        a.href =  url;
        a.download = decodeURI(fileName);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
    resolve(true)
  })

}
