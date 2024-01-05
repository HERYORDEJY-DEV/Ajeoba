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
import {productsData} from '~/components/products/data.ts';

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
        data={productsData}
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
