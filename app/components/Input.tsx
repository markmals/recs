import { cva } from "cva";
import type { InputHTMLAttributes } from "react";
import type { ClassProps } from "~/lib/props";

const input = cva({
    base: "rounded-lg border-2 border-black bg-white p-2 font-serif-text shadow-hard focus:outline-none dark:bg-[#232326] dark:text-white",
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, ClassProps {}

export function Input({ className, ...props }: InputProps) {
    return <input className={input({ className })} {...props} />;
}
