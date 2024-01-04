import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';
import {globalStyles} from '~/styles';
import HomeNavBar from '~/components/screen/HomeNavBar.tsx';

export default function Orders(): React.JSX.Element {
  return (
    <CustomScreenContainer style={styles.screenContainer}>
      <HomeNavBar />
      <View style={styles.container}>
        <Text style={styles.title}>
          The{'\n'}Orders{'\n'}screen
        </Text>
      </View>
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
});
