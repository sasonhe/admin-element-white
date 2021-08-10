import http from '@/utils/http'
/**
 * 导出接口
 * @param  {[type]} data [参数]
 * @return {[type]}      [blob]
 */
const exportExcel = data => http.get('/api/export',{ // /gdWorkermaster/export
	params:data,
	responseType: 'blob',
	headers:{
		'content-type':'application/octet-stream;charset=utf-8'
	},
	...data
})

/**
 * 下载文件
 * @param  {[type]} data [参数]
 * @return {[type]}      [blob]
 */
export const exportFile = (data,config) => http.get(data.url,{
	responseType: 'blob',
	...config
})
export default {
  exportExcel,
	exportFile,
}
