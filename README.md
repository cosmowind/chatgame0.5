# 说明

## 运行方式

在根目录启动命令窗口cmd，然后输入，回车，即可运行网页
npm install && npm run dev

## 当前进度

窗口和界面基本完成
本地文件管理逻辑，基本完成
基础功能：提供快捷回答选项

### 当前文件管理逻辑

----src
    |
    |---assets
    |
    |---components
    |   |---BottomNavigation.tsx
    |   |---ChatList.tsx
    |   |---ChatWindow.tsx
    |   |---Profile.tsx
    |
    |---data
    |   |---dialogue_options
    |   |   |---new_topic_bad.json
    |   |   |---new_topic_good.json
    |   |---system_prompts
    |   |   |---user1_prompt.txt
    |   |   |---user2_prompt.txt
    |   |   |---user3_prompt.txt
    |   |   |---user4_prompt.txt
    |   |   |---user5_prompt.txt
    |   |   |---user6_prompt.txt
    |   |   |---user7_prompt.txt
    |   |---users
    |   |   |---user1.json
    |   |   |---user2.json
    |   |   |---user3.json
    |   |   |---user4.json
    |   |   |---user5.json
    |   |   |---user6.json
    |   |   |---user7.json
    |   |---game_state.json
    |   |---player.json
    |
    |---images
    |   |---avatars
    |   |   |---default.jpg
    |   |   |---player.jpg
    |   |   |---user1.jpg
    |   |   |---user2.jpg
    |   |   |---user3.jpg
    |   |   |---user4.jpg
    |   |   |---user5.jpg
    |   |   |---user6.jpg
    |
    |---services
    |   |---api.ts
    |
    |---utils
    |   |---storage.ts
    |
    |---App.tsx
    |---index.css
    |---main.tsx


### 快捷选项说明

三个快捷选项：

1. 开启新的诈骗类话题
2. 开启新的问候类话题
3. 根据当前上下文（主要是正在聊的话题），接入api生成一个符合话题而且符合秦始皇口吻的话题

进展：
1和2的功能可以实现，并且，生成了候补文档，在milanote。https://app.milanote.com/1SUM6a1lkIs01x

## 尚未完成的

1. 接入api的所有工作都没完成：api帮助角色回复，api帮助生成回答。
2. 更加丰富的交互体验（比如更好的头像，cg图片，cg动画）



