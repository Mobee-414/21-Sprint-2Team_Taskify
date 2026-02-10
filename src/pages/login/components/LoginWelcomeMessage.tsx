'use client'
import { useEffect, useState } from 'react';

const MESSAGE: string[] = [
    "오늘도 만나서 반가워요!",
    "환영합니다!",
    "좋은 하루 되세요!",
    "안녕하세요!",
  ];

const LoginWelcomeMessage = () => {
  const [message, setMessage] = useState(MESSAGE[0]);

    useEffect(() => {
      const updateMessage = () => {
        const index = Math.floor(Date.now() / 10000) % MESSAGE.length;
        setMessage(MESSAGE[index]);
      };

    updateMessage();

    const interval = setInterval(updateMessage, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="flex flex-col items-center gap-2">

        <h1 className="text-center 
            text-xl font-medium text-black-medium
          ">
          {message}
        </h1>
      </div>
    );
  };
  
  export default LoginWelcomeMessage;