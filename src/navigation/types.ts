import {ProductDataType, ProductType} from '~/components/products/types.ts';

export type TabStackParamList = {
  Home: undefined;
  Orders: undefined;
  Wallet: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Tab: undefined;
  ProductDetails: {product: ProductDataType};
  ProductList: {products: ProductType};
};

export enum TabStackScreen {
  Home = 'HOME',
  Orders = 'ORDERS',
  Wallet = 'WALLET',
  Profile = 'PROFILE',
}

export type TabStackScreenValue =
  (typeof TabStackScreen)[keyof typeof TabStackScreen];

type TabStackRouteMap = Record<TabStackScreenValue, string>;

const tabStackRoutesMap: TabStackRouteMap = {
  HOME: 'Home',
  ORDERS: 'Orders',
  WALLET: 'Wallet',
  PROFILE: 'Profile',
};

export const tabStackRouteName = (
  screen: TabStackScreenValue,
  routesMap: Partial<TabStackRouteMap> = tabStackRoutesMap,
) => routesMap[screen] ?? '';
