/* eslint-disable max-len */
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import { initialResponse, responseReducer, actions } from './reducers';

/**
 * Params
 * @param  {string} url - The request URL
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - (optional) The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - (optional) The conditions for AUTO RUN, refer the concepts of [conditions](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) of useEffect, but ONLY support string and plain object. If the value is a constant, it'll trigger ONLY once at the begining
 * @param  {function} [forceDispatchEffect=() => true] - (optional) Trigger filter function, only AUTO RUN when get `true`, leave it unset unless you don't want AUTU RUN by all updates of trigger
 * @param  {function} [customHandler=(error, response) => {}] - (optional) Custom handler callback, NOTE: `error` and `response` will be set to `null` before request
 */

/**
 * Returns
 * @param  {object} response - The response of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} reFetch - MANUAL RUN trigger function for making a request manually
 */

const { CancelToken } = axios;

export default ({
  url,
  method = 'get',
  options = {},
  trigger,
  // @deprecated
  filter,
  forceDispatchEffect,
  customHandler,
} = {}) => {
  const [results, dispatch] = useReducer(responseReducer, initialResponse);
  const [innerTrigger, setInnerTrigger] = useState(0);

  let outerTrigger = trigger;
  try {
    outerTrigger = JSON.stringify(trigger);
  } catch (err) {
    //
  }

  const dispatchEffect = forceDispatchEffect || filter || (() => true);

  const handler = (error, response) => {
    if (customHandler) {
      customHandler(error, response);
    }
  };

  useEffect(() => {
    if (!url || !dispatchEffect()) return;
    // ONLY trigger by query
    if (typeof outerTrigger === 'undefined' && !innerTrigger) return;

    handler(null, null);
    dispatch({ type: actions.init });

    const source = CancelToken.source();

    axios({
      url,
      method,
      ...options,
      cancelToken: source.token,
    })
      .then((response) => {
        handler(null, response);
        dispatch({ type: actions.success, payload: response });
      })
      .catch((error) => {
        handler(error, null);
        if (!axios.isCancel(error)) {
          dispatch({ type: actions.fail, payload: error });
        }
      });

    return () => {
      source.cancel();
    };
  }, [innerTrigger, outerTrigger]);

  return {
    ...results,
    // @deprecated
    query: () => {
      setInnerTrigger(+new Date());
    },
    reFetch: () => {
      setInnerTrigger(+new Date());
    },
  };
};
