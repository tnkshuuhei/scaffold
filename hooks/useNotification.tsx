import React from "react";
import { toast } from "react-toastify";

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const showSuccessToast = (url: string, message?: string) => {
  toast.success(displayLink(url, message), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const showDefaultToast = () => {
  toast.info("Sending Transaction...", {
    position: "top-right",
    autoClose: 7500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
const displayLink = (url: string, message?: string) => {
  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        {message ? message : "Success! Click here for your transaction!"}
      </a>
    </div>
  );
};
