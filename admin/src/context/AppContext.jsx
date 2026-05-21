import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
   
  const currency = '$';
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0) {
          age--;
      }
      return age;
  };

  const value = {
      calculateAge,
      currency,
      sideMenuOpen,
      setSideMenuOpen
  };

  return (
      <AppContext.Provider value={value}>
          {children}
      </AppContext.Provider>
  );
};

export default AppContextProvider;