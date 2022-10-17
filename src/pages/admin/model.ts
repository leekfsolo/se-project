import { PageUrl } from "../../configuration/enum";

export interface AdminSidenavOption {
  label: string;
  page: PageUrl;
  icon: React.ReactElement;
  isActive: boolean;
}
