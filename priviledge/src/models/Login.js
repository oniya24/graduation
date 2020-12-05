import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi'
import { loginAdmin } from '@/service/Login';
import { message } from 'antd';


export const mapStateToProps = ({ Login, loading }) => {
  return {
    loginLoading: loading.effects.login
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) =>  dispatch({ type: 'Login/login', payload})
  }
}


const LoginModel = {
  namespace: 'Login',
  state: {
    // name: '123456',
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(loginAdmin, payload)
      console.log("res", res)
      message.success("登录成功")
      history.push("/personal")
    },
  },
  reducers: {
    // save(state, action) {
    //   console.log(state,action)
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
//   subscriptions: {
//     setup({ dispatch, history }) {
//       return history.listen(({ pathname }) => {
//         if (pathname === '/') {
//           dispatch({
//             type: 'query',
//           })
//         }
//       });
//     }
//   }
}

export default LoginModel;