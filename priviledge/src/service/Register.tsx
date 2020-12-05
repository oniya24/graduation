import { request } from 'umi';
export const registerAdmin = (params: any) => {
  return request(
    'adminusers',
    {
      method: 'post',
      body: params
    }
  );
};


