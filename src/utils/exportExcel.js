import { Notification, Message } from 'element-ui';
import i18n from '@/language'
import http from '@/utils/http'
/**
 * 导出通用方法
 * @param  {[type]} data           [参数] {expoId:1,name:'张三'}
 * @param  {[type]} path           [路径] /url/dolown/excel
 * @param  {String} [method='get'] [get/post]
 * @return {[type]}                [description]
 */
export default function exportExcel(data,path,method='get'){
  const get = (path,data,config) => http.get(path,{params:data,responseType: 'blob',...config})
  const post = (path,data,config) => http.post(path,data,{responseType: 'blob',...config})
  const request = method == 'get'?get:post
  let su = Notification({
    title: '数据提交成功',
    message: '正在导出，请稍后',
    type: 'info',
    duration:0
  });

  return new Promise((resolve, reject) => {
    request(path,data,{
      onDownloadProgress: progress => {
        let total = progress.total || progress.srcElement.getResponseHeader('content-length')
        if(total){
          let num = Math.round(progress.loaded / total * 100) + '%'
          su.message = `正在导出 ${num}`
        }
      }
    }).then(async res => {
      if(res){
        setTimeout( _ => su.close(),3000)
        if(res.status === 200){
          await createFile(res)
          Notification({
            title: '导出成功',
            message: '可在浏览器下载任务中查看',
            type: 'success'
          });
          resolve(res)
        }
      }
    }).catch(err => {
      setTimeout( _ => su.close(),3000)
      Notification({
        title: '导出失败',
        message: '请求未响应',
        type: 'error'
      });
    })
  })
}

function createFile(res){
  return new Promise((resolve, reject) => {
    let fileName = '';
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
    resolve()
  })
}
