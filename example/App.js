import React, { useState } from 'react';

import useAxios from '../src';

export default function App() {
  const [gender, setGender] = useState('');
  const {
    response,
    loading,
    error,
    query,
  } = useAxios({
    url: `https://randomuser.me/api/${gender === 'unknow' ? 'unknow' : ''}`,
    method: 'GET',
    options: {
      params: { gender },
    },
    trigger: gender,
    filter: () => !!gender,
  });

  const data = (response || {}).data;

  const options = [
    { gender: 'female', title: 'Female' },
    { gender: 'male', title: 'Male' },
    { gender: 'unknow', title: 'Unknow' },
  ];
  return (
    <div>
      {options.map(item => (
        <div key={item.gender}>
          <input
            type="radio"
            id={item.gender}
            value={item.gender}
            checked={gender === item.gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor={item.gender}>{item.title}</label>
        </div>
      ))}
      <button onClick={query}>Refresh</button>
      <div>
      {loading ? 'loading...' : (
        error ? error.message || 'error' : (
          !data ? 'No Data' : (
            <textarea cols="100" rows="30">{JSON.stringify(data, '', 2)}</textarea>
          )
        )
      )}
      </div>
    </div>
  );
}
