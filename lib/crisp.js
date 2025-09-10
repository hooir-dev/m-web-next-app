/**
 * Crisp 聊天工具函数
 * 提供与 Crisp 聊天系统交互的方法
 */

// Crisp 网站 ID，可以从环境变量中获取
export const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || "ade48bdc-d2d0-4265-b5d9-cf689d417f6c";

/**
 * 检查 Crisp 是否已加载
 * @returns {boolean}
 */
export const isCrispLoaded = () => {
  return typeof window !== 'undefined' && window.$crisp;
};

/**
 * 打开 Crisp 聊天窗口
 */
export const openCrispChat = () => {
  if (isCrispLoaded()) {
    window.$crisp.push(["do", "chat:open"]);
  }
};

/**
 * 关闭 Crisp 聊天窗口
 */
export const closeCrispChat = () => {
  if (isCrispLoaded()) {
    window.$crisp.push(["do", "chat:close"]);
  }
};

/**
 * 显示 Crisp 聊天按钮
 */
export const showCrispChat = () => {
  if (isCrispLoaded()) {
    window.$crisp.push(["do", "chat:show"]);
  }
};

/**
 * 隐藏 Crisp 聊天按钮
 */
export const hideCrispChat = () => {
  if (isCrispLoaded()) {
    window.$crisp.push(["do", "chat:hide"]);
  }
};

/**
 * 设置用户信息
 * @param {Object} userData - 用户数据
 * @param {string} userData.email - 用户邮箱
 * @param {string} userData.nickname - 用户昵称
 * @param {string} userData.phone - 用户电话
 */
export const setCrispUserData = (userData) => {
  if (isCrispLoaded() && userData) {
    if (userData.email) {
      window.$crisp.push(["set", "user:email", userData.email]);
    }
    if (userData.nickname) {
      window.$crisp.push(["set", "user:nickname", userData.nickname]);
    }
    if (userData.phone) {
      window.$crisp.push(["set", "user:phone", userData.phone]);
    }
  }
};

/**
 * 发送消息到 Crisp 聊天
 * @param {string} message - 要发送的消息
 */
export const sendCrispMessage = (message) => {
  if (isCrispLoaded() && message) {
    window.$crisp.push(["do", "message:send", ["text", message]]);
  }
};

/**
 * 设置会话数据
 * @param {Object} sessionData - 会话数据
 */
export const setCrispSessionData = (sessionData) => {
  if (isCrispLoaded() && sessionData) {
    Object.entries(sessionData).forEach(([key, value]) => {
      window.$crisp.push(["set", "session:data", [[key, value]]]);
    });
  }
};

/**
 * 监听 Crisp 事件
 * @param {string} event - 事件名称
 * @param {function} callback - 回调函数
 */
export const onCrispEvent = (event, callback) => {
  if (isCrispLoaded() && typeof callback === 'function') {
    window.$crisp.push(["on", event, callback]);
  }
};
