import { request } from 'umi';

// aid 和 bid都传自己的
export const getAllProxyByIdReq = ({did,...params}:{ did:number, params: any}) => {
  return request(`shops/${did}/proxies`,{
    method: 'get',
    params: params
  })
}

// 缺的接口
export const getProxyByIdReq = ({did, id}:{did:number, id:number})=>{
  return request(`shops/${did}/adminusers/${id}/proxies`)
}

/**让id用户代理自己的权限 */
// params: {
//   "beginDate": "string",
//   "endDate": "string"
// }
export const createProxyByIdReq = ({id, ...params}:{id:number, params: any}) => {
  return request(`users/${id}/proxy`, {
    method: 'post',
    data: params
  })
}

// 查询某个depart下的所有admin
export const getAllAdminReq = ({did, userName, mobile}: { did:number, userName: string, mobile: string}) => {
  return request(`shops/${did}/adminusers/all`,
  {
    params:{
      userName,
      mobile
    }
  })
}


export const deleteProxyByIdReq = ({did, id}:{did:number, id: number}) => {
  return request(`shops/${did}/allproxie/${id}`,{
    method: 'delete'
  })
}