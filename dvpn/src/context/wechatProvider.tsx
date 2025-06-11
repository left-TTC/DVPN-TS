import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { isWeChat } from "@/utils/isWechat";




const WeChatContext  = createContext<boolean>(false);

interface WeChatProviderProps {
    children: ReactNode;
}

export const WeChatProvider: React.FC<WeChatProviderProps> = ({ children }) => {
    const isWechat = isWeChat();
    return (
        <WeChatContext.Provider value={isWechat}>
            {children}
    </WeChatContext.Provider>
    );
};

export const useWeChatContext = (): boolean => {
    return useContext(WeChatContext);
};

