import React, {useCallback} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import ScreenNavBar from '~/components/screen/ScreenNavBar.tsx';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '~/navigation/types.ts';
import StarRating from 'react-native-star-rating-widget';
import {globalStyles} from '~/styles';
import {svgAssets} from '~/assets';
import ReadMore from '@fawazahmed/react-native-read-more';

const {
  StarFillIcon,
  StarHalfIcon,
  StarEmptyIcon,
  FilterIcon,
  ChevronUpIcon,
  DownloadIcon,
} = svgAssets;

export default function ProductDetails(): React.JSX.Element {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProductDetails'>
    >();
  const route = useRoute<RouteProp<MainStackParamList, 'ProductDetails'>>();
  const product = route.params?.product;

  const renderBadge = useCallback(
    (title: string, color: string, containerStyle?: ViewStyle) => {
      return (
        <View style={[styles.badge, containerStyle, {backgroundColor: color}]}>
          <Text style={[styles.badgeText]}>{title}</Text>
        </View>
      );
    },
    [],
  );

  const renderDownloadButton = useCallback(() => {
    return (
      <View style={[styles.downloadButton]}>
        <Text style={[styles.downloadButtonText]}>Download</Text>
        <DownloadIcon />
      </View>
    );
  }, []);

  return (
    <CustomScreenContainer>
      <ScreenNavBar title={product?.name} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sectionItem}>
          <Image
            source={{uri: product.image}}
            style={styles.sectionItemImage}
          />
          <View style={styles.livestockBadge}>
            {renderBadge('Livestock', '#DB371F', {
              paddingHorizontal: 10,
              paddingVertical: 4,
            })}
          </View>
          <View style={styles.sectionItemDesc}>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{product.name}</Text>
              {renderBadge(
                'Wholesale',
                globalStyles.colors.colorsSecondarySecondary400,
              )}
            </View>
            <View style={styles.sellerWrapper}>
              <View style={styles.sellerNameWrapper}>
                <Text style={styles.seller}>Seller:</Text>
                <Text style={styles.sellerName}>Bola Ahmed T.</Text>
              </View>
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
            </View>

            <View style={styles.descWrapper}>
              <ReadMore
                numberOfLines={3}
                style={styles.description}
                seeLessStyle={styles.seeLessStyle}
                seeMoreStyle={styles.seeLessStyle}
                seeMoreText={'Read More'}
                seeLessText={'Read Less'}>
                {
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                }
              </ReadMore>
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

        <View style={styles.warehouseSection}>
          <View style={styles.warehouseHeader}>
            <View style={styles.warehouseDivider} />
            <Text style={styles.warehouseHeaderTitle}>
              WAREHOUSE INFORMATION
            </Text>
            <View style={styles.warehouseDivider} />
          </View>

          <View style={styles.warehouseWrapper}>
            <View style={styles.warehouseInfo}>
              <Text style={styles.warehouseInfoText}>
                Warehouse distribution
              </Text>
              <View style={styles.warehouseInfoValueWrapper}>
                <Text style={styles.warehouseInfoValue}>
                  Gennee Warehousing
                </Text>
                <Text style={styles.ton}>20.00 Ton</Text>
              </View>
            </View>
            <View style={styles.warehouseInfo}>
              <Text style={styles.warehouseInfoText}>
                Warehouse certificate
              </Text>
              <View style={styles.warehouseInfoValueWrapper}>
                <Text style={styles.warehouseInfoValue}>
                  FFM+ aggregation.png
                </Text>
                {renderDownloadButton()}
              </View>
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
    // backgroundColor: 'orange',
  },
  sectionItem: {
    backgroundColor: globalStyles.colors.white,
    // borderRadius: 8,
    marginBottom: 24,

    overflow: 'hidden',
  },
  sectionItemDesc: {
    overflow: 'hidden',
    flex: 1,
    borderWidth: 1,
    borderColor: globalStyles.colors.colorsGrayGray25,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  sectionItemImage: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    aspectRatio: 16 / 9,
  },
  listStyle: {},
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
    color: globalStyles.colors.foundationGreyGrey300,
  },
  currencyWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    backgroundColor: globalStyles.colors.colorsSecondarySecondary25,
    paddingLeft: 14,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  starStyle: {marginRight: 0, marginLeft: 0},
  name: {
    lineHeight: 28,
    fontSize: 21,
    fontFamily: globalStyles.fontFamily.medium,
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
  description: {
    fontSize: 12,
    color: globalStyles.colors.foundationGreyGrey300,
  },
  seeLessStyle: {
    color: globalStyles.colors.colorsPrimaryPrimary400,
    fontSize: 12,
    fontFamily: globalStyles.fontFamily.medium,
    lineHeight: 12 * 1.53,
  },
  descWrapper: {
    marginBottom: 17,
    paddingHorizontal: 16,
  },
  badge: {
    backgroundColor: undefined,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  sellerWrapper: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingBottom: 16,
    borderColor: '#F1F1F1',
    borderBottomWidth: 1,
  },
  sellerNameWrapper: {
    flexDirection: 'row',
    columnGap: 8,
  },
  seller: {
    color: globalStyles.colors.foundationGreyGrey300,
  },
  sellerName: {
    alignSelf: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  badgeText: {
    color: globalStyles.colors.white,
    fontSize: 12,
    fontFamily: globalStyles.fontFamily.semiBold,
    lineHeight: 12 * 1.53,
  },
  warehouseSection: {
    rowGap: 8,
  },
  warehouseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  warehouseTitle: {
    fontSize: 14,
    lineHeight: 14.41,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.colorsPrimaryPrimary400,
  },
  warehouseWrapper: {
    rowGap: 24,
    padding: 16,
    backgroundColor: globalStyles.colors.white,
    borderColor: globalStyles.colors.colorsGrayGray25,
    borderWidth: 1,
    borderRadius: 8,
  },
  warehouse: {
    fontSize: 14,
    lineHeight: 14.41,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.colorsPrimaryPrimary400,
  },
  warehouseName: {
    fontSize: 14,
    lineHeight: 14.41,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.colorsPrimaryPrimary400,
  },
  warehouseDivider: {
    height: 1,
    flex: 1,
    backgroundColor: globalStyles.colors.colorsGrayGray25,
  },
  warehouseHeaderTitle: {
    fontSize: 12,
    color: globalStyles.colors.colorsGrayGray300,
    fontFamily: globalStyles.fontFamily.medium,
    lineHeight: 18.38,
  },
  warehouseInfo: {
    rowGap: 8,
  },
  warehouseInfoText: {
    lineHeight: 18.38,
    fontSize: 12,
    fontFamily: globalStyles.fontFamily.medium,
    color: globalStyles.colors.colorsSecondarySecondary600,
  },
  warehouseInfoValue: {
    color: '#898B87',
    lineHeight: 21,
    // textTransform: 'capitalize',
  },
  warehouseInfoValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
  },
  downloadButtonText: {
    color: globalStyles.colors.colorsPrimaryPrimary400,
    fontFamily: globalStyles.fontFamily.medium,
    lineHeight: 18.38,
  },
  ton: {
    color: '#1F1F1F',
    fontFamily: globalStyles.fontFamily.medium,
    lineHeight: 21,
  },
  livestockBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
