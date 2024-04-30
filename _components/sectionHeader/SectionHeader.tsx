
import classNames from 'classnames';

// styles
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  title: string;
  subTitle?: string;
  className?: string;
  classNameTitle?: string;
}

export const SectionHeader = ({ title, subTitle, className, classNameTitle }: SectionHeaderProps) => {
  return (
    <div className={classNames(styles.sectionHeader, className)}>
      <div className={styles.titleContainer}>
        <div className={styles.line}></div>
        <h2 className={classNames(styles.title, classNameTitle)}>{title}</h2>
        <div className={styles.line}></div>
      </div>
      {subTitle && (
        <h4 className={styles.subTitle}>{subTitle}</h4>
      )}
    </div>
  )
}
