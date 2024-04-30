
import classNames from 'classnames';

// layouts
import { PageSection } from '../pageSection/PageSection';

// componenets
import { SectionHeader } from '../../_components/sectionHeader/SectionHeader';

// styles
import styles from './SplitSections.module.scss';

interface SplitSectionProps {
  title: string;
  panelA: React.ReactNode;
  panelB: React.ReactNode;
  classNameSplitSections?: string;
  classNamePanelA?: string;
  classNamePanelB?: string;
}

export const SplitSection = ({
  title,
  panelA,
  panelB,
  classNameSplitSections,
  classNamePanelA,
  classNamePanelB
}: SplitSectionProps) => {
  return (
    <PageSection>
      <SectionHeader
        title={title}
      />
      <div className={classNames(styles.splitSections, classNameSplitSections)}>
        <div
          className={classNames(styles.panelA, classNamePanelA)}
        >
          {panelA}
        </div>
        <div
          className={classNames(styles.panelB, classNamePanelB)}
        >
          {panelB}
        </div>
      </div>
    </PageSection>
  )
}
