import type { ReactElement } from "react";

export interface ButtonProps {
    variant : 'primary' | 'secondary';
    size : 'sm' | 'md' | 'lg';
    text : string;
    startIcon? : ReactElement;
    endIcon? : ReactElement;
    onClick? : () => void;
}

const variantStyles={
    primary : "bg-purple-600 text-white",
    secondary : "bg-purple-300 text-black"
}

const sizeStyles = {
    sm : "py-1 px-2",
    md : "py-2 px-4",  
    lg : "py-4 px-6"
}

const defaultStyles = "rounded-md flex"

export const Button = (props : ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        {props.startIcon ? <div  className="pr-2">{props.startIcon}</div> : null} {props.text}
        </button>
}

<Button variant="primary" size="md" text={"sdfsdf"} onClick={() => alert('Button Clicked!')} />