
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";

// types
import { PromotionType, BenefitType } from '../../types/promotion';

// layouts
import { SplitSection } from '../../_layouts/splitSection/SplitSection';
import { UnorderedList } from "../../_layouts/unorderedList/UnorderedList";

// components

// styles
import styles from './Promotion.module.scss';

interface PromotionProps {
  page: string;
  content: PromotionType;
  promoPic: StaticImageData
}

export const Promotion = ({ page, content, promoPic }: PromotionProps) => {
  const thisComponent = "promotion";
  return (
    <SplitSection
      title={content.title}
      panelA={
        <>
          {/* Note that below the title of the section changes depending on mobile or desktop */}
          <h3 className={classNames(styles.infoHeader, styles.desktop)}>{content.info.title.desktop}</h3>
          <h3 className={classNames(styles.infoHeader, styles.mobile)}>{content.info.title.mobile}</h3>
          <UnorderedList
            page={page}
            category={thisComponent}
            items={
              content.info.benefits.map((benefit: BenefitType, index: number) => {
                return (
                  <div
                    key={`${thisComponent}_description_${index}`}
                    className={styles.benefit}
                  >
                    <span className={styles.benefitTitle}>{`${benefit.title}:`}</span>
                    <span className={styles.benefitDescription}>{benefit.description}</span>
                  </div>
                )
              })
            }
          />
        </>
      }
      panelB={(
        <Image
          src={promoPic}
          alt={content.image.alt}
          className={styles.image}
        />
      )}
      classNameSectionHeader={styles.sectionHeader}
      classNamePanelA={styles.panelA}
      classNamePanelB={styles.panelB}
    />
  )
}
