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

  useEffect(() => {
    if (!user) {
      navigation.dispatch(StackActions.replace('Signin'));
    }
  }, [user, navigation]);

  const signup = async (user) => {
    await onFakeRequest();
    const currentUser = isUserExists(user.email);
    if (!currentUser) {
      setUsers((prev) => [...prev, { ...user, id: users.length }]);
      setUser(isUserExists(user.email));
    }
    return currentUser;
  };
  const signout = async () => {
    await onFakeRequest();
    setUser(null);
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
  const isUserExists = (email) => {
    return users.find((user) => user.email === email);
  };

  return {
    signup,
    signout,
    signin,
    userLoading: requestLoading,
  };
};
