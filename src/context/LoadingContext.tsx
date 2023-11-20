import { createContext } from 'react';
import { useState, useContext } from 'react';
import { PageLoading } from '@/components/atoms';

export const LoadingContext = createContext({
  setIsPageLoading: (values: boolean) => {},
  isPageLoading: true,
});

export const useLoadingContext = () => {
  const loadingContext = useContext(LoadingContext);

  if (loadingContext === null) {
    throw new Error('Error retrieving loading context.');
  }
  return loadingContext;
};

export const LoadingProvider = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ setIsPageLoading, isPageLoading }}>
      {children}
      {isPageLoading && <PageLoading />}
    </LoadingContext.Provider>
  );
};
