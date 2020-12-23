import { approveAdminByIdReq, getAllNewAdminReq } from '@/service/adminManage/NewAdmin.tsx';
import { message } from 'antd';

const namespace = 'NewAdmin';
export const mapStateToProps = ({ NewAdmin, loading }) => {
  return {
    ...NewAdmin  
  }
}
export const mapDispatchToProps = (dispatch) => {
  return {
    getAllNewAdmin: (payload) => dispatch({ type: `${namespace}/getAllNewAdmin`, payload}),
    approveAdminById: (payload) => dispatch({ type: `${namespace}/approveAdminById`, payload})
  }
}


export default {
  namespace,
  state: {
    newAdminList: []
  },
  effects: {
    *approveAdminById({payload},{call, put}) {
      const res = yield call(approveAdminByIdReq, payload)
    },
    *getAllNewAdmin({ payload }, { call, put }) {
      const res = yield call(getAllNewAdminReq, payload);
    }
  },
  reducers: {

  }
}