import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
}

export interface FooterData {
  cta_title_regular?: string;
  cta_title_highlight?: string;
  cta_description?: string;
  email?: string;
  phone?: string;
  follow_us_text?: string;
  socials?: FooterSocialItem[];
  button_text?: string;
  button_link?: string;
  logo: string;
  logo_text: string;
  logo_subtext: string;
  copyright: string;
  links: LinkType[];
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  title_highlight: string;
  description: string;
  cta_text: string;
  cta_link: string;
  image: string;
  image_alt: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  image: string;
  image_alt: string;
  badge: {
    icon: string;
    title: string;
    subtitle: string;
  };
}

export interface SocBannerData {
  image: string;
  image_alt: string;
}

export interface ServiceItem {
  id: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image?: string;
  image_alt?: string;
  link_text: string;
  link_href: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  wave_image: string;
  wave_alt: string;
  badge_text: string;
  items: ServiceItem[];
}

export interface ServiceBenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetailItem {
  slug: string;
  name: string;
  sidebar_icon: string;
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  image: string;
  image_alt: string;
  paragraphs: string[];
  benefits_eyebrow: string;
  benefits_title_regular: string;
  benefits_title_highlight: string;
  benefits_description: string;
  benefits: ServiceBenefitItem[];
}

export interface ServiceDetailSectionData {
  sidebar_title: string;
  services: ServiceDetailItem[];
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProcessSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  steps: ProcessStep[];
  variant?: 'timeline' | 'cards' | string;
}

export interface MissionVisionItem {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  image: string;
  image_alt: string;
}

export interface MissionVisionSectionData {
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  image: string;
  image_alt: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

export interface BlogQuoteData {
  quote: string;
  author?: string;
  image?: string;
}

export interface BlogDetailAuthor {
  name: string;
  avatar?: string;
  role?: string;
}

export interface BlogDetailPost {
  id: string;
  slug: string;
  category: string;
  title_regular: string;
  title_highlight: string;
  title_suffix?: string;
  author: BlogDetailAuthor;
  published_date: string;
  intro_paragraph: string;
  hero_image: string;
  hero_image_alt: string;
  body_paragraphs: string[];
  quote: BlogQuoteData;
  subheading_regular: string;
  subheading_highlight: string;
  subheading_paragraph: string;
  checklist_title_regular: string;
  checklist_title_highlight: string;
  checklist_items: string[];
  secondary_image: string;
  secondary_image_alt: string;
}

export interface BlogDetailSectionData {
  posts: BlogDetailPost[];
}

export interface BlogSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  posts: BlogPostItem[];
}

export interface CtaBannerData {
  title_regular: string;
  title_highlight: string;
  description: string;
  email: string;
  phone: string;
  follow_us_text: string;
  socials: FooterSocialItem[];
  button_text: string;
  button_link: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSectionData {
  background_image: string;
  background_alt: string;
  items: BreadcrumbItem[];
}

export interface ContactCardItem {
  id: string;
  title: string;
  description?: string;
  line1?: string;
  line2?: string;
  action_text: string;
  action_link: string;
  icon: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  email?: string;
  phone?: string;
  address?: string;
  cards?: ContactCardItem[];
  form?: {
    eyebrow: string;
    title_regular: string;
    title_highlight: string;
    description: string;
    fields: {
      name_placeholder: string;
      email_placeholder: string;
      phone_placeholder: string;
      subject_placeholder: string;
      message_placeholder: string;
    };
    button_text: string;
  };
  map?: {
    image?: string;
    embed_url?: string;
    office_title?: string;
    office_address_line1?: string;
    office_address_line2?: string;
  };
}

export interface FaqItem {
  id?: string;
  number?: string;
  question: string;
  answer: string;
}

export interface FaqSectionData {
  eyebrow?: string;
  title_regular?: string;
  title_highlight?: string;
  items: FaqItem[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  link_text: string;
  link_href: string;
  result?: string;
}

export interface PortfolioSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  items: PortfolioItem[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  watermark?: string;
  components: PageComponent[];
}

export interface NotFoundData {
  code: string;
  badge: string;
  title: string;
  description: string;
  back_home: {
    text: string;
    href: string;
  };
}

export interface QuoteFeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface QuoteFormField {
  label: string;
  placeholder: string;
  icon: string;
  options?: string[];
}

export interface GetAQuoteSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  feature_image: string;
  feature_image_alt: string;
  features: QuoteFeatureItem[];
  form: {
    title_regular: string;
    title_highlight: string;
    description: string;
    fields: {
      name: QuoteFormField;
      email: QuoteFormField;
      phone: QuoteFormField;
      company: QuoteFormField;
      service: QuoteFormField;
      requirements: QuoteFormField;
      country: QuoteFormField;
      industry: QuoteFormField;
      budget: QuoteFormField;
    };
    button_text: string;
    security_note: string;
  };
}

export interface SitePages {
  home: PageMeta;
  about: PageMeta;
  services: PageMeta;
  portfolio: PageMeta;
  blog: PageMeta;
  faq: PageMeta;
  contact: PageMeta;
  service_detail?: PageMeta;
  portfolio_detail?: PageMeta;
  blog_detail?: PageMeta;
  get_a_quote?: PageMeta;
  not_found: NotFoundData;
}

export interface SiteSections {
  breadcrumb: BreadcrumbSectionData;
  hero: HeroSectionData;
  about: AboutSectionData;
  soc_banner: SocBannerData;
  services: ServicesSectionData;
  service_detail?: ServiceDetailSectionData;
  portfolio_detail?: ServiceDetailSectionData;
  blog_detail?: BlogDetailSectionData;
  process: ProcessSectionData;
  about_process?: ProcessSectionData;
  mission_vision?: MissionVisionSectionData;
  blog: BlogSectionData;
  cta_banner: CtaBannerData;
  contact: ContactSectionData;
  faq: FaqSectionData;
  portfolio: PortfolioSectionData;
  get_a_quote?: GetAQuoteSectionData;
}

export interface TemplateComponents {
  pages: SitePages;
  sections: SiteSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    CyberSecurity: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const template = siteJson.categories.CyberSecurity.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
