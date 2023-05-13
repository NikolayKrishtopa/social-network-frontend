import { UserTypeExt } from '../../models/models';

export type RegisterProps = {
  mode: 'register' | 'edit';
  current?: UserTypeExt;
  onCancel?: () => void
};
