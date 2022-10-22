import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); 
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 48,
        position: 'absolute',
        zIndex: 5,
        width: '100%',
      }}>
      <Image
        style={{ width: 32, height: 32, resizeMode: 'contain' }}
        source={require('../assets/imgs/bcash-logo.png')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <FontAwesome name="bell" size={22} color="white" />
      </TouchableOpacity>
      
    </View>
  );
};
export default Header;
