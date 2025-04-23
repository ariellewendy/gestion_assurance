// // src/contexts/AuthContext.jsx
// import React, { createContext, useState, useEffect } from 'react';
// // import { fetchUser, logout } from '../api/auth';

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Au montage, on essaie de récupérer l’utilisateur
//   useEffect(() => {
//     fetchUser()
//       .then(res => setUser(res.data))
//       .catch(() => setUser(null));
//   }, []);

  
//   const signOut = async () => {
//     await logout();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
