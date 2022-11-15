import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


import {
  View,
  Text,
  FlatList,
  useWindowDimensions
} from 'react-native';

import RenderHTML from "react-native-render-html";


const Other = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>OK</Text>
    </View>
  )
}


const Home = () => {
  const [data, setData] = React.useState([]);
  const { width } = useWindowDimensions();
  React.useEffect(() => {
    fetch('http://protobake.com/protobak_star2/feed_data.json', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response ', JSON.stringify(response));
        setData(response.data);
      })
      .catch((error) => {
        console.log('error ', error);
        setData([]);
      })
  }, []);

  function urlify(text) {
    var urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + '</a>';
    });
  }

  const renderItem = ({ item }) => {
    const stringArray = item.description.split(" ");
    return (
      <View style={{ height: 'auto', width: '90%', elevation: 5, marginVertical: 5, borderWidth: 0.5, borderColor: '#cecece', backgroundColor: '#fff', alignSelf: 'center', borderRadius: 8, padding: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: 50, width: 50, backgroundColor: '#cecece' }} />
          <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
            <Text style={{ color: '#000', fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ color: '#363636' }}>22 mins</Text>
          </View>
        </View>
        <Text style={{marginVertical: 5}}>{urlify(item.description)}</Text>
        {/* <RenderHTML contentWidth={width}
          source={html= urlify(item.description)}
        /> */}
        <View style={{ flexDirection: 'row', height: 40, flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Ionicons name="ellipsis-horizontal-circle" size={12} />
            <Text style={{ fontSize: 11, marginHorizontal: 5 }}>Donate</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Ionicons name="heart" size={12} color={'red'} />
            <Text style={{ fontSize: 11, marginHorizontal: 5 }}>{item.likes_count} Likes</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Fontisto name="commenting" size={12} color={'green'} />
            <Text style={{ fontSize: 11, marginHorizontal: 5 }}>{item.comments_count} Comments</Text>
          </View>
          <View style={{ flexShrink: 1, alignItems: 'flex-end' }}>
            <Ionicons name="ellipsis-horizontal-circle" size={15} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}


export default App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarLabelStyle: {
          textTransform: "uppercase",
        },
        tabBarInactiveTintColor: '#333',
        tabBarIndicatorStyle: {
          height: null,
          top: '10%',
          bottom: '10%',
          width: '45%',
          left: '2.5%',
          borderRadius: 100,
          backgroundColor: "red",
        },
        tabBarStyle: {
          alignSelf: "center",
          width: '100%',
          backgroundColor: "Yellow",
          elevation: 5,
          shadowOpacity: .10,
          shadowRadius: 4,
        }
      }}
        swipeEnabled={true}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Other} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}