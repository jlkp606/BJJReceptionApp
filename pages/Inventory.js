import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import NavTabs from "../components/NavTabs";
import BasicTable from "../components/BasicTable";
import DataTable from "../components/DataTable";
import Orders from "./Orders";

export default function Inventory({ data }) {
  const [itemData, setItemData] = useState({});
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

    const sizing = data.sizeData.reduce((first, second) => {
      const { Item } = second;
      first[Item] = first[Item] ?? [];
      first[Item].push(second.Size);
      return first;
    }, {});

    setSizeData(sizing);

    const coloring = data.colorData.reduce((first, second) => {
      const { Item } = second;
      first[Item] = first[Item] ?? [];
      first[Item].push(second.Color);
      return first;
    }, {});
    console.log(coloring)

    setColorData(coloring);

    console.log(data.colorData)
    console.log(newItemData);
    console.log(dataGroupedByType);
    console.log(data);
    setItemData(newItemData);
  }, [data]);

  return (
    <View>
      { data.length == 0 ? <div>add new table</div> : 
        <NavTabs color="#A0A0A0">
        {Object.keys(itemData).map((itemType) => (
          <div name={itemType} >
            {Object.keys(itemData[itemType]).map((item) => (
              <DataTable data={itemData[itemType][item].itemData} sizeData={sizeData[item]} colorData={colorData[item]} />
            )
          )}
          </div>
        ))}
      </NavTabs>
      }
    </View>
  );
}
