"use server"

import classNames from 'classnames';

// layouts
import { PageSection } from '../pageSection/PageSection'

// components
import { SectionHeader } from '../../_components/sectionHeader/SectionHeader';

// styles
import styles from './CardsSection.module.scss';


interface CardsSectionProps {
  title: string;
  cards: React.ReactNode[];
  classNameCards?: string;
  classNameTitle?: string;
}

export const CardsSection = ({ title, cards, classNameCards, classNameTitle }: CardsSectionProps) => {

  // Don't build the section at all if there is nothing to show
  if (cards.length === 0) {
    return null;
  }

  return (
    <PageSection>
      <SectionHeader
        title={title}
        classNameTitle={classNameTitle}
      />
      <div className={classNames(styles.cards, classNameCards)}>
        {cards}
      </div>
    </PageSection>
  )
}
