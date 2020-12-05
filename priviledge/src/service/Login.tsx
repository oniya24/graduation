import { request } from 'umi'

export const loginAdmin = (params: any) => {
  return request(
    // '/api/adminusers/login',
    'users',
    // {
    //   method: 'post',
    //   body: params
    // }
  )
}
