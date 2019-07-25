import * as types from "./actionTypes";

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}

export function apiCallSuccess() {
  return { type: types.END_API_CALL };
}