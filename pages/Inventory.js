import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavTabs from "../components/NavTabs";
import BasicTable from "../components/BasicTable";
import DataTable from "../components/DataTable";
import Orders from "./Orders";

export default function Inventory({ data }) {

    const [tableData, setTableData] = useState({});

    
    useEffect(()=>{
        // group array by their item type then grouped by item
        const dataGroupedByType = data.reduce((first, second) => {
            const { ItemType } = second;
            first[ItemType] = first[ItemType] ?? [];
            first[ItemType].push(second);
            return first;
        }, {})

        let newData = {};
        
        Object.keys(dataGroupedByType).forEach(itemType => ((
          newData[itemType] = dataGroupedByType[itemType].reduce((first, second) => {
            const { Item } = second;
            first[Item] = first[Item] ?? [];
            first[Item].push(second);
            return first;
        }, {})
      )))
        
        // Object.keys(dataGroupedByType).forEach((itemType) => {
        //     newData[itemType] = {};
        //     newData[itemType][dataGroupedByType[itemType][0].Item] = dataGroupedByType[itemType];
        // })

        
        
        console.log(newData)
        console.log(dataGroupedByType)
        setTableData(newData)
    }, [data])
    
  return (
    <View>
      <NavTabs color="#A0A0A0">
        {Object.keys(tableData).map((itemType) => (
          <div name={itemType} >
            {Object.keys(tableData[itemType]).map((item) => (
              <DataTable data={tableData[itemType][item]} />
            )
          )}
          </div>
        ))}
      </NavTabs>
      
    </View>
  );
}
