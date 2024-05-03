export interface BenefitType {
  title: string;
  description: string;
}

export interface PromotionType {
  title: string;
  info: {
    title: {
      desktop: string;
      mobile: string;
    };
    benefits: BenefitType[];
  },
  image: {
    alt: string;
  }
}