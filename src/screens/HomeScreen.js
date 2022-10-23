import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import { Color, homeScreenIcons, transactions } from '../constants';
import useFakeRefresh from '../hooks/useFakeRefresh';
import { useUser } from '../hooks/useUser';

const HomeScreen = ({ navigation }) => {
  const { user } = useUser();
  const { refreshing, onRefresh } = useFakeRefresh();
  return (
    <>
      <Header />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Color.primary,
          paddingTop: 100,
          paddingBottom: 32,
        }}>
        <View style={{ marginBottom: 28 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 42,
              fontWeight: '500',
              color: 'white',
              marginBottom: 8,
            }}>{`₱69,420.25`}</Text>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
            }}>{`@bricesuazo`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '75%',
          }}>
          {homeScreenIcons.map((icon, index) => (
            <View
              style={{
                flexDirection: 'column',
              }}
              key={index}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(icon.navigate);
                }}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome name={icon.icon} size={24} color={Color.primary} />
              </TouchableOpacity>
              <Text
                style={{ textAlign: 'center', marginTop: 8, color: 'white' }}>
                {icon.text}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView
        style={{ height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, marginBottom: 16, color: 'gray' }}>
            Today
          </Text>
          {transactions.map((transaction, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                  paddingVertical: 8,
                }}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: Color.primary,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                  }}>
                  <FontAwesome
                    name={
                      (transaction.type === 'Transfer' && 'send') ||
                      (transaction.type === 'Buy' && 'shopping-cart') ||
                      (transaction.type === 'Swap' && 'arrows-h')
                    }
                    size={18}
                    color="white"
                  />
                </View>

                <View
                  style={{
                    marginLeft: 8,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View>
                    <Text style={{ fontWeight: '700' }}>
                      {transaction.type}
                    </Text>
                    <Text style={{ fontSize: 12 }}>To: {transaction.to}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: '700' }}>
                      {transaction.amount}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
