import cssModules from "./SignUpForm.module.scss";
import Input, {InputState} from "@/components/Input/Input";
import {Controller, useForm} from "react-hook-form";
import Button from "@/components/Button/Button";
import classNames from "classnames";
import {useState} from "react";

enum PasswordValidationRequirements {
    MinLengthNoSpaces = "MinLengthNoSpaces",
    MaxLength = "MaxLength",
    OneUppercase = "OneUppercase",
    OneNumber = "OneNumber",
}

const validationMessages: Record<PasswordValidationRequirements, string> = {
    [PasswordValidationRequirements.MinLengthNoSpaces]: '8 characters or more (no spaces)',
    [PasswordValidationRequirements.MaxLength]: 'Max 64 characters',
    [PasswordValidationRequirements.OneUppercase]: 'Uppercase and lowercase letters',
    [PasswordValidationRequirements.OneNumber]: 'At least one digit',
}

const isEmail = (s: string) => {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(s);
}

const hasWhiteSpace = (s: string) => {
    return /\s/g.test(s);
}

const hasUppercaseAndLowercase = (s: string) => {
    return s.toUpperCase() !== s && s.toLowerCase() !== s;
}

const hasNumber = (s: string) => {
    return /\d/.test(s);
}

export default function SignUpForm() {
    const {control, getValues, getFieldState, formState, handleSubmit} = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [passwordErrors, setPasswordErrors] = useState<PasswordValidationRequirements[]>([]);
    const [passwordHidden, setPasswordHidden] = useState(true);

    const validatePassword = (s: string) => {
        const MAX_LENGTH = 64;
        const MIN_LENGTH = 8;
        const errors: Array<PasswordValidationRequirements> = [];
        if (s.length > MAX_LENGTH) {
            errors.push(PasswordValidationRequirements.MaxLength);
        }
        if (s.length < MIN_LENGTH || hasWhiteSpace(s)) {
            errors.push(PasswordValidationRequirements.MinLengthNoSpaces)
        }
        if (!hasUppercaseAndLowercase(s)) {
            errors.push(PasswordValidationRequirements.OneUppercase);
        }
        if (!hasNumber(s)) {
            errors.push(PasswordValidationRequirements.OneNumber);
        }
        setPasswordErrors(errors)
        if (errors.length === 0) {
            return undefined
        }
        return errors;
    }

    const onSubmit = (data: unknown) => {
        alert(`Success! Data in the form: ${JSON.stringify(data)}`)
    }

    return (
        <div className={cssModules.wrapper}>
            <h1 className={cssModules.title}>
                Sign Up
            </h1>
            <form className={cssModules.form} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        validate: (v) => {
                            if (!isEmail(v)) {
                                return 'Please enter a valid email';
                            }
                        }
                    }}
                    render={({field}) => {
                        let state: InputState = InputState.Default;
                        const fieldState = getFieldState('email');
                        if (fieldState.error) {
                            state = InputState.Error;
                        } else if (fieldState.isTouched && !fieldState.error) {
                            state = InputState.Success
                        }
                        return <Input
                            ref={field.ref}
                            placeholder="Enter your email"
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                            state={state}
                            type="text"
                            helper={formState.errors.email?.message && <div className={cssModules.invalidRule}>
                                {formState.errors.email?.message }
                            </div>}
                        />
                    }}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={{
                        validate: (v) => validatePassword(v),
                    }}
                    render={({field}) => {
                        let state: InputState = InputState.Default;
                        const fieldState = getFieldState('password');
                        if(fieldState.error) {
                            state = InputState.Error;
                        } else if(fieldState.isTouched && !fieldState.error) {
                            state = InputState.Success
                        }
                        return <Input
                            ref={field.ref}
                            onChange={(s) => {
                                field.onChange(s);
                                validatePassword(s.target.value);
                            }}
                            onBlur={field.onBlur}
                            state={state}
                            placeholder="Create your password"
                            togglePasswordMode={() => setPasswordHidden(p => !p)}
                            passwordHidden={passwordHidden}
                            value={field.value}
                            type="password"
                            helper={<div>
                                {Object.entries(validationMessages).map(([key, value]) => {
                                    const shouldValidate = fieldState.isDirty || fieldState.invalid;
                                    const ruleClass = classNames({
                                        [cssModules.ruleLine]: true,
                                        [cssModules.validRule]: shouldValidate && !passwordErrors.includes(key as PasswordValidationRequirements),
                                        [cssModules.invalidRule]: shouldValidate && passwordErrors.includes(key as PasswordValidationRequirements),
                                    })
                                    // we actually don't want to show max length validation, unless there are some issue with that
                                    if (key === PasswordValidationRequirements.MaxLength && !passwordErrors.includes(PasswordValidationRequirements.MaxLength)) {
                                        return null;
                                    }
                                    return <div className={ruleClass} key={key}>
                                        {value}
                                    </div>
                                })}
                            </div>}
                        />
                    }}
                />
                <Button title="Sign Up"/>
            </form>
        </div>
    )
}

