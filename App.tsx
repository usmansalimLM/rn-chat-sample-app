import {
  initMyClient,
  Themes,
} from "@likeminds.community/chat-rn-core";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";

import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CarouselScreen,
  CreatePollScreen,
  ImageCropScreen,
  PollResult,
  VideoPlayer,
  ExploreFeed,
  HomeFeed,
  LMOverlayProvider,
  ReportScreen,
  ImageScreen,
  ViewParticipants,
  AddParticipants,
  DmAllMembers,
  SearchInChatroom,
  CommunityChatScreen,
  ScreenName,
  FileUploadScreenWrapper,
  ChatroomScreenWrapper,
} from "@likeminds.community/chat-rn-core";
import { ConversationState } from "@likeminds.community/chat-rn";

const Stack = createStackNavigator();

const App = () => {
  const [myClient, setMyClient] = useState<any>();
  const apiKey = "44c71864-19eb-4af9-beb7-f6de8a71944e";
  const userName = "John Doe";
  const uuid = "1234567890";
  const theme = Themes.COMMUNITY_HYBRID

  useEffect(() => {
    async function generateClient() {
      const res: any = initMyClient([
        ConversationState.MEMBER_LEFT_OPEN_CHATROOM,
      ]);
      setMyClient(res);
    }
    generateClient();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {userName && uuid && apiKey && myClient ? (
        <LMOverlayProvider
          myClient={myClient}
          apiKey={apiKey}
          userName={userName}
          userUniqueId={uuid}
          theme={theme}
        >
        <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenName.CommunityChatScreen}>
          <Stack.Screen
            name={ScreenName.CommunityChatScreen}
            component={CommunityChatScreen}
          />
          <Stack.Screen
            name={ScreenName.SearchInChatroom}
            component={SearchInChatroom}
            options={{
              gestureEnabled: Platform.OS === "ios" ? false : true,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ScreenName.ExploreFeed}
            component={ExploreFeed}
            initialParams={{
              backIconPath: "",
              filterIconPath: "",
              participantsIconPath: "",
              totalMessagesIconPath: "",
              joinButtonPath: "",
              joinedButtonPath: "",
            }}
          />
          <Stack.Screen
            name={ScreenName.Chatroom}
            component={ChatroomScreenWrapper}
            options={{
              gestureEnabled: Platform.OS === "ios" ? false : true,
            }}
          />
          <Stack.Screen
            options={{
              gestureEnabled: Platform.OS === "ios" ? false : true,
            }}
            name={ScreenName.FileUpload}
            component={FileUploadScreenWrapper}
            initialParams={{
              backIconPath: "", // add your back icon path here
              imageCropIcon: "", // add your image crop icon path here
            }}
          />
          <Stack.Screen name={ScreenName.VideoPlayer} component={VideoPlayer} />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name={ScreenName.CarouselScreen}
            component={CarouselScreen}
            initialParams={{
              backIconPath: "", // add your back icon path here
            }}
          />
          <Stack.Screen
            options={{ gestureEnabled: false }}
            name={ScreenName.PollResult}
            component={PollResult}
          />
          <Stack.Screen
            name={ScreenName.CreatePollScreen}
            component={CreatePollScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={ScreenName.ImageCropScreen}
            component={ImageCropScreen}
          />
          <Stack.Screen name={ScreenName.Report} component={ReportScreen} />
          <Stack.Screen name={ScreenName.ImageScreen} component={ImageScreen} />
          <Stack.Screen
            name={ScreenName.ViewParticipants}
            component={ViewParticipants}
          />
          <Stack.Screen
            name={ScreenName.AddParticipants}
            component={AddParticipants}
          />
          <Stack.Screen
            name={ScreenName.DmAllMembers}
            component={DmAllMembers}
          />
        </Stack.Navigator>
      </NavigationContainer>
        </LMOverlayProvider>
      ) : null}
    </GestureHandlerRootView>
  );
};

export default App;
