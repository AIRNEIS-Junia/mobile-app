import React, {FC, Fragment, ReactNode, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUserMe} from '../requests/user.request.ts';
import {Text, View} from 'react-native';
import {useUserProvider} from '../contexts/UserContext.tsx';

type Props = {
  children: ReactNode;
};

const ProtectGuard: FC<Props> = ({children}) => {
  const {data, isLoading} = useQuery({
    queryKey: ['User'],
    queryFn: () => getUserMe(),
    retry: false,
  });
  const {setUser} = useUserProvider();

  useEffect(() => {
    if (data && data?.firstName) {
      setUser(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text>Chargement</Text>
      </View>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectGuard;
