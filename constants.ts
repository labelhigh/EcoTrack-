import type { Project, Report, MarketplaceItem, AppEvent } from './types';
import { ProjectStatus, ReportStatus, ProductCategory, ProductType } from './types';

export const DASHBOARD_STATS = {
  projectsSummary: [
    { name: ProjectStatus.Active, value: 400 },
    { name: ProjectStatus.Developing, value: 300 },
    { name: ProjectStatus.Validating, value: 300 },
    { name: ProjectStatus.Closed, value: 200 },
  ],
  emissionReduction: [
    { name: '2020', reduction: 4000 },
    { name: '2021', reduction: 3000 },
    { name: '2022', reduction: 2000 },
    { name: '2023', reduction: 2780 },
    { name: '2024', reduction: 1890, cumulative: 5200 },
  ],
  events: [
    { id: 1, title: '提交第二季度排放報告', due: '2 天後', overdue: false, reminder: null },
    { id: 2, title: '驗證 "Rimba Raya" 專案文件', due: '5 天後', overdue: false, reminder: null },
    { id: 3, title: '批准台灣廠區的 I-REC 採購', due: '1 天前', overdue: true, reminder: null },
    { id: 4, title: '年度 ESG 策略會議', due: '1 週後', overdue: false, reminder: null },
  ] as AppEvent[]
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Rimba Raya 生物多樣性保護區',
    coverImage: 'https://picsum.photos/seed/rimba/800/400',
    status: ProjectStatus.Active,
    registryId: 'VCS-981',
    methodology: 'REDD+',
    location: '婆羅洲, 印尼',
    description: 'Rimba Raya 生物多樣性保護區專案是一個 REDD+ 專案，旨在透過保護印尼婆羅洲 64,500 公頃的熱帶泥炭沼澤森林來減少排放。',
    creditingPeriods: ['2020-01-01 至 2029-12-31'],
    coords: { lat: -2.78, lng: 111.45 },
  },
  {
    id: 'p2',
    name: 'Katingan Mentaya 泥炭地復育',
    coverImage: 'https://picsum.photos/seed/katingan/800/400',
    status: ProjectStatus.Validating,
    registryId: 'VCS-1477',
    methodology: 'VM0007',
    location: '中加里曼丹, 印尼',
    description: '一個保護和恢復 157,800 公頃泥炭地生態系統的專案，對碳儲存和生物多樣性至關重要。',
    creditingPeriods: ['2024-01-01 至 2033-12-31'],
    coords: { lat: -2.5, lng: 113.5 },
  },
   {
    id: 'p3',
    name: '古吉拉特邦風力發電專案',
    coverImage: 'https://picsum.photos/seed/gujarat/800/400',
    status: ProjectStatus.Developing,
    registryId: 'CDM-5678',
    methodology: 'ACM0002',
    location: '古吉拉特邦, 印度',
    description: '一個大型風力發電專案，產生清潔電力，取代基於化石燃料的發電方式。',
    creditingPeriods: ['2023-06-01 至 2030-05-31'],
    coords: { lat: 22.25, lng: 71.19 },
  },
  {
    id: 'p4',
    name: '烏干達鑽井修復專案',
    coverImage: 'https://picsum.photos/seed/uganda/800/400',
    status: ProjectStatus.Active,
    registryId: 'GS-2345',
    methodology: 'GS TPDDTEC',
    location: '多地, 烏干達',
    description: '透過修復鑽井提供安全的清潔水源，從而無需使用木柴燃料燒水。',
    creditingPeriods: ['2019-03-01 至 2026-02-28'],
    coords: { lat: 1.37, lng: 32.29 },
  },
   {
    id: 'p5',
    name: '瓜納雷森林種植園',
    coverImage: 'https://picsum.photos/seed/guanare/800/400',
    status: ProjectStatus.Closed,
    registryId: 'VCS-245',
    methodology: 'AR-ACM0001',
    location: '波圖格薩州, 委羅瑞拉',
    description: '一個將退化的草原轉變為可持續森林的再造林專案，封存碳並支持當地社區。',
    creditingPeriods: ['2008-01-01 至 2017-12-31'],
    coords: { lat: 9.04, lng: -69.75 },
  }
];

export const REPORTS: Report[] = [
  { id: 'r1', name: '2024年Q2排放報告', type: '排放數據', status: ReportStatus.Approved, associatedProject: '所有廠區', lastModified: '2024-07-15' },
  { id: 'r2', name: '2023年永續發展年度報告', type: 'ESG 揭露', status: ReportStatus.Approved, associatedProject: '公司整體', lastModified: '2024-03-30' },
  { id: 'r3', name: 'Rimba Raya 專案驗證', type: '專案報告', status: ReportStatus.InReview, associatedProject: 'Rimba Raya 生物多樣性保護區', lastModified: '2024-08-01' },
  { id: 'r4', name: '2024年Q3排放報告草稿', type: '排放數據', status: ReportStatus.Draft, associatedProject: '所有廠區', lastModified: '2024-08-05' },
  { id: 'r5', name: '24財年 I-REC 採購摘要', type: '交易報告', status: ReportStatus.Draft, associatedProject: 'N/A', lastModified: '2024-07-28' },
];

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'm1',
    name: '台灣太陽能 I-RECs',
    image: 'https://picsum.photos/seed/taiwansolar/600/400',
    type: ProductType.IREC,
    category: ProductCategory.RenewableEnergy,
    location: '台灣, 亞洲',
    pricePerTon: 3.50,
    availableStock: 50000,
    minPurchase: 100,
    gallery: ['https://picsum.photos/seed/taiwansolar1/800/600', 'https://picsum.photos/seed/taiwansolar2/800/600'],
    priceHistory: [
      {date: '1月', price: 2.8}, {date: '2月', price: 3.0}, {date: '3月', price: 3.1},
      {date: '4月', price: 3.3}, {date: '5月', price: 3.2}, {date: '6月', price: 3.5}
    ],
    recentTransactions: [
      {date: '2024-08-01', quantity: 500, price: 3.45},
      {date: '2024-07-25', quantity: 1000, price: 3.40},
    ],
    documents: [{name: '驗證報告', url: '#'}, {name: 'I-REC 憑證範本', url: '#'}],
  },
  {
    id: 'm2',
    name: '巴西風力發電 I-RECs',
    image: 'https://picsum.photos/seed/brazilwind/600/400',
    type: ProductType.IREC,
    category: ProductCategory.RenewableEnergy,
    location: '巴西, 南美洲',
    pricePerTon: 2.80,
    availableStock: 120000,
    minPurchase: 500,
    gallery: ['https://picsum.photos/seed/brazilwind1/800/600', 'https://picsum.photos/seed/brazilwind2/800/600'],
    priceHistory: [
      {date: '1月', price: 2.5}, {date: '2月', price: 2.6}, {date: '3月', price: 2.5},
      {date: '4月', price: 2.7}, {date: '5月', price: 2.8}, {date: '6月', price: 2.8}
    ],
    recentTransactions: [
      {date: '2024-08-03', quantity: 10000, price: 2.80},
      {date: '2024-07-15', quantity: 5000, price: 2.75},
    ],
    documents: [{name: '專案說明文件', url: '#'}, {name: 'I-REC 憑證範本', url: '#'}],
  },
  {
    id: 'm3',
    name: 'Rimba Raya REDD+ 碳權',
    image: 'https://picsum.photos/seed/rimbacredit/600/400',
    type: ProductType.CarbonCredit,
    category: ProductCategory.Forestry,
    location: '印尼, 亞洲',
    pricePerTon: 15.25,
    availableStock: 25000,
    minPurchase: 50,
    gallery: ['https://picsum.photos/seed/rimbacredit1/800/600', 'https://picsum.photos/seed/rimbacredit2/800/600'],
    priceHistory: [
      {date: '1月', price: 12.5}, {date: '2月', price: 13.0}, {date: '3月', price: 14.1},
      {date: '4月', price: 14.8}, {date: '5月', price: 15.0}, {date: '6月', price: 15.25}
    ],
    recentTransactions: [
      {date: '2024-07-30', quantity: 200, price: 15.20},
      {date: '2024-07-20', quantity: 150, price: 15.10},
    ],
    documents: [{name: 'VCS 驗證報告', url: '#'}, {name: '專案監測報告', url: '#'}],
  },
  {
    id: 'm4',
    name: '烏干達潔淨水源碳權',
    image: 'https://picsum.photos/seed/ugandacredit/600/400',
    type: ProductType.CarbonCredit,
    category: ProductCategory.WasteManagement,
    location: '烏干達, 非洲',
    pricePerTon: 12.00,
    availableStock: 8000,
    minPurchase: 20,
    gallery: ['https://picsum.photos/seed/ugandacredit1/800/600', 'https://picsum.photos/seed/ugandacredit2/800/600'],
    priceHistory: [
      {date: '1月', price: 11.5}, {date: '2月', price: 11.8}, {date: '3月', price: 11.9},
      {date: '4月', price: 12.0}, {date: '5月', price: 12.1}, {date: '6月', price: 12.0}
    ],
    recentTransactions: [
      {date: '2024-08-04', quantity: 100, price: 12.00},
      {date: '2024-07-18', quantity: 50, price: 12.05},
    ],
    documents: [{name: '黃金標準 PDD', url: '#'}, {name: '社區影響評估', url: '#'}],
  }
];