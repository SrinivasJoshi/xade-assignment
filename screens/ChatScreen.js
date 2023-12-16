import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { createThread, startRun,createMessage,getThreadMessages,checkRunStatus } from '../utils';
import { ChatScreenStyles } from '../styles/ChatScreenStyles';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [threadId, setThreadId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async() => {
    const userMessage = { text: inputText, fromUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setLoading(true);
    await createMessage(threadId,inputText);
    const _runId = await startRun(threadId);

    const intervalId = setInterval(async () => {
        const res = await checkRunStatus(threadId,_runId);
        if (res) {
            clearInterval(intervalId);
            const chatReponse = await getThreadMessages(threadId);
            setMessages((prevMessages) => [...prevMessages, {text:chatReponse,fromUser:false}]);
            setLoading(false);
        }
      }, 3000);
  };

  // Use useEffect to scroll to the end of the list when messages change
  useEffect(() => {
    const scrollToBottom = () => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      };
    scrollToBottom();
  }, [messages]);

  // Use useEffect to create thread
  useEffect(() => {
    const getThreadId = async() =>{
        const res = await createThread();
        setThreadId(res);
    }
    getThreadId();
  }, []);

  // Reference to FlatList for scrolling
  const flatListRef = React.useRef();

  return (
    <View style={ChatScreenStyles.container}>
      {/* FlatList to render the chat messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.fromUser ? ChatScreenStyles.userMessage : ChatScreenStyles.botMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      {/* Loading indicator */}
      {loading && (
        <View style={ChatScreenStyles.loaderContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={ChatScreenStyles.loaderText}>Loading...</Text>
        </View>
      )}
      {/* Input field and Send button for user input */}
      <View style={ChatScreenStyles.inputContainer}>
        <TextInput
          style={ChatScreenStyles.input}
          placeholder="Your request ..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <Button title="Send" 
        onPress={handleSend} 
        />
        
      </View>
    </View>
  );
};

//  const ChatScreenStyles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'flex-end', // Move the chatbox to the bottom
//       backgroundColor: '#171717', 
//     },
//     inputContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 10,
//       marginBottom:5
//     },
//     input: {
//       flex: 1,
//       marginRight: 10,
//       borderWidth: 1,
//       borderRadius: 30,
//       padding: 8,
//       backgroundColor: '#333',
//       color:'#fff',
//       borderColor: '#ccc',
//       outlineStyle:'none'
//     },
//     userMessage: {
//       alignSelf: 'flex-end',
//       backgroundColor: '#eee',
//       borderRadius: 8,
//       margin: 10,
//       padding: 10,
//       color: '#fff', 
//     },
//     botMessage: {
//       alignSelf: 'flex-start',
//       backgroundColor: '#bbb',
//       borderRadius: 8,
//       margin: 10,
//       padding: 10,
//       color: '#fff',
//     },
//     loaderContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: 10,
//     },
//     loaderText: {
//       marginLeft: 5,
//       color:'#fff'
//     },
//   });

export default ChatScreen;
