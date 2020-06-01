import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {AccordionList} from "accordion-collapse-react-native";
import { Separator } from 'native-base';
import { Colors } from "./Components/Colors";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }
  componentDidMount() {
    return fetch("http://192.168.1.30:3000/users")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _head(item){
    return(
        <Separator bordered style={{alignItems:'center'}}>
          <Text>{item.title}</Text>
        </Separator>
    );
}

_body(item){
    return (
      <View>
        <View style={{padding:10}}>
          <Text style={{textAlign:'center'}}>Origine : {item.origine}</Text>
        </View>
        <View style={{padding:10}}>
          <Text style={{textAlign:'center'}}>Prix : {item.prix}</Text>
        </View>
      </View>
        
    );
}
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
         <AccordionList
            list={this.state.dataSource}
            header={this._head}
            body={this._body}
            keyExtractor={item => `${item.id}`}
          />
    
        </View>
      );
    }
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: Colors.PRIMARY,
  },header: {
   color: 'black',
   fontWeight:'900',
   justifyContent:'center',
   textAlign:'center'

  }
});

export default App;
