export interface MenuItem {
  id: number;
  title: {
    en: string;
    ne: string;
  };
  path: string;
  children?: MenuItem[];
}

