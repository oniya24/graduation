import { history, RequestConfig } from 'umi';
import { addAuth2Header } from './utilReq/requestInterceptor';
import { handleErrorMsg } from './utilReq/responseInterceptor';
import { message } from 'antd';
import { errorHandler } from './utilReq/errorHandler';
import { getUserReq } from '@/service/personal/User';
import { nologRoutes, BASEURL } from '@/const/router';
console.log(process.env.NODE_ENV)

export function render(oldRender: () => void) {
  console.log(history.location.pathname)
  if(history.location.pathname === '/'){
    history.push('/login')
  }
  if(nologRoutes.indexOf(history.location.pathname) !== -1){
    oldRender()
  }else{
    // 查看当前用户是否登录 如果未登录跳转到登录界面
    getUserReq().then((val)=>{
      oldRender()
    }).catch((error)=>{
      message.info("请先登录")
      history.push('/login');
    }) 
  }
  // if (false) {
  //   oldRender();
  // } else {
  //   history.push('/login');
  //   oldRender();
  // }
  // oldRender()
}

export const request: RequestConfig = {
  timeout: 5000,
  mode: 'cors',
  prefix: process.env.NODE_ENV == 'production' ?  BASEURL: "/api/",
  errorHandler,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.ok,
        errorMessage: resData.message,
      };
    },
  },
  requestInterceptors: [
    // addBaseUrl,
    addAuth2Header
  ],
  responseInterceptors: [
    handleErrorMsg
  ],
};
