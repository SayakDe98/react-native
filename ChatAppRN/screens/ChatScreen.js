import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from '../utils/styles'
import {Feather} from '@expo/vector-icons';
import { useState } from 'react';
import socket from '../utils/socket';
import Modal from '../components/Modal';
import ChatComponent from '../components/ChatComponent';

   

const ChatScreen = () => {
    const [rooms, setRooms] = useState([]);
    const [visible, setVisible] = useState(false);
    //👇🏻 Runs when the component mounts
    useLayoutEffect(() => {
        function fetchGroups() {
            fetch("http://192.168.10.33:8000/api")
                .then((res) => res.json())
                .then((data) => setRooms(data))
                .catch((err) => console.error(err));
        }
        fetchGroups();
    }, []);
    
    //👇🏻 Runs whenever there is new trigger from the backend
    useEffect(() => {
        socket.on("roomsList", (rooms) => {
            setRooms(rooms);
        });
    }, [socket]);

  return (
    <SafeAreaView style={styles.chatscreen}>
        {visible ? <Modal setVisible={setVisible} /> : ""}
        <View style={styles.chattopContainer}>
            <View style={styles.chatheader}>
                <Text style={styles.chatheading}>Chats</Text>
                <Pressable onPress={()=>setVisible(true)}>
                    <Feather  name="edit" size={24} color="green" />
                </Pressable>
            </View>
        </View>
        <View style={styles.chatlistContainer}>
            {rooms.length > 0 ? (
                <FlatList 
                data={rooms}
                renderItem={({item})=> <ChatComponent item={item} />}
                keyExtractor={item => item.id} />
            ):(
                <View style={styles.chatemptyContainer}>
                    <Text style={styles.chatemptyText}>No rooms created!</Text>
                    <Text>Click the icon above to create a Chat room</Text>
                    </View>
            )}
        </View>
    </SafeAreaView>
  )
}

export default ChatScreen