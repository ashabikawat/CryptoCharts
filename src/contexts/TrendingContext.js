import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { TrendingCoins } from "../api/api";
import useCryptoContext from "./CryptoContext";

const TrendingContext = createContext();

export const useTrendingContext = () => {
  return useContext(TrendingContext);
};

export const TrendingProvider = ({ children }) => {
  const [trending, setTrending] = useState([]);
  const { currency } = useCryptoContext();

  const fetchTrending = useCallback(async () => {
    const response = await fetch(TrendingCoins(currency));
    const data = await response.json();
    setTrending(data);
  }, [currency]);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  const memoizedTrending = useMemo(() => trending, [trending]);

  return (
    <TrendingContext.Provider value={{ trending: memoizedTrending }}>
      {children}
    </TrendingContext.Provider>
  );
};
