import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import HomeNavBar from '~/components/screen/HomeNavBar.tsx';
import {globalStyles} from '~/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSearchInput from '~/components/inputs/CustomSearchInput.tsx';
import IconButton from '~/components/buttons/IconButton.tsx';
import {svgAssets} from '~/assets';
import HomeProductsCarousel from '~/components/products/HomeProductsCarousel.tsx';
import HomeProductsList from '~/components/products/HomeProductsList.tsx';

const {FilterIcon} = svgAssets;

export default function Home(): React.JSX.Element {
  const safeAreaInsets = useSafeAreaInsets();

  const renderHeaderSection = (
    <View style={[styles.headerSection, {paddingTop: safeAreaInsets.top + 24}]}>
      <HomeNavBar style={{marginBottom: 28, paddingHorizontal: 20}} />
      <View style={[styles.searchWrapper]}>
        <CustomSearchInput placeholder="Search for products and inputs" />
        <IconButton iconElement={<FilterIcon />} />
      </View>
      <HomeProductsCarousel containerStyle={{marginBottom: 21}} />
    </View>
  );

  return (
    <CustomScreenContainer edges={['left', 'right']}>
      <HomeProductsList headerComponent={renderHeaderSection} />
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  headerSection: {
    backgroundColor: globalStyles.colors.white,
    marginBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 24,
    paddingHorizontal: 20,
  },
});
