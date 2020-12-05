import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi'
import { getAdminReq } from '@/service/Personal';
import { message } from 'antd';


export const mapStateToProps = ({ Personal, loading }) => {
  const { userInfo, roleInfo } = Personal
  return {
    userInfo,
    roleInfo,
    getAdminLoading: loading.effects.getAdmin
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getAdmin: (payload) =>  dispatch({ type: 'Personal/getAdmin', payload})
  }
}


const LoginModel = {
  namespace: 'Personal',
  state: {
    userInfo: {
      userName: "1",
      mobile: "2",
      name: "3",
      email: "4",
      avatar: "5",
      lastLoginTime: "6",
      lastLoginIp: "7",
    },
    roleInfo: {

    }
  },
  effects: {
    *getAdmin({ payload }, { call, put }) {
      const res = yield call(getAdminReq, payload)
      yield put({
        type: 'saveUserInfo',
        payload: res
      })
    },
  },
  reducers: {
    save(state, action) {
      console.log(state,action)
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    saveRole(state, action) {
      return {
        ...state,
        roleInfo: action.payload,
      };
    }
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