export const initialResponse = { response: null, error: null, loading: false };

export function responseReducer(state, action) {
  switch (action.type) {
    case 'init':
      return { response: null, error: null, loading: true };
    case 'success':
      return { response: action.payload, error: null, loading: false };
    case 'fail':
      return { response: null, error: action.payload, loading: false };
    default:
      return initialResponse;
  }
}
