import axios from 'axios'
import { MessageBox, Message, Loading  } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken,setToken,removeToken } from '@/utils/auth'
// import QS from 'qs'
var load = null;
/*
 * 根据环境变量区分接口的默认地址
 */
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

/*
 * 设置超时时间和跨域是否允许携带凭证
 */
axios.defaults.withCredentials = false;

/*
 * 超时
 */
axios.defaults.timeout = 1000 * 60 * 10;

/*
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
axios.defaults.headers['Content-Type'] = 'application/json';//application/x-www-form-urlencoded ; application/json
// axios.defaults.transformRequest = data => QS.stringify(data);
// axios.defaults.paramsSerializer = params => QS.stringify(params, { arrayFormat: "brackets" })
/*
 * 设置请求拦截器
 * 客户端发送请求 - > [请求拦截器] - > 服务器
 * TOKEN校验（JWT）：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
 */

axios.interceptors.request.use(config => {
	load = Loading.service({
		background:'rgba(0, 0, 0, 0)'
	});
	// 携带上token
	let token = getToken();
	token && (config.headers.Authorization = token);

	return config;
}, error => {
	load.close();
	return Promise.reject(error);
});

/*
 * 响应拦截器
 * 服务器返回信息  -> [拦截的统一处理] -> 客户端JS获取到信息
 */
axios.interceptors.response.use(
  response => {
		load.close();
		let token = response.headers.authorization
		if(token){
			removeToken();
			setToken(token);
		}
    const {data, code, msg} = response.data;
    if(code === 200){
			return response.data
    }
		if(code && code !== 200){
      Message({
        message: msg || 'error',
        type: 'error',
        duration: 3000
      })
			return response.data
    }
    if (code === 401) {
			if(store.state.app.noShow) return
			store.commit('app/SET_NOSHOW',true)
			MessageBox.confirm('您的登陆信息已经超时，您可以取消留在此页，也可以点击重新登陆', '温馨提示', {
			  confirmButtonText: '重新登陆',
			  cancelButtonText: '取消',
			  type: 'warning',
			  closeOnClickModal:false
			}).then(() => {
			  store.dispatch('user/resetToken').then(() => {
					let roleId = store.state.user.roleId
					let path = '/user/login'
					if(parseInt(roleId) === 1){
						path = '/admin/login'
					}else if(parseInt(roleId) === 2){
						path = '/user/login'
					}else if(parseInt(roleId) === 3){
						path = '/user/exhi'
					}else if(parseInt(roleId) === 4){
						path = '/user/build'
					}else if(parseInt(roleId) === 5){
						path = '/user/bition'
					}else if(parseInt(roleId) === 10){
						path = '/user/build'
					}
			    router.app.$router.push({path:path})
			  })
			}).catch(()=>{
				console.log('取消');
				store.commit('app/SET_NOSHOW',false)
			})
    }
		if(response.status === 200 && !code){
			return response
		}
    return response.data
  },
  error => {
		load.close();
  	let { response } = error
  	if (response) {
  		//=>服务器最起码返回结果了
  		switch (response.status) {
  			case 401: //=>权限
				  if(store.state.app.noShow) return
					store.commit('app/SET_NOSHOW',true)
					MessageBox.confirm('您的登陆信息已经超时或没有权限，您可以取消留在此页，也可以点击重新登陆', '温馨提示', {
						confirmButtonText: '重新登陆',
						cancelButtonText: '取消',
						type: 'warning',
						closeOnClickModal:false
					}).then(() => {
						store.dispatch('user/resetToken').then(() => {
							let roleId = store.state.user.roleId
							let path = '/user/login'
							if(parseInt(roleId) === 1){
								path = '/admin/login'
							}else if(parseInt(roleId) === 2){
								path = '/user/login'
							}else if(parseInt(roleId) === 3){
								path = '/user/exhi'
							}else if(parseInt(roleId) === 4){
								path = '/user/build'
							}else if(parseInt(roleId) === 5){
								path = '/user/bition'
							}else if(parseInt(roleId) === 10){
								path = '/user/build'
							}
					    router.app.$router.push({path:path})
						})
					}).catch(()=>{
						console.log('取消');
						store.commit('app/SET_NOSHOW',false)
					})
  				break;
  			case 400:
					Message.error(response.data.message +' 请求错误');
  				break;
				case 403:
					Message.error(response.data.message +' 没有访问权限');
  				break;
  			case 404: //=>找不到页面
					Message.error(response.config.url +' 方法不存在');
  				break;
				case 405:
					Message.error('服务器错误 '+ response.statusText);
					break;
				case 500: //=>找不到页面
					Message({
						message:'服务器错误 '+ response.statusText,
						type: 'error',
						duration: 5000,
						showClose:true
					});
  				break;
				case 504: //=>超时
					Message({
						message:'网关超时 '+ response.statusText,
						type: 'error',
						duration: 5000,
						showClose:true
					});
  				break;
				default: //=>以上都不是
					Message({
						message:'服务器错误 '+ response.statusText,
						type: 'error',
						duration: 5000,
						showClose:true
					});
  				break;
  		}
			return Promise.reject(response);
			return response;
  	} else {
  		//=>服务器连结果都没有返回
  		if (!window.navigator.onLine) {
  			// 断网处理：可以跳转到断网页面
        Message({
          message: "网络未连接",
          type: 'error',
          duration: 5000
        })
  			return;
  		}
			Message({
				message: "请求未响应",
				type: 'error',
				duration: 5000
			})
  		return Promise.reject(error.message);
  	}
  });
export default axios;
