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

export interface ContactSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  items: FaqItem[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  result: string;
  image: string;
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

export interface SitePages {
  home: PageMeta;
  about: PageMeta;
  services: PageMeta;
  portfolio: PageMeta;
  blog: PageMeta;
  faq: PageMeta;
  contact: PageMeta;
  not_found: NotFoundData;
}

export interface SiteSections {
  breadcrumb: BreadcrumbSectionData;
  hero: HeroSectionData;
  about: AboutSectionData;
  soc_banner: SocBannerData;
  services: ServicesSectionData;
  process: ProcessSectionData;
  blog: BlogSectionData;
  cta_banner: CtaBannerData;
  contact: ContactSectionData;
  faq: FaqSectionData;
  portfolio: PortfolioSectionData;
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
