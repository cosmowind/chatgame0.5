import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { saveConversation, getConversation } from '../utils/storage';

interface Message {
  text: string;
  sender: 'user' | 'other';
}

interface ChatUser {
  id: string;
  name: string;
  avatarPath: string;
  systemPromptPath: string;
}

const ChatWindow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [systemPrompt, setSystemPrompt] = useState('');
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([]);
  const [goodTopics, setGoodTopics] = useState<string[]>([]);
  const [badTopics, setBadTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/src/data/users/user${id}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        setChatUser(userData);

        const promptResponse = await fetch(userData.systemPromptPath);
        if (!promptResponse.ok) {
          throw new Error(`HTTP error! status: ${promptResponse.status}`);
        }
        const promptText = await promptResponse.text();
        setSystemPrompt(promptText);

        const storedMessages = getConversation(id!);
        if (storedMessages.length > 0) {
          setMessages(storedMessages);
        } else {
          setMessages([
            { text: '你好！', sender: 'other' },
            { text: '你好！我能为你做些什么？', sender: 'user' },
          ]);
        }

        // 加载好话题和坏话题
        const goodTopicsResponse = await fetch('/src/data/dialogue_options/new_topic_good.json');
        const badTopicsResponse = await fetch('/src/data/dialogue_options/new_topic_bad.json');
        const goodTopicsData = await goodTopicsResponse.json();
        const badTopicsData = await badTopicsResponse.json();
        setGoodTopics(goodTopicsData);
        setBadTopics(badTopicsData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    updateSuggestedResponses();
  }, [messages, goodTopics, badTopics]);

  const updateSuggestedResponses = () => {
    const goodTopic = goodTopics[Math.floor(Math.random() * goodTopics.length)];
    const badTopic = badTopics[Math.floor(Math.random() * badTopics.length)];
    setSuggestedResponses([
      goodTopic,
      badTopic,
      '谢谢分享，我们聊点别的吧。'
    ]);
  };

  const handleSend = async () => {
    if (inputText.trim() === '') return;

    const newMessages = [
      ...messages,
      { text: inputText, sender: 'user' as const },
    ];
    setMessages(newMessages);
    setInputText('');
    saveConversation(id!, newMessages);

    // 使用默认回复
    setTimeout(() => {
      const aiResponse = { text: '这很有趣，能告诉我更多吗？', sender: 'other' as const };
      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
      saveConversation(id!, updatedMessages);
      updateSuggestedResponses(); // 更新建议回复
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {chatUser ? (
        <>
          <div className="bg-white shadow-md p-4 flex items-center">
            <button onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft size={24} />
            </button>
            <div className="w-10 h-10 rounded-full mr-3 overflow-hidden bg-gray-200">
              <img 
                src={chatUser.avatarPath} 
                alt={chatUser.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/src/assets/default-avatar.png';
                }}
              />
            </div>
            <h1 className="text-xl font-semibold">与 {chatUser.name} 聊天</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white">
            <div className="flex space-x-2 mb-2">
              {suggestedResponses.map((response, index) => (
                <button
                  key={index}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                  onClick={() => setInputText(response)}
                >
                  {response}
                </button>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入消息..."
              />
              <button
                onClick={handleSend}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p>加载中...</p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;