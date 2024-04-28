'use client'

import classNames from "classnames";

import { useFormStatus } from "react-dom";

// styles
import styles from './SubmitFormButton.module.scss';

// TODO
// IS THIS WORKING!!!

interface SubmitFormButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
}


// https://www.youtube.com/watch?v=dDpZfOQBMaU
export const SubmitFormButton = (
  {
    className,
    text,
    disabled
  }: SubmitFormButtonProps
) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        classNames(
          pending || disabled ? styles.disabledButton : undefined,
          styles.button,
          className
        )
      }
      type="submit"
      aria-disabled={pending}
      disabled={disabled || pending}
    >
      {text ? text : 'Submit'}
    </button>
  )
}