
import React from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';
import { Outlet, Link } from 'react-router-native';
import BasicTable from '../components/BasicTable';
import NavTabs from '../components/NavTabs';

export default function Layout() {
    return (
    <View >
        {/* <Button title="push me" onPress={()=> {history.push("/inventory")}}></Button> */}
        <NavTabs></NavTabs>
        <Outlet></Outlet>
        <View >
      <Link
          to="/inventory"
          underlayColor="#f0f4f7"
        >
          <Text>Topics</Text>
        </Link>
      </View>
      </View>
    );
}