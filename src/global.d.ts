
interface Window {
  currencyFormatter?: Intl.NumberFormat;
  updateNotificationSettings?: (settings: {
    email: boolean;
    app: boolean;
    financial: boolean;
    goals: boolean;
  }) => void;
}
