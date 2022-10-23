import { Text } from 'react-native-paper';
import {
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import useFakeRefresh from '../../hooks/useFakeRefresh';
import { FontAwesome } from '@expo/vector-icons';
import { transactions, Color } from '../../constants';

const HomeRoute = () => {
  const { refreshing, onRefresh } = useFakeRefresh();
  return (
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
                  <Text style={{ fontWeight: '700' }}>{transaction.type}</Text>
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
  );
};

export default HomeRoute;
