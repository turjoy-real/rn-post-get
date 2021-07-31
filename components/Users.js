import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get("window");
const diameter = (width-(3*10))/3

const Users = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    
   
        
        <TouchableCmp onPress={props.onSelect} useForeground>
           <View style={styles.circle}>
            <View style={styles.details}>
              <Text style={styles.text}>{props.userName}</Text>
              <Text style={styles.text}>{props.age}</Text>
              <Text style={styles.text}>{props.address}</Text>
              <Text style={styles.text}>{props.activity}</Text>
            </View>
            </View>
        </TouchableCmp>
    
    
  );
};

const styles = StyleSheet.create({
  circle: {
    height: diameter,
    margin: 5,
    width: diameter,
    borderRadius: diameter/2,
    backgroundColor: 'green'
  },
  
  details: {
    alignItems: 'center',
    height: '10%',
    padding: 5,
    textAlign: 'center',
    marginTop:10
  },
  text: {
    fontSize: 12,
    marginVertical: 2,
  
  }
});

export default Users;
