import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import HomeNavBar from '~/components/screen/HomeNavBar.tsx';
import {globalStyles} from '~/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function Home(): React.JSX.Element {
  const safeAreaInsets = useSafeAreaInsets();

  const renderHeaderSection = (
    <View style={[styles.headerSection, {paddingTop: safeAreaInsets.top + 24}]}>
      <HomeNavBar />
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 21,
  },
});
