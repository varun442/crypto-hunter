import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./components/Config/api";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "@firebase/firestore";

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
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  });

  const fetchCoinList = async () => {
    setloading(true);
    const response = await fetch(CoinList(currency));
    const data = await response.json();
    setCoinList(data);
    setloading(false);
  };

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins)
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  console.log(user);
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
        user,
        watchlist,
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
