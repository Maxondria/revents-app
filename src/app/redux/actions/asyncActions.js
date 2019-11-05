import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "../constants/actionTypes";

export const asynActionStart = elementName => ({
  type: ASYNC_ACTION_START,
  payload: { elementName }
});

export const asyncActionFinish = () => ({
  type: ASYNC_ACTION_FINISH
});

export const asyncActionError = () => ({
  type: ASYNC_ACTION_ERROR
});