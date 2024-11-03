import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import About from '../screens/About';
import { Ionicons, FontAwesome5, Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const AppNavigator=()=> {
    return (
        <Tab.Navigator
        screenOptions={{
            headerStyle: {
              height: 40
            },
            tabBarStyle: {
                height:55,
                backgroundColor: '#ffffff',
                paddingTop:5,
                paddingBottom:5
            },
          }}>
            <Tab.Screen name="Audio List" component={AudioList}
            options={{
                tabBarIcon:({color, size})=>{return <Ionicons name="headset" size={size} color={color} />}
            }}/>
            <Tab.Screen name="Player" component={Player} 
            options={{
                tabBarIcon:({color, size})=>{return <FontAwesome5 name="compact-disc" size={size} color={color} />}
            }}/>
            <Tab.Screen name="About" component={About} 
            options={{
                tabBarIcon:({color, size})=>{return <Entypo name="info" size={18} color={color} />}
            }}/>
        </Tab.Navigator>
    );
}

export default AppNavigator;