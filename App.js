import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import gql from 'graphql-tag'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql'
  }),
  cache: new InMemoryCache()
});

  class App extends Component {
    state = {
      data: ''
    }
    componentDidMount(){
    client.query({
      query: gql `query {
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
    }, () => console.log(this.state)))   
  }
    
    render() {
      return (
        <ApolloProvider client={client}>
        <View style={styles.container}>
          <View style={styles.header}>
      <Text style={styles.headerText}>Text</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text>Open up App.js to start working on your app!</Text>
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