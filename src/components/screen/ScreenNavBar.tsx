import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '~/styles';
import {svgAssets} from '~/assets';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '~/navigation/types.ts';

const {ArrowBackIcon} = svgAssets;

interface Props {
  title: string;
  rightElement?: React.ReactElement;
}

export default function ScreenNavBar(props: Props): React.JSX.Element {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MainStackParamList, 'ProductList'>
    >();
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={navigation.goBack}>
        <ArrowBackIcon />
      </Pressable>
      <Text>{props.title}</Text>
      <View style={styles.right}>{props.rightElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    height: 56,
    width: '100%',
    backgroundColor: globalStyles.colors.colorsSecondarySecondary25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingLeft: 20,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    letterSpacing: 1.12,
    position: 'absolute',
  },
  right: {
    paddingLeft: 20,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
