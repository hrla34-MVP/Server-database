import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import gql from 'graphql-tag'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://geofencing-notification.herokuapp.com/graphql'
    // uri: 'http://localhost:8000/graphql' --> for development / testing
  }),
  cache: new InMemoryCache()
});

  class App extends Component {
    state = {
      data: ''
    }

    
    getAll = function() {
      client.query({
        query: gql `
        query areas {
          areas {
            name
            latitude
            longitude
            radius
            enter
            exit
            title
            body
          }
        }`
      }).then(response => this.setState({
        data: response.data.areas
      }, () => console.log(this.state)));
    };

    componentDidMount(){

      //get all areas   

  //  client.query({
  //     query: gql `
  //     query areas {
  //       areas {
  //         name
  //         latitude
  //         longitude
  //         radius
  //         enter
  //         exit
  //         title
  //         body
  //       }
  //     }`
  //   }).then(response => this.setState({
  //     data: response.data.areas
  //   }, () => console.log(this.state)));
    
    //get one area's information based on its name

    // client.query({
    //   variables: {"name": "mongo"},
    //   query: gql `
    //   query area ($name: String!) {
    //     area (name: $name) {
    //       name
    //       latitude
    //       longitude
    //       radius
    //       enter
    //       exit
    //       title
    //       body
    //     }
    //   }`
    // }).then(response => this.setState({
    //   data: response.data.area
    // }, () => console.log(this.state)));

     //create an Area --> must enter all parameters name/latitude/longitude/radius/enter/exit/title/body

    client.mutate({
     variables: {"name": "mongo2", "latitude": 1212.1, "longitude": -121.2, "radius": 20, "enter": true, "exit": true, "title": "welcome", "body": "youve got mail"},
     mutation: gql`
     mutation createArea ($name: String!, $latitude: Float!, $longitude: Float!, $radius: Int!, $enter: Boolean!, $exit: Boolean!, $title: String!, $body: String!) {
       createArea (name: $name, latitude: $latitude, longitude: $longitude, radius: $radius, enter: $enter, exit: $exit, title: $title, body: $body) {
         name
         latitude
         longitude
         radius
         enter
         exit
         title
         body
       }
     }`
    }).then(response => console.log(response))
    .catch(err => console.error(err));
  

  //update an Area -- must include name, then optional latitude/longitude/radius

  // client.mutate({
  //   variables: {"name": "hello", "latitude": -12.2, "longitude": -40.2, "radius": 199},
  //   mutation: gql`
  //   mutation updateArea ($name: String!, $latitude: Float, $longitude: Float, $radius: Int) {
  //     updateArea (name: $name, latitude: $latitude, longitude: $longitude, radius: $radius) {
  //       name
  //       latitude
  //       longitude
  //       radius
  //     }
  //   }`
  //  }).then(response => console.log(response))
  //  .catch(err => console.error(err))

  //delete an Area based on its name

  // client.mutate({
  //   variables: {"name": "mongo"},
  //   mutation: gql`
  //   mutation deleteArea ($name: String!) {
  //     deleteArea (name: $name) {
  //       name
  //     }
  //   }`
  //  }).then(response => console.log(response))
  //  .catch(err => console.error(err));

  //update an Event -- must include area name, then optional enter/exit/title/goodbye parameters

  //  client.mutate({
  //   variables: {"name": "hello", "enter": false, "exit": false, "title": "goodbye", "body": "have a nice day"},
  //   mutation: gql`
  //   mutation updateEvent ($name: String!, $enter: Boolean!, $exit: Boolean!, $title: String!, $body: String!) {
  //     updateEvent (name: $name, enter: $enter, exit: $exit, title: $title, body: $body) {
  //       name
  //       enter
  //       exit
  //       title
  //       body
  //     }
  //   }`
  //  }).then(response => console.log(response))
  //  .catch(err => console.error(err))

  //delete an Event based on the name of the area

  // client.mutate({
  //   variables: {"name": "hello"},
  //   mutation: gql`
  //   mutation deleteEvent ($name: String!) {
  //     deleteEvent (name: $name) {
  //       name
  //     }
  //   }`
  //  }).then(response => console.log(response))
  //  .catch(err => console.error(err));


};
    render() {
      return (
        <ApolloProvider client={client}>
        <View style={styles.container}>
          <View style={styles.header}>
      <Text style={styles.headerText} onPress = {() => this.getAll()}>Text</Text>
          </View>
          <View style={styles.contentContainer}>
      {this.state.data.length > 0 ?       <Text>{this.state.data[0].name}</Text>
: null}
          </View>
        </View>
        </ApolloProvider>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App