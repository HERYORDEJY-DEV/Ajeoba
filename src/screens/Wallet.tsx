import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import HomeNavBar from '~/components/screen/HomeNavBar.tsx';
import {globalStyles} from '~/styles';

export default function Wallet(): React.JSX.Element {
  return (
    <CustomScreenContainer style={styles.screenContainer}>
      <View style={[styles.navbarWrapper]}>
        <HomeNavBar />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          The{'\n'}Wallet{'\n'}screen
        </Text>
      </ScrollView>
    </CustomScreenContainer>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 90,
    fontFamily: globalStyles.fontFamily.black,
  },
  navbar: {
    marginHorizontal: 20,
  },
  navbarWrapper: {paddingTop: 24},
});
