import { useState, useEffect } from 'react';
import axios from 'axios';

export default ({
  url,
  method = 'get',
  // https://github.com/axios/axios#request-config
  options,
  // text / json
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
