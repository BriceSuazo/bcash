import { useState, useContext, createContext } from 'react';
const usersContext = createContext();
import { constantUsers } from '../constants';

export function UserProvider({ children }) {
  const user = useProvideUser();
  return <usersContext.Provider value={user}>{children}</usersContext.Provider>;
}

export const useUser = () => {
  return useContext(usersContext);
};

function useProvideUser() {
  const [users, setUsers] = useState(constantUsers);

  const addUser = (user) => {
    setUsers((prev) => [...prev, { ...user, id: users.length}]);
  };

  const isUserExists = (email) => {
    return users.find(
      (user) => user.email === email
    );
  };

  return {
    users,
    addUser,
    isUserExists,
  };
}
