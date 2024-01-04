import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Wallet(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>This is the Wallet component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
