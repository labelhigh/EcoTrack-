export type View = 'dashboard' | 'projects' | 'marketplace' | 'reporting' | 'inventory' | 'analytics' | 'settings';

export enum ProjectStatus {
  Developing = '開發中',
  Validating = '驗證中',
  Active = '已啟用',
  Closed = '已關閉',
}

export interface Project {
  id: string;
  name: string;
  coverImage: string;
  status: ProjectStatus;
  registryId: string;
  methodology: string;
  location: string;
  description: string;
  creditingPeriods: string[];
  coords: { lat: number; lng: number };
}

export enum ReportStatus {
    Draft = '草稿',
    InReview = '審核中',
    Approved = '已批准',
}

export interface Report {
    id: string;
    name: string;
    type: string;
    status: ReportStatus;
    associatedProject: string;
    lastModified: string;
}

export enum ProductCategory {
    Forestry = '林業',
    RenewableEnergy = '再生能源',
    WasteManagement = '廢棄物管理',
    Industrial = '工業',
}

export enum ProductType {
    CarbonCredit = '碳權',
    IREC = 'I-RECs',
}

export interface MarketplaceItem {
  id: string;
  name: string;
  image: string;
  type: ProductType;
  category: ProductCategory;
  location: string;
  pricePerTon: number;
  availableStock: number;
  minPurchase: number;
  gallery: string[];
  priceHistory: { date: string; price: number }[];
  recentTransactions: { date: string; quantity: number; price: number }[];
  documents: { name: string; url: string }[];
}

export interface AppEvent {
  id: number;
  title: string;
  due: string;
  overdue: boolean;
  reminder?: Date | null;
}
