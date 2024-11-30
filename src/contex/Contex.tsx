import { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  empId: number;
  empName: String;
  topicsSelected: string[];
}

interface ResponseData {
  message: string;
  userData: UserData;
}

interface ResponseContextType {
  response: ResponseData | null;
  updateResponse: (response: ResponseData) => void;
}

const defaultContextValue: ResponseContextType = {
  response: null,
  updateResponse: () => {},
};

const ResponseContext = createContext<ResponseContextType>(defaultContextValue);

export const useResponse = () => {
  return useContext(ResponseContext);
};

interface ResponseProviderProps {
  children: ReactNode;
}

export const ResponseProvider = ({ children }: ResponseProviderProps) => {
  const [response, setResponse] = useState<ResponseData | null>(null);

  const updateResponse = (newResponse: ResponseData) => {
    setResponse(newResponse);
  };

  return (
    <ResponseContext.Provider value={{ response, updateResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};
