import {useContext, useEffect, useState} from 'react';
import {NotificationContext} from '../NotificationWrapper';

const useNotification = () => {
  const {title} = useContext(NotificationContext);
  const [titulo, setTitle] = useState('');

  useEffect(() => {
    setTitle('joao');
  }, []);

  return {title, titulo};
};

export default useNotification;
