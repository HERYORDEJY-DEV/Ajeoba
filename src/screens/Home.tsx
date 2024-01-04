import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomScreenContainer from '~/navigation/CustomScreenContainer.tsx';

export default function Home(): React.JSX.Element {
  return (
    <CustomScreenContainer>
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
});
