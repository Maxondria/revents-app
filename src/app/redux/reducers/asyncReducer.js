import { initialState } from "../store/initialState";
import { createReducer } from "../../common/utils/reducer-utils";
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "../constants/actionTypes";

export const asyncReducer = createReducer(initialState.async, {
  [ASYNC_ACTION_START]: (state, { elementName }) => ({
    ...state,
    loading: true,
    elementName
  }),
  [ASYNC_ACTION_FINISH]: state => ({
    ...state,
    loading: false,
    elementName: null
  }),
  [ASYNC_ACTION_ERROR]: state => ({
    ...state,
    loading: false,
    elementName: null
  })
});
