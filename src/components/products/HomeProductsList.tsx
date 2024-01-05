import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '~/styles';
import StarRating from 'react-native-star-rating-widget';
import {svgAssets} from '~/assets';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '~/navigation/types.ts';
import {ProductType} from '~/components/products/types.ts';

const {StarFillIcon, StarHalfIcon, StarEmptyIcon} = svgAssets;

interface Props {
  headerComponent: React.ReactElement;
}

export default function HomeProductsList(props: Props): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList, 'Tab'>>();
  const onViewAllProduct = (product: ProductType) => {
    navigation.navigate('ProductList', {products: product});
  };
  const renderViewAllButton = useCallback((product: ProductType) => {
    return (
      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => onViewAllProduct(product)}>
        <Text style={styles.viewAllButtonTitle}>View All</Text>
      </TouchableOpacity>
    );
  }, []);

  const renderSectionHeader = useCallback((product: ProductType) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{product.title}</Text>
        {renderViewAllButton(product)}
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: ProductType, index: number) => {
    return `${item.title}-${index}`;
  }, []);
  const renderSection = useCallback((section: ProductType, _index: number) => {
    return (
      <View style={styles.section}>
        {renderSectionHeader(section)}
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.sectionScroll}
          showsHorizontalScrollIndicator={false}>
          {section.data.map((product, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {product: product})
                }
                style={styles.sectionItem}
                key={`${product.name}-${index}`}>
                <Image
                  source={{uri: product.image}}
                  style={styles.sectionItemImage}
                />
                <View style={styles.sectionItemDesc}>
                  <Text style={styles.title}>{product.name}</Text>
                  <View style={styles.ratingWrapper}>
                    <StarRating
                      animationConfig={{scale: 1}}
                      starSize={16}
                      rating={Number(product.reviews.rating)}
                      onChange={() => {}}
                      StarIconComponent={({type}) => {
                        if (type === 'empty') {
                          return <StarEmptyIcon width={16} height={16} />;
                        } else if (type === 'half') {
                          return <StarHalfIcon width={16} height={16} />;
                        } else if (type === 'full') {
                          return <StarFillIcon width={16} height={16} />;
                        } else {
                          return <StarEmptyIcon width={16} height={16} />;
                        }
                      }}
                      starStyle={styles.starStyle}
                    />
                    <Text style={styles.ratingCount}>
                      ({product.reviews.comments.length})
                    </Text>
                  </View>
                  <View style={styles.currencyWrapper}>
                    <Text style={styles.currency}>
                      {product.price.currency}
                      {product.price.value.toLocaleString('en-US')}
                    </Text>
                    <Text style={styles.unit}>(Per {product.price.unit})</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={({item, index}) => renderSection(item, index)}
        ListHeaderComponent={props.headerComponent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  item: {},
  title: {
    lineHeight: 20,
  },
  header: {},
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 14,
    backgroundColor: globalStyles.colors.colorsSecondarySecondary25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderTitle: {
    fontSize: 16,
    letterSpacing: 1.28,
    fontFamily: globalStyles.fontFamily.semiBold,
  },
  viewAllButtonTitle: {
    fontSize: 14,
    // lineHeight: 14.41,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.colorsPrimaryPrimary400,
  },
  viewAllButton: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: globalStyles.colors.colorsPrimaryPrimary400,
    backgroundColor: globalStyles.colors.white,
    padding: 8,
  },
  section: {marginBottom: 20, backgroundColor: globalStyles.colors.white},
  sectionScroll: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    columnGap: 20,
  },
  sectionItem: {
    rowGap: 8,
  },
  sectionItemDesc: {
    rowGap: 12,
  },
  sectionItemImage: {
    borderRadius: 8,
    width: 164,
    height: 100,
    // marginBottom: 8,
  },
  contentContainer: {
    // rowGap: 20,
    backgroundColor: globalStyles.colors.screenBackground,
  },
  currency: {
    fontSize: 16,
    fontFamily: globalStyles.fontFamily.semiBold,
  },
  ratingWrapper: {flexDirection: 'row', alignItems: 'center', columnGap: 4},
  ratingCount: {
    color: '#8B8B8B',
  },
  unit: {
    fontSize: 14,
    fontFamily: globalStyles.fontFamily.italic,
  },
  currencyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  starStyle: {marginRight: 0, marginLeft: 0},
});

const data: Array<ProductType> = [
  {
    title: 'Livestock Product',
    data: [
      {
        name: 'Goat',
        image:
          'https://thumbs.dreamstime.com/b/goats-herd-brown-white-meadow-52946743.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Chicken',
        image:
          'https://bloximages.newyork1.vip.townnews.com/lancasterfarming.com/content/tncms/assets/v3/editorial/e/5d/e5d11152-ad48-11ed-a1fc-2f153ed8d749/63ecfffc514ba.image.jpg?resize=1396%2C930',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Lamb',
        image: 'https://i.ytimg.com/vi/06jBKJ8y42g/maxresdefault.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Cow',
        image:
          'https://i.pinimg.com/736x/59/66/8a/59668ab7e57487d707ccb1c72b277df3.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Goat',
        image:
          'https://thumbs.dreamstime.com/b/goats-herd-brown-white-meadow-52946743.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Chicken',
        image:
          'https://bloximages.newyork1.vip.townnews.com/lancasterfarming.com/content/tncms/assets/v3/editorial/e/5d/e5d11152-ad48-11ed-a1fc-2f153ed8d749/63ecfffc514ba.image.jpg?resize=1396%2C930',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Lamb',
        image: 'https://i.ytimg.com/vi/06jBKJ8y42g/maxresdefault.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
      {
        name: 'Cow',
        image:
          'https://i.pinimg.com/736x/59/66/8a/59668ab7e57487d707ccb1c72b277df3.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Livestock',
      },
    ],
  },
  {
    title: 'Refrigerated Products',
    data: [
      {
        name: 'Grapes',
        image:
          'https://images.unsplash.com/photo-1537640538966-79f369143f8f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Refrigerated',
      },
      {
        name: 'Mango',
        image:
          'https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Refrigerated',
      },
      {
        name: 'Orange',
        image:
          'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Refrigerated',
      },
      {
        name: 'Pear',
        image:
          'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Refrigerated',
      },
    ],
  },
  {
    title: 'Dry Products',
    data: [
      {
        name: 'Yam',
        image:
          'https://neogric.com/wp-content/uploads/2021/03/Nigerian-and-African-Yam-Tubers-Neogric-2.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Dry',
      },
      {
        name: 'Beans',
        image:
          'https://static.independent.co.uk/2023/04/24/13/iStock-157280488.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Dry',
      },
      {
        name: 'Rice',
        image:
          'https://i2.wp.com/media.premiumtimesng.com/wp-content/files/2013/05/bags-of-rice.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Dry',
      },
      {
        name: 'Cassava',
        image:
          'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2021/05/cassava_flour_GettyImages1034036504_Header-1024x575.jpg?w=1155&h=1528',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Dry',
      },
    ],
  },
  {
    title: 'Farm Inputs',
    data: [
      {
        name: 'Farm Boost',
        image:
          'https://5.imimg.com/data5/SELLER/Default/2023/10/355302112/UD/FR/GR/3198540/fertilizer-bags-500x500.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Agro Fertilizer',
        image:
          'https://c8.alamy.com/comp/E586TR/bags-npk-fertilizer-tobha-mor-howmore-south-uist-outer-hebrides-scotland-E586TR.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pepper Seeds',
        image:
          'https://cdn.shopify.com/s/files/1/2016/2681/products/Seed_Pouch_1_381b266b-3242-49e0-b8fd-60863b42c183.jpg?v=1604099069',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Herbicides',
        image:
          'https://gardengarage.net/cdn/shop/products/800x800_Crew_10lb_Bag_800x.png?v=1680224533',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pesticides',
        image:
          'https://image.made-in-china.com/2f0j00SBQYcgFzEsbK/Flexible-Packaging-for-Pesticide-Fertilizers-Bag.webp',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },

      {
        name: 'Farm Boost',
        image:
          'https://5.imimg.com/data5/SELLER/Default/2023/10/355302112/UD/FR/GR/3198540/fertilizer-bags-500x500.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Agro Fertilizer',
        image:
          'https://c8.alamy.com/comp/E586TR/bags-npk-fertilizer-tobha-mor-howmore-south-uist-outer-hebrides-scotland-E586TR.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pepper Seeds',
        image:
          'https://cdn.shopify.com/s/files/1/2016/2681/products/Seed_Pouch_1_381b266b-3242-49e0-b8fd-60863b42c183.jpg?v=1604099069',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Herbicides',
        image:
          'https://gardengarage.net/cdn/shop/products/800x800_Crew_10lb_Bag_800x.png?v=1680224533',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pesticides',
        image:
          'https://image.made-in-china.com/2f0j00SBQYcgFzEsbK/Flexible-Packaging-for-Pesticide-Fertilizers-Bag.webp',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Agro Fertilizer',
        image:
          'https://c8.alamy.com/comp/E586TR/bags-npk-fertilizer-tobha-mor-howmore-south-uist-outer-hebrides-scotland-E586TR.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pepper Seeds',
        image:
          'https://cdn.shopify.com/s/files/1/2016/2681/products/Seed_Pouch_1_381b266b-3242-49e0-b8fd-60863b42c183.jpg?v=1604099069',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Herbicides',
        image:
          'https://gardengarage.net/cdn/shop/products/800x800_Crew_10lb_Bag_800x.png?v=1680224533',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pesticides',
        image:
          'https://image.made-in-china.com/2f0j00SBQYcgFzEsbK/Flexible-Packaging-for-Pesticide-Fertilizers-Bag.webp',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },

      {
        name: 'Farm Boost',
        image:
          'https://5.imimg.com/data5/SELLER/Default/2023/10/355302112/UD/FR/GR/3198540/fertilizer-bags-500x500.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Agro Fertilizer',
        image:
          'https://c8.alamy.com/comp/E586TR/bags-npk-fertilizer-tobha-mor-howmore-south-uist-outer-hebrides-scotland-E586TR.jpg',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pepper Seeds',
        image:
          'https://cdn.shopify.com/s/files/1/2016/2681/products/Seed_Pouch_1_381b266b-3242-49e0-b8fd-60863b42c183.jpg?v=1604099069',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Herbicides',
        image:
          'https://gardengarage.net/cdn/shop/products/800x800_Crew_10lb_Bag_800x.png?v=1680224533',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
      {
        name: 'Pesticides',
        image:
          'https://image.made-in-china.com/2f0j00SBQYcgFzEsbK/Flexible-Packaging-for-Pesticide-Fertilizers-Bag.webp',
        reviews: {
          rating: (Math.random() * 4 + 1).toFixed(1),
          comments: [...Array(Math.ceil(Math.random() * 100 + 1)).keys()],
        },
        price: {
          value: Math.ceil(Math.random() * 10000 + 1000),
          currency: '₦',
          unit: 'kg',
        },
        category: 'Farm Input',
      },
    ],
  },
];
