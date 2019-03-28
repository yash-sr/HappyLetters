/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import firebase from 'firebase';


var config = {
  apiKey: "AIzaSyDaZAL7qi3KSBd_0kHrXf8V8e90ZoRzhjI",
  authDomain: "letterbox-e738d.firebaseapp.com",
  databaseURL: "https://letterbox-e738d.firebaseio.com",
  projectId: "letterbox-e738d",
  storageBucket: "letterbox-e738d.appspot.com",
  messagingSenderId: "220139901274"
};
firebase.initializeApp(config);

var dbRefObject = firebase.database().ref();


export default class App extends Component{


 


state={
  letterCount : 1,
  letters: {},
  loading: false
}


componentDidMount(){
  this.setState({loading: true});
 

  firebase.database().ref().on('value', (snap)=>{
    this.setState({loading: false,
    letterCount: snap.val().count,
  letters: snap.val().letter });
    });

}

showLetters(){
  if(this.state.letterCount>=1){
    return Object.keys(this.state.letters).map((letter,i)=>{
      return(
        <TouchableOpacity style={styles.letter}  key={i}>
        <Text style={{fontSize:18,color:'#26251C',letterSpacing:1}}>{this.state.letters[letter].content}</Text>
        <View style={{flexDirection: 'row',}}>
        <Text style={{fontSize:18,color:'#26251C',letterSpacing:1,flex:3,textAlign:'right',paddingRight:15,borderRightWidth:0.5,borderRightColor:'#fcfcfc'}}>{this.state.letters[letter].date}</Text>
        <Text style={{fontSize:18,color:'#26251C',letterSpacing:1,flex:1,paddingLeft:15}}>{this.state.letters[letter].time}</Text>
        </View>
        </TouchableOpacity>
      )
    })

}
  
}

  render() {

    return (
      
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: '#FF1928',fontSize:29,fontWeight: 'bold',marginTop:9}}>"Happy Letters" :)</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.letterNumb}>
          <Text><Text style={{fontSize:20, color:'#26251C',letterSpacing: 5}}>Letters in the box: </Text><Text style={{fontSize:22,color:'#FF1928',fontWeight: 'bold',}}>{this.state.letterCount}</Text></Text>
        </View>
        <ScrollView style={styles.letters}>
          {this.showLetters()}
        </ScrollView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
  backgroundColor: 'white',
  flex:1,
},
header:{
  backgroundColor:'white',
  elevation:1,
  alignItems: 'center',
  height: 60,
},
main:{
  flex:1,
},
letterNumb:{
  // flex:1,
  height:40,
  borderBottomWidth: 3,
  borderBottomColor: '#FF1928',
  backgroundColor: '#fff',
  borderRadius: 10,
  marginHorizontal:30,
  marginVertical:10,
  alignItems: 'center',
},
letters:{
  margin:10,
},
letter:{
  elevation:5,
  backgroundColor:'#FF8282',
  // height:80,
  borderRadius:10,
  margin:6,
  padding:10,
}
});
