import http from '@/utils/http'
/**
 * 用户登录接口
 * @param  {[type]} data [参数]
 * @return {[type]}      [JSON]
 */

export const getInfo = () => http.get('/sysLogin/getUser')//登录后获取用户信息
const addAuspice = data => http.post('/user/addAuspiceAccount',data); //添加新账号（主办账号）
const getCaptcha = data => http.post('/sms/getCaptcha',data); //获取验证码
const captchaVerify = data => http.get('/sms/captchaVerify',{params:data}); //验证码验证
const queryAccounts = data => http.get('/sysLogin/queryAccountsExists',{params:data}); //查询账号是否存在
const register = data => http.get('/sysLogin/registerAndAuditJudge',{params:data}); //登录时候判断是否注册，已注册再判断是否审核通过
const LoginAuspice = data => http.post('/sysLogin/LoginAuspiceAccount',data); //主办账号登录
export const updateOnePassword = data => http.post('/sysLogin/updateOnePassword',data); //主办账号登录


const addExhibit = data => http.post('/buildCorp/addExhibitProducer',data); //搭建商注册
const ExhibitProducer = data => http.post('/buildCorp/ExhibitProducerAuthentication',data); //搭建商注册

const buildCorpQueryById = data => http.get('/buildCorp/queryById',{params:data}); //根据id查询搭建商注册信息

const affiliateExhibitProducer = data => http.post('/buildCorp/affiliateExhibitProducer',data); //判断加入企业（新增该公司另一个帐号）
const deleteExhibitProducer = data => http.get('/buildCorp/deleteExhibitProducer',{params:data}); //不加入企业，假删除该帐号数据

const loginExhibitProducer = data => http.post('/sysLogin/loginExhibitProducer',data); //搭建商登录

const addHomeCourt = data => http.post('/homeCourt/addHomeCourt',data); //主场注册
const queryById = data => http.get('/homeCourt/queryById',{params:data}); //主场根据id查询实体信息
const HomeCourtAuthentication = data => http.post('/homeCourt/HomeCourtAuthentication',data); //主场企业认证资料
const affiliateHomeCourt = data => http.post('/homeCourt/affiliateHomeCourt',data); //主场判断加入企业（新增该公司另一个帐号）
const deleteHomeCourt = data => http.get('/homeCourt/deleteHomeCourt',{params:data}); //主场不加入企业，假删除该帐号数据
const loginHomeCourt = data => http.post('/sysLogin/loginHomeCourt',data); //主场账号登录

export const sysLoginLogout = data => http.post('/sysLogin/logout',data)//退出登录
export const sysUserLogin = data => http.post('/sysLogin/login',data)//统一登录
const updatePassword = data => http.post('/sysLogin/updatePassword',data)//修改密码
const verifyPhoneIsAccounts = data => http.get('/sysLogin/verifyPhoneIsAccounts',{params:data}); //验证手机号码是否是该账号的绑定手机号码
const verifyNewPassword = data => http.get('/sysLogin/verifyNewPassword',{params:data}); //验证新密码是否与旧密码一样



export default {
  addAuspice,
  getCaptcha,
  captchaVerify,
  queryAccounts,
  register,
  LoginAuspice,
  updateOnePassword,
  addExhibit,
  ExhibitProducer,
  buildCorpQueryById,
  affiliateExhibitProducer,
  deleteExhibitProducer,
  loginExhibitProducer,
  addHomeCourt,
  queryById,
  HomeCourtAuthentication,
  affiliateHomeCourt,
  deleteHomeCourt,
  loginHomeCourt,

  sysUserLogin,
  updatePassword,
  verifyPhoneIsAccounts,
  verifyNewPassword
}
