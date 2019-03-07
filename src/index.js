/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Params
 * @param  {string} url - The request URL
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - (optional) The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - (optional) The conditions for AUTO RUN, refer the concepts of [conditions](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) of useEffect, but ONLY support string and plain object. If the value is a constant, it'll trigger ONLY once at the begining
 * @param  {function} [filter=() => true] - (optional) Trigger filter function, only AUTO RUN when get `true`, leave it unset unless you don't want AUTU RUN by all updates of trigger
 * @param  {function} [customHandler=(error, response) => {}] - (optional) Custom handler callback, NOTE: `error` and `response` will be set to `null` before request
 */

/**
 * Returns
 * @param  {object} response - The response of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} query - MANUAL RUN trigger function for making a request manually
 */

export default ({
  url,
  method = 'get',
  options = {},
  trigger,
  filter = () => true,
  customHandler,
} = {}) => {
  const [results, setResults] = useState({ response: null, error: null, loading: false });
  const [innerTrigger, setInnerTrigger] = useState(0);

  let outerTrigger = trigger;
  try {
    outerTrigger = JSON.stringify(trigger);
  } catch (err) {
    //
  }

  useEffect(() => {
    if (!url || !filter()) return;
    // ONLY trigger by query
    if (typeof outerTrigger === 'undefined' && !innerTrigger) return;
    if (customHandler) {
      customHandler(null, null);
    }
    setResults({ response: null, error: null, loading: true });
    axios({
      url,
      method,
      ...options,
    }).then((response) => {
      if (customHandler) {
        response = customHandler(null, response);
      }
      setResults({ response, error: null, loading: false });
    }).catch((error) => {
      if (customHandler) {
        error = customHandler(error, null);
      }
      setResults({ response: null, error, loading: false });
    });
  }, [innerTrigger, outerTrigger]);

  return {
    ...results,
    query: () => { setInnerTrigger(+new Date()); },
  };
};
