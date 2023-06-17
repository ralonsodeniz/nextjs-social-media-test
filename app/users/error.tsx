'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface IError {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: IError) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  const router = useRouter();

  return (
    <main>
      {' '}
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
};

export default Error;
