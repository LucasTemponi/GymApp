import React, {ReactNode} from 'react';

type Props = {
  children: ReactNode;
};

export const NotificationWrapper = ({children}: Props) => {
  return <>{children}</>;
};
