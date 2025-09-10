"use client";

import { useState, useEffect } from "react";
import { 
  openCrispChat, 
  closeCrispChat, 
  isCrispLoaded,
  setCrispUserData 
} from "@/lib/crisp";

/**
 * 自定义 Crisp 聊天按钮组件
 * 这是一个可选的组件，展示如何与 Crisp 聊天系统交互
 */
const CrispChatButton = ({ userInfo }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 检查 Crisp 是否已加载
    const checkCrispLoaded = () => {
      if (isCrispLoaded()) {
        setIsLoaded(true);
        
        // 如果有用户信息，设置到 Crisp
        if (userInfo) {
          setCrispUserData(userInfo);
        }
      } else {
        // 如果还没加载，1秒后再检查
        setTimeout(checkCrispLoaded, 1000);
      }
    };

    checkCrispLoaded();
  }, [userInfo]);

  const handleOpenChat = () => {
    if (isLoaded) {
      openCrispChat();
    }
  };

  const handleCloseChat = () => {
    if (isLoaded) {
      closeCrispChat();
    }
  };

  if (!isLoaded) {
    return null; // Crisp 还没加载完成
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <button
        onClick={handleOpenChat}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        aria-label="打开客服聊天"
      >
        💬 联系客服
      </button>
      <button
        onClick={handleCloseChat}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        aria-label="关闭客服聊天"
      >
        ✕ 关闭聊天
      </button>
    </div>
  );
};

export default CrispChatButton;
