import http from '@/utils/http'
/**
 * 图片上传接口
 * @param  {[type]} data [file name,filedir文件存储目录]
 * @return {[type]}      [JSON]
 */
const uploadImage = (data,type) => http.post(`/upload/image/${type}`,data,{headers:{'Content-Type': 'multipart/form-data'}})//图片上传
/**
 * 删除图片
 * @param  {[type]} data [String] /uploadFile/article/deleteImages/ +'saas2/project/1587180403560-3292.jpg'
 * @return {[type]}      [description]
 */
const deleteImage = data => http.delete('/upload/imageDelete',{data:data})//删除图片
/**
 * 文件上传接口
 * @param  {[type]} data [file name,filedir文件存储目录]
 * @return {[type]}      [JSON]
 */
const uploadFiles = (data,type) => http.post('/upload/file',data,{headers:{'Content-Type': 'multipart/form-data'}})//文件上传
/**
 * 删除文件
 * @param  {[type]} data [String] /uploadFile/article/deleteImages/ +'saas2/project/1587180403560-3292.jpg'
 * @return {[type]}      [description]
 */
const fileDelete = data => http.delete('/upload/fileDelete',{data:data})//删除文件


export default {
	uploadImage,
  deleteImage,
	uploadFiles,
	fileDelete,
}
