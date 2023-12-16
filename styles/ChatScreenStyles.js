import { StyleSheet } from 'react-native';

export const ChatScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end', // Move the chatbox to the bottom
      backgroundColor: '#171717', 
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      marginBottom:5
    },
    input: {
      flex: 1,
      marginRight: 10,
      borderWidth: 1,
      borderRadius: 30,
      padding: 8,
      backgroundColor: '#333',
      color:'#fff',
      borderColor: '#ccc',
      outlineStyle:'none'
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#eee',
      borderRadius: 8,
      margin: 10,
      padding: 10,
      color: '#fff', 
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#bbb',
      borderRadius: 8,
      margin: 10,
      padding: 10,
      color: '#fff',
    },
    loaderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    loaderText: {
      marginLeft: 5,
      color:'#fff'
    },
  });