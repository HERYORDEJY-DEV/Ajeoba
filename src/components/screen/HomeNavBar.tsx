import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {imageAssets, svgAssets} from '~/assets';
import {globalStyles} from '~/styles';

const {HomeNavBarAvatar} = imageAssets,
  {HomeAvatar, HandWave, NotificationIcon} = svgAssets;

interface Props {
  //
}

export default function HomeNavBar(props: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <HomeAvatar width={48} height={48} />
        <View style={styles.leftContent}>
          <View style={styles.greetingWrapper}>
            <Text style={styles.greetingTitle}>Good Morning </Text>
            <HandWave />
          </View>
          <Text style={styles.greetingDescription}>Welcome</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.notificationButton}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  greetingWrapper: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  leftContent: {
    rowGap: 4,
  },
  greetingTitle: {
    fontSize: 16,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.black,
  },
  greetingDescription: {
    fontSize: 14,
    fontFamily: globalStyles.fontFamily.light,
    color: globalStyles.colors.black,
  },

  notificationButton: {
    height: 32,
    width: 32,
    borderRadius: 38,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
