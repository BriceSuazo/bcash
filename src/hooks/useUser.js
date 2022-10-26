import { useState, useContext, createContext } from 'react';
import { constantUsers } from '../constants';
import { useNavigation, StackActions } from '@react-navigation/native';
import useFakeRequest from './useFakeRequest';
import { useNotification } from './useNotification';

const usersContext = createContext();

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
  const [user, setUser] = useState({
    id: 0,
    firstName: 'Brice Brine',
    lastName: 'Suazo',
    email: 'b@b.com',
    mobileNo: '09617196607',
    accountBalance: 69420.25,
    password: '12345678',
  });

  const { schedulePushNotification } = useNotification();
  const { onFakeRequest, requestLoading } = useFakeRequest();

  const signup = async (userCredential) => {
    await onFakeRequest();

    if (isUserExists(userCredential.email)) {
      return Promise.reject(
        new Error('Email is already taken. Use another one.')
      );
    }
    if (
      users.find((userInDB) => userInDB.mobileNo === userCredential.mobileNo)
    ) {
      return Promise.reject(
        new Error('Mobile number is already taken. Use another one.')
      );
    }

    const newUser = { ...userCredential, id: users.length, accountBalance: 0 };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    navigation.dispatch(StackActions.replace('Home'));
  };

  const signout = async () => {
    await onFakeRequest();
    setUser(null);
    navigation.dispatch(StackActions.replace('Signin'));
  };

  const signin = async (email, password) => {
    await onFakeRequest();

    const currentUser = isUserExists(email);

    if (!currentUser || currentUser.password !== password) {
      return Promise.reject(new Error('Wrong email or password.'));
    }

    setUser(currentUser);
    navigation.dispatch(StackActions.replace('Home'));
  };

  const sendPayment = async (amount, receiverMobileNo) => {
    await schedulePushNotification({
      from: user.mobileNo,
      to: receiverMobileNo,
      amount,
    });
    await onFakeRequest();

    if (receiverMobileNo === user.mobileNo) {
      return Promise.reject(
        new Error(`You can't send money to your own mobile number.`)
      );
    }

    const isReceiverExists = users.find(
      (receiverData) => receiverData.mobileNo === receiverMobileNo
    );
    if (isReceiverExists === undefined) {
      return Promise.reject(new Error('Mobile number not found.'));
    }

    if (user.accountBalance < amount) {
      return Promise.reject(new Error('Not enough balance.'));
    }

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
