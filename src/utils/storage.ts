// 存储对话历史
export const saveConversation = (userId: string, messages: any[]) => {
  localStorage.setItem(`conversation_${userId}`, JSON.stringify(messages));
};

// 获取对话历史
export const getConversation = (userId: string): any[] => {
  const storedConversation = localStorage.getItem(`conversation_${userId}`);
  return storedConversation ? JSON.parse(storedConversation) : [];
};

// 更新游戏状态
export const updateGameState = (newState: any) => {
  localStorage.setItem('game_state', JSON.stringify(newState));
};

// 获取游戏状态
export const getGameState = (): any => {
  const storedState = localStorage.getItem('game_state');
  return storedState ? JSON.parse(storedState) : {
    playerBalance: 1000,
    followers: 3,
    users: [
      { id: "1", mood: 10 },
      { id: "2", mood: 12 },
      { id: "3", mood: 8 },
      { id: "4", mood: 15 },
      { id: "5", mood: 7 },
      { id: "6", mood: 11 },
      { id: "7", mood: 9 }
    ]
  };
};