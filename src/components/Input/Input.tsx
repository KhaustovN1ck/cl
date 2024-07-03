import classNames from 'classnames';
import cssModules from './Input.module.scss';
import React from "react";
import EyeHidden from "@/components/icons/EyeHidden";
import EyeShown from "@/components/icons/EyeShown";

export enum InputState {
    Default = 'default',
    Success = 'success',
    Error = 'error',
}

type Props = {
    placeholder?: string;
    value?: string;
    type: "password" | "text";
    togglePasswordMode?: () => void;
    state?: InputState;
    onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
    onBlur?(e: React.FocusEvent<HTMLInputElement>): void;
    ref: React.RefObject<HTMLInputElement>;
    helper?: React.ReactNode;
    passwordHidden?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>((
    {
        state = InputState.Default,
        type,
        value,
        onChange,
        onBlur,
        passwordHidden,
        helper,
        togglePasswordMode,
        placeholder
    }, ref) => {
    const classes = classNames({
        [cssModules.wrapper]: true,
        [cssModules.default]: state === InputState.Default,
        [cssModules.error]: state === InputState.Error,
        [cssModules.success]: state === InputState.Success,
    })
    return <div className={classes}>
        <input
            ref={ref}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={cssModules.input}
            type={type === 'password' && !passwordHidden ? 'text' : type}
            placeholder={placeholder}
        />
        {type === 'password' && <div className={cssModules.icon} onClick={togglePasswordMode}>
            {passwordHidden ? <EyeShown /> : <EyeHidden/>}
        </div>}
        {helper && <div className={cssModules.helper}>
            {helper}
        </div>}
    </div>
})

export default Input;
