import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Params
 * @param  {string} url - The request URL
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - Trigger conditions for AUTO RUN
 * @param  {function} [filter=() => true] - ddd
 * @param  {function} [customHandler=() => {}] - Custom handler
 */

/**
 * Returns
 * @param  {object} response - The response of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} query - MANUAL RUN trigger function
 */

export default ({
  url,
  method = 'get',
  options = {},
  trigger,
  filter = () => true,
  customHandler = () => {},
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
    customHandler(null, null);
    setResults({ response: null, error: null, loading: true });
    axios({
      url,
      method,
      ...options,
    }).then((response) => {
      customHandler(null, response);
      setResults({ response, error: null, loading: false });
    }).catch((error) => {
      customHandler(error, null);
      setResults({ response: null, error, loading: false });
    });
  }, [innerTrigger, outerTrigger]);

  return {
    ...results,
    query: () => { setInnerTrigger(+new Date()); },
  };
};
