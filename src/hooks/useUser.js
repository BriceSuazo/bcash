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
  const [user, setUser] = useState({
            id: 0,
            firstName: 'Brice Brine',
            lastName: 'Suazo',
            email: 'bricebrine.suazo@cvsu.edu.ph',
            mobileNo: '09617196607',
            accountBalance: 69420.25,
            password: '12345678',
          });
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

    console.log(amount, receiverMobileNo);
    const isReceiverExists = prev.find(
      (receiverData) => receiverData.mobileNo === receiverMobileNo
    );

      if (user.accountBalance > amount) {
        setUser({ ...user, accountBalance: user.accountBalance - amount });
        setUsers((prev) => {
          const sender = prev.find((senderData) => senderData.id === user.id);
          sender.accountBalance -= amount;
        });
        setUsers((prev) => {
          const receiver = prev.find(
            (receiverData) => receiverMobileNo === receiverData.mobileNo
          );
          receiver.accountBalance += amount;
        });
      }
    }
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
