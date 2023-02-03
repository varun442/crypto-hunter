import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./components/Config/api";
import { auth } from "./firebase";
const Crypto = createContext();
const CryptContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coinList, setCoinList] = useState([]);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      if(user) setUser(user);
      else setUser(null);
    })
  })

  const fetchCoinList = async () => {
    setloading(true);
    const response = await fetch(CoinList(currency));
    const data = await response.json();
    setCoinList(data);
    setloading(false);
  };
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coinList,
        loading,
        fetchCoinList,
        alert,
        setAlert,
        user
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
