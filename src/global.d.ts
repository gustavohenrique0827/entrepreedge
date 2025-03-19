
declare interface Window {
  currencyFormatter: Intl.NumberFormat;
  updateNotificationSettings?: (settings: Record<string, boolean>) => void;
}
