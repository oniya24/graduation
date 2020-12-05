import { request } from 'umi'

interface updateAdminParams {
  name: String,
  avatar: String,
  mobile: String ,
  email: String
}
export const updateAdminReq = (params: updateAdminParams) => {
  return request(
    'adminusers',
    {
      method: 'put',
      body: JSON.stringify(params)
    }
  )
}


export const getAdminReq = (params: any) => {
  return request('adminusers')
}


export const updatePasswordReq = (params: any) => {
  return request(
    'adminusers/password',
    {
      method: 'put',
      body: params
    })
}

export const sendAuthCodeReq = (params: any) => {
  return request(
    'adminusers/password/reset',
    {
      method: 'put',
      
    }
  )
}

export const logoutAdminReq = (params: any) => {
  return request('adminusers/logout')
}


export const getAdminPriviledgeReq = (id: any) => {
  return request( `adminusers/${id}/priviledge`)
}


