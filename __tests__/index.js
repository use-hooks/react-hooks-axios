/* eslint-disable react/jsx-filename-extension */
import '@babel/polyfill';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { render, waitForElement } from 'react-testing-library';
import useAxios, { axios } from '../src/index';

it('should be a function', () => {
  expect(useAxios).toEqual(expect.any(Function));
});

// Known issue: https://github.com/kentcdodds/react-testing-library/issues/281
it('use custom instance', async () => {
  const mock = new MockAdapter(axios);
  mock.onGet('/test').reply(200, {
    foo: 'bar',
  });

  function App() {
    const { response } = useAxios({
      axios: axios.create({}),
      url: '/test',
      trigger: '', // Auto trigger once
    });
    return <div>{((response || {}).data || {}).foo}</div>;
  }
  const { getByText } = render(<App />);
  await waitForElement(() => getByText(/bar/));
});
