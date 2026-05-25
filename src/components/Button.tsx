import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, disabled, className = "", ...props }) => (
    <button
        type="submit"
        disabled={disabled}
        className={`w-full px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full bg-gradient-to-b from-[#9CA3FF] to-[#666EE8] text-white font-medium shadow-md transition-transform text-sm sm:text-base md:text-lg lg:text-xl outline-none hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        {...props}
    >
        {children}
    </button>
);

export default Button;