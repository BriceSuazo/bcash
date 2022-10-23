import { useState } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { Color } from '../../constants';
import { Feather } from '@expo/vector-icons';

const AccountBalanceWidget = () => {
  const navigation = useNavigation();
  const [isHidden, setIsHidden] = useState(true);
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
          isHidden
            ? setIsHidden(false)
            : navigation.dispatch(StackActions.replace('Home'));
        }}>
        <View
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60%',
            opacity: isHidden ? 1 : 0,
            // transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
            // transform: 'translate(-50%, -50%)',
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
        </View>

        <View
          style={{
            alignItems: 'center',
            opacity: isHidden ? 0 : 1,
          }}>
          <Image
            style={{ width: 28, height: 28, resizeMode: 'contain' }}
            source={require('../../assets/images/bcash-logo.png')}
          />
          <View style={{ marginVertical: 8 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                textAlign: 'center',
              }}>{`Available Balance`}</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 42,
                textAlign: 'center',
              }}>{`₱69,420.25`}</Text>
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                textAlign: 'center',
              }}>{`+63 961 7196 607`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default AccountBalanceWidget;
