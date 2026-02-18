import toast, { Toaster } from "react-hot-toast";

const baseStyle = {
  maxWidth: "500px",
  fontSize: "var(--text-md)",
  color: "var(--color-black-dark)",
  padding: "12px 20px",
  borderRadius: "8px",
  background: "var(--color-white)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
};

export const showToast = {
  success: (message: string) =>
    toast.success(`${message} 🎉`, {
      duration: 2000,
      icon: null,
    }),
  error: (message: string) =>
    toast.error(`${message} 🚨`, {
      duration: 5000,
      icon: null,
    }),
};

export const ToastProvider = () => {
  return (
    <Toaster
      containerStyle={{
        zIndex: 9999,
      }}
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: baseStyle,
      }}
    />
  );
};
