import { SafeAreaView } from "react-native";
import { Stack } from 'expo-router';
import ChatScreen from "../screens/ChatScreen";

const Home = ()=>{
    return(
        <SafeAreaView style={{flex:1}}>
           <Stack.Screen 
            options={{
                headerStyle:{backgroundColor:'#171717'},
                headerShadowVisible:false,
                headerTitle:"Degen AI",
                headerTitleStyle: {
                    color: '#FFF'
                },
                headerTitleAlign: 'center', // This line centers the title
            }}
           />
           <ChatScreen />
        </SafeAreaView>
    )
} 
export default Home;
