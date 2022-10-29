import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavTabs from "../components/NavTabs";
import BasicTable from "../components/BasicTable";
import DataTable from "../components/DataTable";
import Orders from "./Orders";

export default function Inventory({ data }) {
  const [tableData, setTableData] = useState({});
  const [sizeData, setSizeData] = useState({});
  const [colorData, setColorData] = useState({});

  useEffect(() => {
    // group array by their item type then grouped by item
    const dataGroupedByType = data.itemData.reduce((first, second) => {
      const { ItemType } = second;
      first[ItemType] = first[ItemType] ?? [];
      first[ItemType].push(second);
      return first;
    }, {});

    let newItemData = {};

    Object.keys(dataGroupedByType).forEach((itemType) => {
      newItemData[itemType] = dataGroupedByType[itemType].reduce(
        (first, second) => {
          const { Item } = second;
          first[Item] = first[Item] ?? [];
          first[Item].itemData =
            first[Item].itemData != null
              ? [second, ...first[Item].itemData]
              : [second];
          console.log(first);
          return first;
        },
        {}
      );
    });
    // console.log(data)
    // data.colorData.forEach((row)=> {
    //   setSizeData(previousState => {
    //     return {...previousState, row.Item}
    //     {row.Item: row.Color}
    //   })
    //   newItemData[row.Item].colorData = 
    //     newItemData[row.Item].colorData != null
    //           ? [row.Color, ...newItemData[row.Item].colorData]
    //           : [row.Color];
    // })

    console.log(data.colorData)
    console.log(newItemData);
    console.log(dataGroupedByType);
    console.log(data);
    setTableData(newItemData);
  }, [data]);

  return (
    <View>
      {/* { data.length == 0 ? <div>add new table</div> : 
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
      } */}
    </View>
  );
}
