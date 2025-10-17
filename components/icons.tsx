import React from 'react';

// Common props for icons
type IconProps = React.SVGProps<SVGSVGElement>;

export const SearchIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6 -6" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v1a3 3 0 0 0 6 0v-1" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6l6 -6" />
  </svg>
);

export const MapIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4l0 13" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7l0 13" />
  </svg>
);

export const XCircleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 10l4 4m0 -4l-4 4" />
    </svg>
);

export const FilterIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
  </svg>
);

export const ListIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 11l9 -9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 4h5v5" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" />
  </svg>
);

export const CalculatorIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-16a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8v2h-8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14h2v2h-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 14h2v2h-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 14h2v2h-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 11h2v2h-2z" />
  </svg>
);

export const ChartInfographicIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8v10" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 13v5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v3" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  </svg>
);


// Sidebar Icons
export const DashboardIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v8h-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16h6v4h-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 12h6v8h-6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 4h6v4h-6z" />
  </svg>
);

export const ProjectsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
  </svg>
);

export const MarketplaceIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l18 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l0 -10.15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l0 -10.15" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
  </svg>
);

export const ReportingIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5" />
  </svg>
);

export const InventoryIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10h14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 14h14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 18h14" />
  </svg>
);

export const AnalyticsIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12v-4" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12v-2" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v-1" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v4" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M9 20h6" />
  </svg>
);

export const ChevronDoubleLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 7l-5 5l5 5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-5 5l5 5" />
  </svg>
);

export const ChevronDoubleRightIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7l5 5l-5 5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5l-5 5" />
  </svg>
);

export const FlameIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2 -2.96 0 -7 -1 -8c-1 4 -4.5 5.5 -4 10c.5 4.5 4 8 8 8s7.5 -3.5 8 -8c.5 -4.5 -3 -6 -4 -10c-1 1 -3 5.04 -1 8" />
    </svg>
);

export const BoltIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 3l-8 11h6l-1 7l8 -11h-6l1 -7" />
    </svg>
);


export const TruckIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l16 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 11l0 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 11l0 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
);

export const BuildingOfficeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v-1h-7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 21v-16a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 21v-11a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v11" />
    </svg>
);


export const PlaneIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l11 -11" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
    </svg>
);

export const CreditCardIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 -3h-12a3 3 0 0 1 -3 -3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l18 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 15l.01 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l2 0" />
    </svg>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const FileTextIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17h2" />
    </svg>
);

export const BarChartIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l0 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8l0 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 4l0 16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l0 4" />
    </svg>
);

export const FolderIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" />
    </svg>
);