export const mapDispatchToProps = Model => dispatch => {
  const { namespace } = Model;
  let mapResult = {};
  Object.keys(Model.effects).forEach(key => {
    mapResult[key] = payload =>
      dispatch({ type: `${namespace}/${key}`, payload });
  });
  return mapResult;
};
