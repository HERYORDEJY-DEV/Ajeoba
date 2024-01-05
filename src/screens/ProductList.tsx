import React, {useCallback, useRef} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import ScreenNavBar from '~/components/screen/ScreenNavBar.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '~/navigation/types.ts';
import StarRating from 'react-native-star-rating-widget';
import {svgAssets} from '~/assets';
import {globalStyles} from '~/styles';
import {ProductDataType, ProductType} from '~/components/products/types.ts';
import CustomSearchInput from '~/components/inputs/CustomSearchInput.tsx';
import IconButton from '~/components/buttons/IconButton.tsx';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {StarFillIcon, StarHalfIcon, StarEmptyIcon, FilterIcon, ChevronUpIcon} =
  svgAssets;

interface Props {
  //
}

export default function ProductList(props: Props): React.JSX.Element {
  const safeAreaInset = useSafeAreaInsets();
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const {height} = Dimensions.get('screen');
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProductList'>
    >();
  const route = useRoute<RouteProp<MainStackParamList, 'ProductList'>>();
  const product = route.params?.products;
  const scrollRef = useRef<Animated.FlatList<ProductType>>(null);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(76 + safeAreaInset.bottom);

  const keyExtractor = useCallback((item: ProductDataType, index: number) => {
    return `${item.name}-${index}`;
  }, []);

  const scrollToTopButton = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 750,
            // easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (event.contentOffset.y > height * 0.5) {
        translateY.value = 0;
      } else if (event.contentOffset.y < height * 0.5) {
        translateY.value = 76 + safeAreaInset.bottom;
      }
    },
    onBeginDrag: e => {
      isScrolling.value = true;
    },
    onEndDrag: e => {
      isScrolling.value = false;
    },
  });
  const onScrollToTop = () => {
    scrollRef.current?.scrollToOffset({offset: 0, animated: true});
    translateY.value = 56 + safeAreaInset.bottom + 20;
  };

  const renderItem = useCallback((item: ProductDataType, index: number) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetails', {product: item})}
        style={styles.sectionItem}
        key={`${item.name}-${index}`}>
        <Image source={{uri: item.image}} style={styles.sectionItemImage} />
        <View style={styles.sectionItemDesc}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.ratingWrapper}>
            <StarRating
              animationConfig={{scale: 1}}
              starSize={16}
              rating={Number(item.reviews.rating)}
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
              ({item.reviews.comments.length})
            </Text>
          </View>
          <View style={styles.currencyWrapper}>
            <Text style={styles.currency}>
              {item.price.currency}
              {item.price.value.toLocaleString('en-US')}
            </Text>
            <Text style={styles.unit}>(Per {item.price.unit})</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderScrollToTopButton = useCallback(() => {
    return (
      <Animated.View style={scrollToTopButton}>
        <Pressable style={styles.scrollToTopButton} onPress={onScrollToTop}>
          <ChevronUpIcon />
          <Text style={styles.scrollToTopText}>top</Text>
        </Pressable>
      </Animated.View>
    );
  }, []);

  return (
    <CustomScreenContainer>
      <ScreenNavBar title={product?.title} />

      <Animated.FlatList
        ref={scrollRef}
        onScroll={onScrollHandler}
        ListHeaderComponent={
          <View style={[styles.searchWrapper]}>
            <CustomSearchInput placeholder="Search for products and inputs" />
            <IconButton iconElement={<FilterIcon />} />
          </View>
        }
        data={product?.data}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={[
          styles.contentContainer,
          {paddingBottom: 56 + safeAreaInset.bottom},
        ]}
        showsVerticalScrollIndicator={false}
      />
      {renderScrollToTopButton()}
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
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
    width: 164,
    height: 100,
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
    fontSize: 14,
    fontFamily: globalStyles.fontFamily.italic,
  },
  currencyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  starStyle: {marginRight: 0, marginLeft: 0},
  name: {
    lineHeight: 20,
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
