import React, { useEffect, useState } from 'react';
import { Button, Modal, TouchableHighlight, StatusBar, View, Text, FlatList, Alert, ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import * as usersActions from '../store/action/users';

import Users from '../components/Users';


const HomeScreen = props => {

  const users = useSelector(state => state.users.currentUsers);

  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [userName, setUserName] = useState(null);
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState(null);
  const [activity, setActivity] = useState(null);
 




  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(usersActions.fetchUsers()).then(() => {
      
      setIsLoading(false);
      
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{marginTop: 100}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  };
 
  if (modalVisible) {
      return(
      <View style={styles.centeredView}>

        <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      }}>

        {/* Details */}
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
         
          <Text style={styles.modalText}>{userName}</Text>
          <Text style={styles.modalText}>{age}</Text>
          <Text style={styles.modalText}>{address}</Text>
          <Text style={styles.modalText}>{activity}</Text>

       
      <View style={{flexDirection: 'row'}}>


          {/* Cancel Button */}
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: 'green' }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          >
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableHighlight>
      </View>
       
      </View>
      
      </View>
      </Modal>
      </View>
      )
  }
 

  return (
    
    <SafeAreaView style={styles.container}>
      
      
        <FlatList 
        data={users}
        // numColumns={3}
        horizontal
        renderItem={itemData => (
           <Users
           userName={itemData.item.userName}
           age={itemData.item.age}
           address={itemData.item.address}
           activity={itemData.item.activity}
           onSelect={ () => {
            setModalVisible(true);
            setUserName(itemData.item.userName);
            setAge(itemData.item.age);
            setAddress(itemData.item.address);
            setActivity(itemData.item.activity);
           }
            
           }
         >
         </Users>
        )} keyExtractor={item => item.id} />
     
<Button title="Add User" onPress={() => {
            props.navigation.navigate('Edit User Details')} }/>
    </SafeAreaView>  
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


export default HomeScreen;
