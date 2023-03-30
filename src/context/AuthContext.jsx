// import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// export const AuthContext = createContext(null);

// function AuthProvider({ children }) {
//   let [user, setUser] = useState(null);
//   //   const [user, setUser] = useLocalStorage("user", null);
//   //   const navigate = useNavigate();
//   //   let signout = "signout";
//   let signin = (newUser, callback) => {
//     // return fakeAuthProvider.signin(() => {
//     setUser(newUser);
//     callback();
//     // });
//   };

//   let signout = (callback) => {
//     // return fakeAuthProvider.signout(() => {
//     setUser(null);
//     callback();
//     // };
//   };

//   let value = { user, signin, signout };
//   return (
//     // <Outlet context={[user, setUser]}>
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//     // </Outlet>
//   );
//   //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
// export default AuthProvider;
