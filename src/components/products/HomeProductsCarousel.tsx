import * as React from 'react';
import {useRef} from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '~/styles';
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import PaginatorIndicator from '~/components/screen/PaginatorIndicator.tsx';

interface Props extends ViewProps {
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

type ItemContent = {
  image: string;
  description: string;
};
export default function HomeProductsCarousel(props: Props): React.JSX.Element {
  const {height: windowHeight, width: windowWidth} = useWindowDimensions();
  const itemWidth = windowWidth * 0.8;
  const sharedValue = useSharedValue(0);
  const scrollRef = useRef<Animated.ScrollView>(null);
  const activeIndexValue = useDerivedValue(() => {
    return Math.round(sharedValue.value / windowWidth);
  });

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const {x} = event.contentOffset;
      sharedValue.value = x;
    },
  });
  const renderItem = (item: ItemContent, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.itemContainer,
          {
            width: itemWidth,
          },
        ]}
        onPress={() => Linking.openURL('https://ajeoba.com/')}>
        <ImageBackground
          style={[styles.imageBackground]}
          source={{uri: item.image}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0.4, 1]}
            colors={['rgba(0, 0, 0, 0.87)', 'rgba(0, 0, 0, 0.00)']}
            style={styles.linearGradient}>
            <View style={styles.itemDescriptionWrapper}>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[styles.container, props.containerStyle]}>
      <Animated.ScrollView
        horizontal
        ref={scrollRef}
        onScroll={onScrollHandler}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={[
          styles.contentContainer,
          props.contentContainerStyle,
        ]}>
        {data.map((item, index) => renderItem(item, index))}
      </Animated.ScrollView>

      <View style={styles.indicatorContainer}>
        {[...data].map((_, index) => (
          <PaginatorIndicator
            key={`${index}`}
            dotIndex={index}
            activeDotIndex={activeIndexValue}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 16,
  },
  imageBackground: {
    justifyContent: 'center',
    height: 123,
  },
  itemContainer: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#CCCCCC50',
  },
  itemDescription: {
    fontSize: 16,
    fontFamily: globalStyles.fontFamily.semiBold,
    color: globalStyles.colors.white,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
  },
  itemDescriptionWrapper: {
    width: '70%',
  },
  carousel: {width: '100%', columnGap: 16, paddingHorizontal: 16},
  contentContainer: {columnGap: 16, paddingHorizontal: 20},
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    columnGap: 6,
  },
  indicatorDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: '#D9D9D9',
  },
});

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Get high quality farm products and inputs',
  },
  {
    image:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Obtain premium farm products and inputs of superior quality',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1667829652027-747a608f99ba?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Acquire top-tier farm products and inputs of the highest quality',
  },
];
