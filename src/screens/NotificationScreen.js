import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Color, paddingHorizontalContainer, notifications } from '../constants';
import useFakeRefresh from '../hooks/useFakeRefresh';

const NotificationScreen = ({ navigation }) => {
  const { refreshing, onRefresh } = useFakeRefresh();

  return (
    <ScrollView
      style={{
        paddingVertical: 8,
        paddingHorizontal: paddingHorizontalContainer,
        flex: 1,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {notifications.map((notification, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}>
            <View
              style={{
                width: 42,
                height: 42,
                backgroundColor: Color.primary,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome name={notification.icon} size={24} color="white" />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={{ fontWeight: 'bold' }}>{notification.title}</Text>
              <Text style={{ fontSize: 12 }}>{notification.date}</Text>
            </View>
            {notification.isNew && (
              <View
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: Color.primary,
                  borderRadius: 16,
                }}>
                <Text style={{ color: 'white', fontSize: 12 }}>New</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default NotificationScreen;