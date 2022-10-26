import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import BasicTable from "../components/BasicTable";
import DataTable from "../components/DataTable";

export default function Inventory({ data }) {

    const [tableData, setTableData] = useState({});

    useEffect(()=>{
        const newData = data.reduce((group, product) => {
            const { Item } = product;
            group[Item] = group[Item] ?? [];
            group[Item].push(product);
            return group;
        }, {});
        setTableData(newData)
        console.log(tableData)
    }, [data])
    
  return (
    <View>
      <Text>Inventory</Text>
      {Object.keys(tableData).map((item) => (
        <DataTable data={tableData[item]} />
      ))}
    </View>
  );
}
