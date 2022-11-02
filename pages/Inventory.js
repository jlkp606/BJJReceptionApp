import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "@mui/material";
import NavTabs from "../components/NavTabs";
import BasicTable from "../components/BasicTable";
import DataTable from "../components/DataTable";
import Orders from "./Orders";

export default function Inventory({ data , getItemData}) {
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

    setColorData(coloring);
    setItemData(newItemData);
  }, [data]);

  return (
    <View>
      { data.length == 0 ? <div>add new table</div> : 
        <NavTabs color="#A0A0A0">
        {Object.keys(itemData).map((itemType) => (
          <div name={itemType} >
            <Stack spacing={2}>
            {Object.keys(itemData[itemType]).map((item) => (
              <DataTable data={itemData[itemType][item].itemData} sizeData={sizeData[item]} colorData={colorData[item] } getItemData={getItemData} />
            )
          )}
          </Stack>
          </div>
        ))}
      </NavTabs>
      }
    </View>
  );
}
