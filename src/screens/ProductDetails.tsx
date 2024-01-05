import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ScreenNavBar from '~/components/screen/ScreenNavBar.tsx';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '~/navigation/types.ts';
import StarRating from 'react-native-star-rating-widget';
import {globalStyles} from '~/styles';
import {svgAssets} from '~/assets';

const {StarFillIcon, StarHalfIcon, StarEmptyIcon, FilterIcon, ChevronUpIcon} =
  svgAssets;

interface Props {
  //
}

export default function ProductDetails(props: Props): React.JSX.Element {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProductDetails'>
    >();
  const route = useRoute<RouteProp<MainStackParamList, 'ProductDetails'>>();
  const product = route.params?.product;

  return (
    <CustomScreenContainer>
      <ScreenNavBar title={product?.name} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionItem}>
          <Image
            source={{uri: product.image}}
            style={styles.sectionItemImage}
          />
          <View style={styles.sectionItemDesc}>
            <Text style={styles.name}>{product.name}</Text>
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
        </View>
      </ScrollView>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionItem: {
    rowGap: 8,
    backgroundColor: globalStyles.colors.white,
    borderRadius: 8,
  },
  sectionItemDesc: {
    rowGap: 12,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  sectionItemImage: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    aspectRatio: 16 / 9,
  },
  listStyle: {
    backgroundColor: globalStyles.colors.red,
  },
  contentContainer: {
    rowGap: 20,
    paddingVertical: 20,
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
    fontSize: 10,
    fontFamily: globalStyles.fontFamily.italic,
    lineHeight: 13.41,
  },
  currencyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  starStyle: {marginRight: 0, marginLeft: 0},
  name: {
    lineHeight: 28,
    fontSize: 21,
  },
  searchWrapper: {
    flexDirection: 'row',
    columnGap: 8,
    paddingHorizontal: 20,
  },
  scrollToTopButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: globalStyles.colors.colorsPrimaryPrimary400,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: -5,
  },
  scrollToTopText: {
    color: globalStyles.colors.white,
    fontSize: 12,
    fontFamily: globalStyles.fontFamily.semiBold,
  },
  columnWrapperStyle: {
    columnGap: 20,
    justifyContent: 'center',
  },
});
