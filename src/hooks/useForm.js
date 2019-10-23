import { useEffect, useReducer } from "react";

const actionTypes = {
  INPUT_VALUE: "INPUT_VALUE",
  UPDATE_VALUES: "UPDATE_VALUES",
  SET_INITIAL_STATE: "SET_INITIAL_STATE"
};

const valuesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INPUT_VALUE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case actionTypes.UPDATE_VALUES:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.RESET_STATE:
      return action.payload;
    default:
      return state;
  }
};

export const useForm = (initialState, editingValues = null) => {
  const [values, dispatch] = useReducer(valuesReducer, initialState);

  useEffect(() => {
    if (editingValues) {
      dispatch({
        type: actionTypes.UPDATE_VALUES,
        payload: { ...editingValues }
      });
    } else {
      dispatch({
        type: actionTypes.RESET_STATE,
        payload: initialState
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingValues]);

  return [
    values,
    ({ target: { name, value } }) => {
      dispatch({
        type: actionTypes.INPUT_VALUE,
        payload: { name, value }
      });
    }
  ];
};
