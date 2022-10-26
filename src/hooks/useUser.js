import { useState, useContext, createContext, useEffect } from 'react';
const usersContext = createContext();
import { constantUsers } from '../constants';
import { useNavigation, StackActions } from '@react-navigation/native';
import useFakeRequest from './useFakeRequest';

export function UserProvider({ children }) {
  const user = useProvideUser();
  return <usersContext.Provider value={user}>{children}</usersContext.Provider>;
}

export const useUser = () => {
  return useContext(usersContext);
};

const useProvideUser = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState(constantUsers);
  const [user, setUser] = useState(null);
  const { onFakeRequest, requestLoading } = useFakeRequest();

  const signup = async (user) => {
    await onFakeRequest();
    const currentUser = isUserExists(user.email);
    if (!currentUser) {
      const newUser = { ...user, id: users.length, accountBalance: 0 };
      console.log(newUser);
      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      navigation.dispatch(StackActions.replace('Home'));
      return newUser;
    }
  };
  const signout = async () => {
    await onFakeRequest();
    setUser(null);
    navigation.dispatch(StackActions.replace('Signin'));
  };
  const signin = async (email, password) => {
    await onFakeRequest();
    const currentUser = isUserExists(email);
    if (currentUser && currentUser.password === password) {
      setUser(currentUser);
      navigation.dispatch(StackActions.replace('Home'));
      return currentUser;
    }
  };

  const sendPayment = async (amount, receiverMobileNo) => {
    await onFakeRequest();

    const isReceiverExists = users.find(
      (receiverData) => receiverData.mobileNo === receiverMobileNo
    );
    if (isReceiverExists) {
      if (user.accountBalance > amount) {
        setUser({ ...user, accountBalance: user.accountBalance - amount });

        // sender
        setUsers(
          users.map((prev) =>
            prev.mobileNo === user.mobileNo
              ? { ...prev, accountBalance: prev.accountBalance - amount }
              : prev
          )
        );

        // receiver
        setUsers(
          users.map((prev) =>
            prev.mobileNo === receiverMobileNo
              ? { ...prev, accountBalance: prev.accountBalance + amount }
              : prev
          )
        );
      } else {
        return new Error('Not enough balance.');
      }
    }
    return new Error('User not found.');
  };

  const isUserExists = (email) => {
    return users.find((user) => user.email === email);
  };

  return {
    sendPayment,
    user,
    signup,
    signout,
    signin,
    userLoading: requestLoading,
  };
};
