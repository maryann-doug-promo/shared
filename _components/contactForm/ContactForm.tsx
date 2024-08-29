"use client"

import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

// types
import { InputType, TextAreaType } from '@/shared/types/formFields';

// content
import content from '../../content/contactForm.json';

// styles
import styles from './ContactForm.module.scss';
import { contactAction } from '@/shared/_actions/contact';
import { SubmitFormButton } from '../submitFormButton/SubmitFormButton';

interface ContactStateType {
  message: string[] | null;
  success: boolean | null;
}

const initialState: ContactStateType = {
  message: null,
  success: false
};

interface InputFieldProps {
  page: string,
  input: InputType
}

const InputField = ({ page, input }: InputFieldProps) => {

  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === '') {
      setError('');
      return;
    }

    const isValid = event.target.validity.valid;
    const errorMessage = isValid ? '' : input.error_message ?? event.target.validationMessage;
    setError(errorMessage);
  };

  return (
    <div
      className={styles.fieldContainer}
      key={`${page}_contactForm_input_${input.id}`}
    >
      <label
        className={styles.label}
        htmlFor={input.name}
      >
        {`${input.label}:`}
      </label>
      <input
        className={styles.input}
        name={input.name}
        type={input.type}
        required={input.required}
        minLength={input.minLength}
        maxLength={input.maxLength}
        placeholder={input.placeholder}
        pattern={input.pattern ?? undefined}
        onChange={input.pattern ? handleChange : undefined}
      />
      {error && <span className={styles.errorSpan}>{error}</span>}
    </div>
  )
}

interface ContactFormProps {
  page: string;
  classNameFields?: string;
  classNameSubmitButton?: string;
}

export const ContactForm = ({ page, classNameFields, classNameSubmitButton }: ContactFormProps) => {

  const [contactState, contact] = useFormState(contactAction, initialState);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleFormReset = () => {
    formRef.current?.reset();
  }

  useEffect(() => {

    if (contactState.success == true) {
      handleFormReset();
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    } else {
      setShowMessage(true);
    }

  }, [contactState]);

  return (
    <form
      className={styles.contactForm}
      action={contact}
      ref={formRef}
    >
      <div className={classNames(styles.contactFormFields, classNameFields)}>
        {content.inputs.map((input: InputType) => {
          return (
            <InputField
              key={`${page}_contactForm_input_${input.id}`}
              page={page}
              input={input}
            />
          )
        })}
        {content.textareas.map((textarea: TextAreaType) => {
          return (
            <div
              key={`${page}_contactForm_input_${textarea.id}`}
              className={styles.fieldContainer}
            >
              <label
                className={styles.label}
                htmlFor={textarea.name}
              >
                {`${textarea.label}:`}
              </label>
              <textarea
                className={styles.textarea}
                minLength={textarea.minLength}
                maxLength={textarea.maxLength}
                placeholder={textarea.placeholder}
                name={textarea.name}
                rows={textarea.rows}
                required={textarea.required}
              />
            </div>
          )
        })}
        {/* tobsandmaps */}
        <input className={styles.personal} type="text" name="age" defaultValue={process.env.HONEY_POT_AGE} />
        <input className={styles.personal} type="text" name="height" defaultValue={process.env.HONEY_POT_HEIGHT} />
        <input className={styles.personal} type="text" name="shoe_size" defaultValue={process.env.HONEY_POT_SHOE_SIZE} />
        <SubmitFormButton
          className={classNameSubmitButton}
          text={content.submitButton.text}
        />
      </div>
      {((contactState.message && contactState.message.length !== 0) && showMessage) && (
        contactState.message.map((piece: string, index: number) => {
          return (
            <h3
              key={`${page}_contactState_message_${index}`}
              className={contactState.success ? styles.successMessage : styles.errorSpan}
            >
              {piece}
            </h3>
          )
        })
      )}
    </form>
  )
}
