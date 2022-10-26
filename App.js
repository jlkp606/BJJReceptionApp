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
    //dropTable();
    createTable();
    setData();
    getData();
  }, []);

  const createTable = () => {
    console.log("create table");
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " +
          "Inventory " +
          "(Item VARCHAR(100), Level VARCHAR(100), Size VARCHAR(100), Quantity INTEGER, UNIQUE(Item, Level, Size))",
        [],
        () => {},
        (err) => console.log(err)
      );
    });
  };

  const dropTable = () => {
    console.log("drop table");
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE Inventory",
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
          "INSERT INTO Inventory (Item, Level, Size, Quantity) VALUES (?,?,?,?)",
          ["Adults Gi", "Blue", "S", 20],
          () => {},
          (err) => console.log(err)
        );
      });
    } catch (error) {
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
          <Inventory data={inventory} />
          <Sales />
          <Orders />
          <Requests />
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
