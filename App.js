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
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';

const db = SQLite.openDatabase(
  {
    name: "MainDB.db",
    location: "default",
  },
  () => {},
  (error) => {
    console.log(error);
  }
);

export default function App() {
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    // dropTables();
    createTables();
    setData();
    getData();
  }, []);

  const createTables = () => {
    console.log("create table");
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Inventory " +
          "(Item VARCHAR(100), ItemType VARCHAR(100), Color VARCHAR(100), Size VARCHAR(100), Quantity INTEGER, UNIQUE(Item, Color, Size))",
        [],
        () => {},
        (err) => console.log(err)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Sizes " +
          "( Item VARCHAR(100) , Size VARCHAR(100), UNIQUE(Item, Size))",
        [],
        () => {},
        (err) => console.log(err)
      );
    });
  };

  const dropTables = () => {
    console.log("drop tables");
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS Inventory",
        [],
        () => {},
        (err) => console.log(err)
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS Sizes",
        [],
        () => {},
        (err) => console.log(err)
      );
    });
  };

  const setData = () => {
    console.log("set data");
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Inventory (Item, ItemType, Color, Size, Quantity) VALUES (?,?,?,?,?)",
          ["Adults Short Sleeve Rashguard","Rashguard", "White", "M", 20],
          () => {},
          (err) => console.log(err)
        );
      });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const getData = () => {
    console.log("get data1");
    try {
      db.transaction((tx) => {
        console.log("get data2");
        tx.executeSql(
          "SELECT * FROM Inventory",
          [],
          (tx, results) => {
            console.log("get data3");
            console.log(results);
            setInventory(Array.from(results.rows));
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
      {inventory != null ? (
        <NavTabs>
          <Inventory name="Inventory" data={inventory} />
          <Sales name="Sales"/>
          <Orders name="Orders"/>
          <Requests name="Requests"/>
        </NavTabs>
      ) : (
        <ReactLoading type={"spinningBubbles"} color={"#000"} height={'20%'} width={'20%'} />
      )}
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
 * tabs for types instead of names
 * 
 * database - add another table for sizing of the item ----> need insert sizes into the table
 * split into different tables
 * add categories to different things like Adult gis would have gi category
 * 
 * make a button/modal to add stuff to the database. using insert query
 */