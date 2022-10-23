import { useState, useRef } from 'react';
import { TouchableOpacity, Image, View, Animated } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { Color } from '../../constants';
import { Feather } from '@expo/vector-icons';

const AccountBalanceWidget = () => {
  const navigation = useNavigation();
  const [isHidden, setIsHidden] = useState(true);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          position: 'relative',
          borderRadius: 24,
          backgroundColor: Color.primary,
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
        onPress={() => {
          if (isHidden) {
            Animated.timing(fadeIn, {
              toValue: 1,
              duration: 300,
            }).start();
            Animated.timing(fadeOut, {
              toValue: 0,
              duration: 300,
            }).start();
          } else {
            navigation.dispatch(StackActions.replace('Home'));
          }
          setIsHidden(false);
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60%',
            opacity: fadeOut,
            transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="lock" size={32} color="white" />
            <Text
              style={{
                color: 'white',
                marginLeft: 16,
                fontSize: 16,
              }}>
              {`Tap to see your available balance.`}
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            { alignItems: 'center' },
            {
              // Bind opacity to animated value
              opacity: fadeIn,
            },
          ]}>
          <Image
            style={{ width: 28, height: 28, resizeMode: 'contain' }}
            source={require('../../assets/imgs/bcash-logo.png')}
          />
          <View style={{ marginVertical: 8 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: '300',
                textAlign: 'center',
              }}>{`Available Balance`}</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 42,
                fontWeight: '500',
                textAlign: 'center',
              }}>{`₱69,420.25`}</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: '300',
                textAlign: 'center',
              }}>{`+63 961 7196 607`}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

export default AccountBalanceWidget;
