import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import HomeNavBar from '~/components/screen/HomeNavBar.tsx';
import {globalStyles} from '~/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomSearchInput from '~/components/inputs/CustomSearchInput.tsx';
import IconButton from '~/components/buttons/IconButton.tsx';
import {svgAssets} from '~/assets';
import HomeProductsCarousel from '~/components/products/HomeProductsCarousel.tsx';

const {FilterIcon} = svgAssets;

export default function Home(): React.JSX.Element {
  const safeAreaInsets = useSafeAreaInsets();

  const renderHeaderSection = (
    <View style={[styles.headerSection, {paddingTop: safeAreaInsets.top + 24}]}>
      <HomeNavBar style={{marginBottom: 28}} />
      <View style={[styles.searchWrapper]}>
        <CustomSearchInput placeholder="Search for products and inputs" />
        <IconButton iconElement={<FilterIcon />} />
      </View>
      <HomeProductsCarousel />
    </View>
  );

  return (
    <CustomScreenContainer edges={['bottom']}>
      {renderHeaderSection}
      <View style={styles.container}>
        <Text>This is the Home component</Text>
      </View>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
  headerSection: {
    backgroundColor: globalStyles.colors.white,
    // paddingHorizontal: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 24,
  },
});
