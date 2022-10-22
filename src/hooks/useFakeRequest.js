import { useState } from 'react';

const useFakeRequest = () => {
  const [requestLoading, setRequestLoading] = useState(false);

  const onFakeRequest = () => {
    setRequestLoading(true);

    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
        setRequestLoading(false);
      }, 2000)
    );
  };

  return { requestLoading, onFakeRequest };
};

export default useFakeRequest;
