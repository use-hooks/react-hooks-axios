export const initialResponse = { response: null, error: null, loading: false };

export const actions = {
  init: 'init',
  success: 'success',
  fail: 'fail',
};

export function responseReducer(state, action) {
  switch (action.type) {
    case actions.init:
      return { response: null, error: null, loading: true };
    case actions.success:
      return { response: action.payload, error: null, loading: false };
    case actions.fail:
      return { response: null, error: action.payload, loading: false };
    default:
      return initialResponse;
  }
}
