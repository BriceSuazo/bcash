import { useState } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import {
  Color,
  paddingHorizontalContainer,
  REGEX_EMAIL_VALIDATION,
} from '../constants';
import { Entypo, AntDesign } from '@expo/vector-icons';
import useFakeRequest from '../hooks/useFakeRequest';
import { useUser } from '../hooks/useUser';

const SigninScreen = ({ navigation }) => {
  const { isUserExists } = useUser();

  const { requestLoading, onFakeRequest } = useFakeRequest();
  const [signinCredentials, setSigninCredentials] = useState({
    email: '',
    password: '',
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: paddingHorizontalContainer,
            paddingVertical: 24,
          }}>
          <View />
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                marginBottom: 12,
                textAlign: 'center',
              }}>
              Sign in to your account
            </Text>
            <TextInput
              mode="outlined"
              outlineColor={Color.gray}
              label="Email"
              autoComplete="email"
              disabled={requestLoading}
              onChangeText={(text) =>
                setSigninCredentials({ ...signinCredentials, email: text })
              }
              value={signinCredentials.email}
              style={{
                marginBottom: 12,
              }}
              theme={{ colors: { primary: Color.primary } }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Entypo name="email" size={24} color={Color.gray} />
                  )}
                />
              }
            />
            <TextInput
              mode="outlined"
              outlineColor={Color.gray}
              theme={{ colors: { primary: Color.primary } }}
              disabled={requestLoading}
              label="Password"
              autoComplete="password"
              secureTextEntry
              onChangeText={(text) =>
                setSigninCredentials({ ...signinCredentials, password: text })
              }
              value={signinCredentials.password}
              style={{
                marginBottom: 12,
              }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <AntDesign name="lock" size={24} color={Color.gray} />
                  )}
                />
              }
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              disabled={requestLoading}>
              <Text
                style={{
                  color: Color.gray,
                  textAlign: 'center',
                  opacity: requestLoading ? 0.5 : 1,
                  marginBottom: 12,
                }}>
                {`Don't have an account yet? `}
                <Text style={{ fontWeight: '500' }}>Sign up here.</Text>
              </Text>
            </TouchableOpacity>
            <Button
              mode="contained"
              contentStyle={{ height: 48 }}
              style={{
                borderRadius: 100,
                backgroundColor: Color.primary,
                marginBottom: 12,
              }}
              disabled={requestLoading}
              loading={requestLoading}
              onPress={async () => {
                if (
                  REGEX_EMAIL_VALIDATION.test(signinCredentials.email) ===
                    false ||
                  !signinCredentials.email
                ) {
                  Alert.alert('Invalid email', 'Please enter a valid email', [
                    { text: 'OK' },
                  ]);
                  return;
                }
                if (!signinCredentials.password) {
                  Alert.alert(
                    'Invalid password',
                    'Please enter a valid password',
                    [{ text: 'OK' }]
                  );
                  return;
                }
                if (signinCredentials.password.length < 8) {
                  Alert.alert(
                    'Invalid password length',
                    'Please enter a password with 8 length and above',
                    [{ text: 'OK' }]
                  );
                  return;
                }

                await onFakeRequest();

                const user = isUserExists(signinCredentials.email);
                if (user && user.password === signinCredentials.password) {
                  setSigninCredentials({ email: '', password: '' });
                  navigation.dispatch(StackActions.replace('Home'), user);
                } else {
                  Alert.alert(
                    'Invalid credentials',
                    'Email or password is incorrect.',
                    [{ text: 'OK' }]
                  );
                }
              }}>
              {`Sign in`}
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SigninScreen;
