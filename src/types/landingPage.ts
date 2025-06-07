
export interface LandingPageConfig {
  status: 'draft' | 'published';
  publishedDate?: string;
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundImage: string;
    accentColor: string;
  };
  about: {
    title: string;
    description: string;
    gallery: string[];
  };
  benefits: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
  plans: {
    show: boolean;
  };
  featuredClasses: {
    show: boolean;
    classes: Array<{
      id: string;
      name: string;
      description: string;
      image: string;
    }>;
  };
  contact: {
    showMap: boolean;
    address: string;
    phone: string;
    email: string;
  };
}

export interface IconOption {
  value: string;
  label: string;
  icon: React.ComponentType<any>;
}
