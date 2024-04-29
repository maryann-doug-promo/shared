"use server"

import classNames from 'classnames';

// layouts
import { Card } from '@/shared/_layouts/card/Card';

// styles
import styles from './GeneralCard.module.scss';

interface GeneralCardProps {
  cardClassName?: string;
  description: string;
  title: string;
}

export const GeneralCard = ({ title, description, cardClassName }: GeneralCardProps) => {
  return (
    <Card className={classNames(styles.generalCard, "cardBorders", cardClassName)}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  )
}
