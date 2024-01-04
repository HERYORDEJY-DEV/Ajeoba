import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  //
}

export default function ProductDetails(props: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text>This is the ProductDetails component</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
});
