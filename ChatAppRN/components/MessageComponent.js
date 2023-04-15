import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import socket from "../utils/socket";

import { styles } from "../utils/styles";

const MessageComponent = ({ route, navigation, id }) => {
    const [chatMessages, setChatMessages] = useState('');
    //👇🏻 The id passed
    // const {  id } = route?.params;
    // const name = "David";
    // const id = 2;

//...other functions

    //👇🏻 This runs only initial mount
useLayoutEffect(() => {
    // navigation.setOptions({ title: name });
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
}, []);

//👇🏻 This runs when the messages are updated.
useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
}, [socket])

    return <View style={styles.messagingscreen}><Text>...</Text></View>;
};

export default MessageComponent;