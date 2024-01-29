"use client";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";

const Home: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("/images/still-waiting.gif");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const minLength = 10;
  useEffect(() => {
    return () => {
      if (password.length >= minLength && timer) {
        clearTimeout(timer);
      }
    };
  }, [password , timer , minLength]);

  const handleInputChange = () => {
    if (password.length > minLength) {
      setImageSrc("/images/correct.gif");
    } else {
      setImageSrc("/images/typing-type.gif");
    }
  };
  const handleCheckbox = () => {
    setImageSrc("/images/sneaky.gif");
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePasswordLength = (password: string): string => {
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (password.length >= minLength) {
      return `Your password is fine now`;
    } else {
      return "";
    }
  };

  const validationError = validatePasswordLength(password);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (password.length <= minLength) {
      setTimer(
        setTimeout(() => {
          setImageSrc("/images/still-waiting.gif");
        }, 1000)
      );
    }
    handleInputChange();
  };

  return (
    <main className="flex justify-center items-center h-[100vh] flex-col bg-violet-950 gap-[3rem] md:gap-4">
      <div className="w-[15rem] h-[13rem] overflow-hidden md:w-[20rem] md:h-[20rem] flex justify-center items-center">
        <Image
          className="w-[100%]"
          src={imageSrc}
          width={300}
          height={300}
          alt="gif"
        />
      </div>
      <div className="flex flex-col w-[80%] gap-5 md:w-[30%]">
        <div className=" flex items-end justify-end flex-col">
          <label className="text-[12px] text-white" htmlFor="checkbox">
            Show password
          </label>
          <input
            onChange={handleCheckbox}
            id="checkbox"
            name="checkbox"
            className="outline-none border-none flex justify-end"
            type="checkbox"
          />
        </div>
        <input
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border-0 outline-none"
          type={showPassword ? "text" : "password"}
          value={password}
          ref={inputRef}
        />
        <div
          className={
            password.length < 10 ? "text-red-500 text-sm pt-1" : "text-white"
          }
        >
          {password && validationError}
        </div>
        <button
          className="flex justify-start bg-red-950 text-white w-fit py-1 px-5 rounded-md"
          type="button"
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default Home;
