export const createReducer = function(initialState, actionHandlers) {
  return function(state = initialState, { type, payload }) {
    return actionHandlers[type] ? actionHandlers[type](state, payload) : state;
  };
};
