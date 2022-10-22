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
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import { Color, paddingHorizontalContainer } from '../constants';
import { Entypo, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { REGEX_EMAIL_VALIDATION } from '../constants';
import useFakeRequest from '../hooks/useFakeRequest';
import { useUser } from '../hooks/useUser';

const SignupScreen = ({ navigation }) => {
  const { addUser, users, isUserExists } = useUser();
  const { requestLoading, onFakeRequest } = useFakeRequest();
  const [signupCredentials, setSignupCredentials] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
    agreeOnPrivacyPolicy: false,
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
              Sign up to your account
            </Text>
            <TextInput
              mode="outlined"
              label="First name"
              autoComplete="name-given"
              disabled={requestLoading}
              onChangeText={(text) =>
                setSignupCredentials({ ...signupCredentials, firstName: text })
              }
              value={signupCredentials.firstName}
              style={{
                width: '100%',
                marginBottom: 12,
              }}
              outlineColor={Color.gray}
              theme={{ colors: { primary: Color.primary } }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name="format-letter-case"
                      size={24}
                      color={Color.gray}
                    />
                  )}
                />
              }
            />
            <TextInput
              label="Last name"
              autoComplete="name-family"
              onChangeText={(text) =>
                setSignupCredentials({ ...signupCredentials, lastName: text })
              }
              disabled={requestLoading}
              value={signupCredentials.lastName}
              mode="outlined"
              style={{
                width: '100%',
                marginBottom: 12,
              }}
              outlineColor={Color.gray}
              theme={{ colors: { primary: Color.primary } }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialCommunityIcons
                      name="format-letter-case"
                      size={24}
                      color={Color.gray}
                    />
                  )}
                />
              }
            />
            <TextInput
              label="Email"
              autoComplete="email"
              onChangeText={(text) =>
                setSignupCredentials({ ...signupCredentials, email: text })
              }
              disabled={requestLoading}
              value={signupCredentials.email}
              mode="outlined"
              style={{
                width: '100%',
                marginBottom: 12,
              }}
              outlineColor={Color.gray}
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
              label="Password"
              secureTextEntry={true}
              disabled={requestLoading}
              autoComplete="password"
              onChangeText={(text) =>
                setSignupCredentials({ ...signupCredentials, password: text })
              }
              value={signupCredentials.password}
              mode="outlined"
              style={{
                width: '100%',
              }}
              outlineColor={Color.gray}
              theme={{ colors: { primary: Color.primary } }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <AntDesign name="lock" size={24} color={Color.gray} />
                  )}
                />
              }
            />
            <View style={{ marginBottom: 12 }}>
              <Checkbox.Item
                label="You agree to the terms of use and acknowledge the privacy policy."
                position="leading"
                status={
                  signupCredentials.agreeOnPrivacyPolicy
                    ? 'checked'
                    : 'unchecked'
                }
                color={Color.primary}
                disabled={requestLoading}
                onPress={() => {
                  !requestLoading &&
                    setSignupCredentials({
                      ...signupCredentials,
                      agreeOnPrivacyPolicy:
                        !signupCredentials.agreeOnPrivacyPolicy,
                    });
                }}
                labelStyle={{ fontSize: 12, textAlign: 'left' }}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signin')}
              disabled={requestLoading}>
              <Text
                style={{
                  color: Color.gray,
                  opacity: requestLoading ? 0.5 : 1,
                  textAlign: 'center',
                  marginBottom: 12,
                }}>
                Already have an account?{' '}
                <Text style={{ fontWeight: '500' }}>Sign in here.</Text>
              </Text>
            </TouchableOpacity>
            <Button
              mode="contained"
              contentStyle={{ height: 48 }}
              style={{
                width: '100%',
                borderRadius: 100,
                backgroundColor: Color.primary,
              }}
              disabled={requestLoading}
              loading={requestLoading}
              onPress={async () => {
                if (!signupCredentials.firstName) {
                  Alert.alert('Missing first name', 'First name is required', [
                    { text: 'OK' },
                  ]);
                  return;
                }
                if (!signupCredentials.lastName) {
                  Alert.alert('Missing last name', 'Last name is required', [
                    { text: 'OK' },
                  ]);
                  return;
                }
                if (
                  REGEX_EMAIL_VALIDATION.test(signupCredentials.email) === false
                ) {
                  Alert.alert('Invalid email', 'Please enter a valid email', [
                    { text: 'OK' },
                  ]);
                  return;
                }
                if (!signupCredentials.password) {
                  Alert.alert(
                    'Invalid password',
                    'Please enter a valid password',
                    [{ text: 'OK' }]
                  );
                  return;
                }
                if (signupCredentials.password.length < 8) {
                  Alert.alert(
                    'Invalid password length',
                    'Please enter a password with 8 length and above',
                    [{ text: 'OK' }]
                  );
                  return;
                }
                if (!signupCredentials.agreeOnPrivacyPolicy) {
                  Alert.alert(
                    'Agree on terms of use and privacy policy.',
                    'You must agree on terms of use and privacy policy.',
                    [{ text: 'OK' }]
                  );
                  return;
                }

                await onFakeRequest();
                const user = isUserExists(signupCredentials.email);
                if (user) {
                  Alert.alert(
                    'Account already exists',
                    'Your account is already existing. Try logging in.',
                    [
                      {
                        text: 'Go to login',
                        onPress: () => navigation.navigate('Signin'),
                      },
                    ]
                  );
                } else {
                  const { agreeOnPrivacyPolicy, ...userNoAgree } =
                    signupCredentials;
                  addUser(userNoAgree);
                  const newUser = isUserExists(userNoAgree.email);

                  navigation.dispatch(StackActions.replace('Home'), newUser);
                }
                setSignupCredentials({
                  firstName: '',
                  lastName: '',
                  birthday: '',
                  email: '',
                  password: '',
                  agreeOnPrivacyPolicy: false,
                });
              }}>
              {`Sign up`}
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
