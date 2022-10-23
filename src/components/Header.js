import { View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useUser } from '../hooks/useUser';
import { Color } from '../constants';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const { signout, userLoading } = useUser();
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
      <Button
        mode="contained"
        onPress={async () => await signout()}
        style={{
          borderRadius: 100,
          backgroundColor: Color.primary,
          marginBottom: 12,
        }}
        loading={userLoading}
        disabled={userLoading}>
        {!userLoading ? 'Sign out' : 'Loading...'}
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <FontAwesome name="bell" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default Header;
