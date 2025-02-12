import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// Mock users database - in a real app, this would be in your backend
const MOCK_USERS = [
  {
    email: 'test@example.com',
    password: 'password123',
    username: 'TestUser',
    joinDate: 'February 2024',
    stats: {
      problemsSolved: 150,
      currentRating: 1550,
      highestRating: 1600,
      contests: 25
    },
    platforms: {
      leetcode: 'testuser_lc',
      codeforces: 'testuser_cf',
      codechef: 'testuser_cc'
    }
  }
];

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Ishita Adhikari',
    displayName: 'Ishita Adhikari',
    stats: {
      problemsSolved: 20,
      currentRating: 0,
      highestRating: 0,
      contests: 0
    }
  });
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
  });

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever users change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Update localStorage whenever current user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const registerUser = (userData) => {
    // Create new user
    const newUser = {
      ...userData,
      password: userData.password, // In real app, this should be hashed
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };

    // Add to users list
    setUsers(prevUsers => [...prevUsers, newUser]);
    
    // Log in the new user
    setUser(newUser);
  };

  const loginUser = (credentials) => {
    const foundUser = users.find(u => u.email === credentials.email);
    
    if (foundUser && foundUser.password === credentials.password) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    setUser(prevUser => {
      const newUserData = { ...prevUser, ...updatedData };
      
      // Update user in users array
      setUsers(prevUsers => 
        prevUsers.map(u => 
          u.email === prevUser.email ? newUserData : u
        )
      );
      
      return newUserData;
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      registerUser, 
      loginUser, 
      logoutUser,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 