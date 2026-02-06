
export enum Page {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  REQUESTS = 'REQUESTS',
  MEMORIES = 'MEMORIES',
  API_KEYS = 'API_KEYS',
  BILLING = 'BILLING',
  ADVANCED_SETTINGS = 'ADVANCED_SETTINGS',
  IMPORT_DATA = 'IMPORT_DATA',
  DOCS = 'DOCS'
}

export interface NavItem {
  id: Page;
  label: string;
  icon: any;
}
