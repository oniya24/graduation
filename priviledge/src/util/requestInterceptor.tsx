const BASEURL = "http://localhost:6000/";

export const addBaseUrl = (url: string, options: any) => {
  const baseURL = process.env.NODE_ENV == 'production' ?  BASEURL: "api/"
  return {
    url: `${baseURL}${url}`,
    options
  }
}

export const addAuth2Header = (url: string, options: any) => {
  let auth_Token = localStorage.getItem("authorization");
  const header = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': auth_Token
  }
  console.log(header)
  return {
    url,
    options: { ...options, ...header }
  }
}

// 错误码转义
// (response ) => {
      
// }


// 