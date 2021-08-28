export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  disabled?: boolean;
  children?: NavItem[];
}
