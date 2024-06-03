import React from 'react';
import {create} from 'zustand';
import {OrderCart} from '../types/order.type.ts';

interface OrderCartProviderValue {
  carts: Partial<OrderCart>[];
  setCarts(data: Partial<OrderCart>[]): void;
  setCart(data: Partial<OrderCart>): void;
  changeQuantity(id: string, quantity: number): void;
  updateCart(id: string, data: Partial<OrderCart>): void;
}

const Context = React.createContext<OrderCartProviderValue | null>(null);

const OrderCartProvider = ({children}: {children: React.ReactNode}) => {
  const useStore = React.useMemo(
    () =>
      create<OrderCartProviderValue>(set => ({
        carts: [],
        setCarts: data => {
          set(({carts}) => ({carts: data}));
        },
        setCart: data => {
          set(({carts}) => ({carts: [...carts, data]}));
        },
        changeQuantity(id: string, quantity: number) {
          set(({carts}) => {
            const cartUpdated = carts;
            for (let i = 0; i < cartUpdated.length; i++) {
              if (cartUpdated[i].product?.id === id) {
                cartUpdated[i].quantity = quantity;
              }
            }

            return {
              carts: cartUpdated,
            };
          });
        },
        updateCart(id: string, data: Partial<OrderCart>) {
          set(({carts}) => {
            const cartUpdated = carts;
            for (let i = 0; i < cartUpdated.length; i++) {
              if (cartUpdated[i].id === id) {
                cartUpdated[i] = data;
              }
            }

            return {
              carts: cartUpdated,
            };
          });
        },
      })),
    [],
  );

  const store = useStore();

  return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useOrderCartProvider = (): OrderCartProviderValue => {
  const ctx = React.useContext(Context);

  if (!ctx) {
    throw Error('Lack of provider');
  }

  return ctx;
};

export {OrderCartProvider, useOrderCartProvider};
