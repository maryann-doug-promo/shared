"use server"

import classNames from 'classnames';

// styles
import styles from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <article className={classNames(styles.card, className)}>
      {children}
    </article>
  )
}
