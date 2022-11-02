import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BasicTable from "./components/BasicTable";
import NavTabs from "./components/NavTabs";
import { NativeRouter, Routes, Route } from "react-router-native";
import Layout from "./pages/Layout";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import Requests from "./pages/Requests";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import {db, initDB , dropTables} from "./database";


export default function App() {
  const [inventory, setInventory] = useState({});

  
  useEffect(() => {
    initDB();

    getColorData();
    getItemData();
    getSizeData();

    //getSizeData();
    //dropTables();
    // console.log(inventory != null)
  }, []);

  const getItemData = () => {
    console.log("get data1");
    try {
        db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Inventory",
          [],
          (tx, results) => {
            console.log("get data3");
            console.log(Array.from(results.rows));
            setInventory(prevState => {
              return {...prevState, itemData: Array.from(results.rows)};
            });
          },
          (err) => {
            console.log("Error");
            console.log(err);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSizeData = () => {
    console.log("get data1");
    try {
        db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Sizes",
          [],
          (tx, results) => {
            console.log("get data3");
            setInventory(prevState => {
              return {...prevState, sizeData: Array.from(results.rows)};
            });
          },
          (err) => {
            console.log("Error");
            console.log(err);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getColorData = () => {
    console.log("get data1");
    try {
        db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Colors",
          [],
          (tx, results) => {
            console.log("get data3");
            setInventory(prevState => {
              return {...prevState, colorData: Array.from(results.rows)};
            });
            // setInventory({...inventory, colorData: Array.from(results.rows)});
          },
          (err) => {
            console.log("Error");
            console.log(err);
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <View style={styles.container}>
      {inventory != {} && inventory.itemData != null && inventory.colorData != null && inventory.sizeData != null ? (
        <NavTabs>
          <Inventory name="Inventory" data={inventory} getItemData={getItemData}/>
          <Sales name="Sales"/>
          <Orders name="Orders"/>
          <Requests name="Requests"/>
        </NavTabs>
      ) : (
        <ReactLoading type={"spinningBubbles"} color={"#000"} height={'20%'} width={'20%'} />
      )}
      {inventory != null ? <>{console.log(inventory)}</>: <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


/**
 * 
 * 
 * make a button/modal to add stuff to the database. using insert query
 */