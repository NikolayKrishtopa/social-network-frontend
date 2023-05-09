import { Dispatch, SetStateAction } from 'react';

export type HeaderPropsType = {
  onSideBarOpen: Dispatch<SetStateAction<boolean>>;
};
