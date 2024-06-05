import React from 'react';
import {create} from 'zustand';
import {User} from '../types/user.type.ts';

interface UserProviderValue {
  user?: Partial<User>;
  setUser(data: Partial<User>): void;
}

const Context = React.createContext<UserProviderValue | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const useStore = React.useMemo(
    () =>
      create<UserProviderValue>(set => ({
        user: {},
        setUser: data => {
          set(({user}) => ({user: data}));
        },
      })),
    [],
  );

  const store = useStore();

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useUserProvider = (): UserProviderValue => {
  const ctx = React.useContext(Context);

  if (!ctx) {
    throw Error('Lack of provider');
  }

  return ctx;
};

export {UserProvider, useUserProvider};
