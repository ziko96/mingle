import { createContext, useReducer, useContext } from 'react';

// Websocket state management
// User authentication context
// Room management

type ChatState = {
  messages: Message[];
  currentRoom: string | null;
  isConnected: boolean;
  participants: string[];
};

type Action = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_ROOM'; payload: string }
  | { type: 'SET_CONNECTION'; payload: boolean }
  | { type: 'SET_PARTICIPANTS'; payload: string[] };

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};