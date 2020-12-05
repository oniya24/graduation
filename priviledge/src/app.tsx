import { history, RequestConfig } from 'umi';
import { addBaseUrl,addAuth2Header } from './util/requestInterceptor'
export function render(oldRender: () => void) {
  // 查看当前用户是否登录 如果未登录跳转到登录界面
  // if (false) {
  //   oldRender();
  // } else {
  //   history.push('/login');
  //   oldRender();
  // }
  oldRender()
}

export const request: RequestConfig = {
  timeout: 5000,
  
  requestInterceptors: [
    addBaseUrl,
    addAuth2Header
  ],
  responseInterceptors: [
    
  ],
};
