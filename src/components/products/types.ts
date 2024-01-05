import {SectionListData} from 'react-native';

export type ProductDataType = {
  name: string;
  image: string;
  reviews: {rating: string; comments: Array<number>};
  price: {value: number; currency: string; unit: string};
};

export type ProductType = {
  title: string;
  data: Array<ProductDataType>;
};

export type ProductSectionListDataType = SectionListData<
  {
    name: string;
    image: string;
    reviews: {rating: string; comments: number[]};
    price: {value: number; currency: string; unit: string};
  },
  ProductType
>;
