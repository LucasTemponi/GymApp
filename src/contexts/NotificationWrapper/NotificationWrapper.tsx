import React, {createContext, ReactNode, useState} from 'react';

export const NotificationContext = createContext({
  title: '',
});

const NotificationWrapper = ({children}: {children: ReactNode}) => {
  const [title] = useState('Novo título');

  return (
    <NotificationContext.Provider value={{title}}>
      {children}
    </NotificationContext.Provider>
  );
};
export default NotificationWrapper;
