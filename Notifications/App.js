import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false//shows a badge to app icon if there is unhandled error
    }
  }//handleNotification is not optional
});//tells how incoming notifications for this app should be handled. Must run once when this app starts. It's best here because App.js is entry point

export default function App() {
  useEffect(() => {
    async function configurePushNotifications () {
      const { status } = await Notifications.getPermissionsAsync();//tells current permission status of app in the device
      let finalStatus = status;

      if(finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();//requests permission since we don't have them
        finalStatus = status;
      }

      if(finalStatus !== 'granted') {
        Alert.alert('Permission required',
        'Push Notifications need the appropriate permissions.'
        );
        return;
      }
      //we have neccessary permissions
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokenData);

      if(Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,//default importance. Don't always send imp to high and annoy users
        });//checks on which channel noti should be recieved
      }
    }
    configurePushNotifications();
  },[]);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(notification => {
      console.log('NOTIFICATION RECIEVED');
      console.log(notification);
      const userName = notification.request.content.data.userName;
      console.log(userName);
    });//whenever a noti is recieved by user we have event handlers for those

    const subscription2 = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('NOTIFICATION TAPPED');
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(userName);
    });//event listener for tapping on notification
    return () => {
      subscription1.remove();//when notification is removed we cleanup
      subscription2.remove();//when notification is removed we cleanup
    };
  }, []);

  async function scheduleNotifcationHandler () {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification.',
        data: {
          userName: 'Sayak'//not directly visible to user
        }
      },
        trigger: {
          seconds: 5//we wait for 5sec for noti to trigger
        }
    });
  }

  function sendPushNotificationHandler () {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[94Uo6jB2u3YaV_gTDvGZ5z]',
        title: 'Test - sent from a device!',
        body: 'This is a test!'
      })
    });
  }

  return (
    <View style={styles.container}>
      <Button title='Schedule Notification' onPress={scheduleNotifcationHandler}/>
      <Button title='Send Push Notification' onPress={sendPushNotificationHandler}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
