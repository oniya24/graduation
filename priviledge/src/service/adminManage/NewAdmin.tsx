import { request } from 'umi';
// 认证用户
export const approveAdminByIdReq = ({did,id}:{id: number, did: number}) => {
  return request(`shops/${did}/adminusers/${id}/approve`, {
    method: 'put',
  })
}

export const getAllNewAdminReq = (did:number) => {
  return request(`shops/${did}/adminusers/allnew`, {
    method: 'get'
  })
}