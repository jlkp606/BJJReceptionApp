
import * as SQLite from "expo-sqlite";


export const db = SQLite.openDatabase(
    {
      name: "MainDB.db",
      location: "default",
    },
    () => {},
    (error) => {
      console.log(error);
    }
  );


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

    db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS " +
            "Colors " +
            "( Item VARCHAR(100) , Color VARCHAR(100), UNIQUE(Item, Color))",
          [],
          () => {},
          (err) => console.log(err)
        );
      });
  };

export const dropTables = () => {
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
    db.transaction((tx) => {
        tx.executeSql(
          "DROP TABLE IF EXISTS Colors",
          [],
          () => {},
          (err) => console.log(err)
        );
      });
  };

  const insertItemData = (Item="Kid Gis", ItemType="Gi", Color="Black", Size="M1", Quantity=20) => {
    console.log("set data");
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Inventory (Item, ItemType, Color, Size, Quantity) VALUES (?,?,?,?,?)",
          [Item, ItemType, Color, Size, Quantity],
          () => {},
          (err) => console.log(err)
        );
      });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  export const updateItemData = (item, color, size, quantity) => {
    console.log(item)
    console.log(color)
    console.log(size)
    console.log(quantity)
    try {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Inventory "+
            "SET Quantity = ? "+
            "WHERE Item = ? AND Color = ? AND Size = ?",
            [quantity, item, color, size],
            (tx, results) => {
                console.log(results);
              },
            (err) => console.log(err)
          );
        });
      } catch (error) {
        console.log("error");
        console.log(error);
      }
  }

  const insertSizeData = (item, size) => {
    console.log("set data");
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Sizes (Item, Size) VALUES (?,?)",
          [item, size],
          () => {},
          (err) => console.log(err)
        );
      });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  const insertColorData = (item, color) => {
    console.log("set data");
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO Colors (Item, Color) VALUES (?,?)",
          [item, color],
          () => {},
          (err) => console.log(err)
        );
      });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

let type = {
    "Adult Gis": "Gis",
    "Kid Gis": "Gis",
    "Adult Long Sleeve Rashguards": "Rashguards",
    "Kid Long Sleeve Rashguards": "Rashguards",
    "Adult Short Sleeve Rashguards": "Rashguards",
    "Kid Short Sleeve Rashguards": "Rashguards",
    "Adult Belts": "Belts",
    "Kid Belts": "Belts",
}

let sizes = {
    "Adult Gis": ["F1","F2","F3","A0","A1","A1L","A2","A2L","A3","A3L","A4"],
    "Kid Gis": ["M00","M0","M1","M2","M3","M4"],
    "Adult Long Sleeve Rashguards": ["XS","S","M","L","XL","XXL","XXXL",],
    "Kid Long Sleeve Rashguards": ["YXXS","YXS","S","YM","YL","YXL","YXXL",],
    "Adult Short Sleeve Rashguards": ["XS","S","M","L","XL","XXL","XXXL",],
    "Kid Short Sleeve Rashguards": ["YXXS","YXS","S","YM","YL","YXL","YXXL",],
    "Adult Belts": ["A0","A1","A2","A3","A4",],
    "Kid Belts": ["M0","M1","M2","M3","M4",],
} 

let colors = {
    "Adult Gis": ["White","Blue","Black"],
    "Kid Gis": ["White","Blue","Black"],
    "Adult Long Sleeve Rashguards": ["White","Blue","Purple", "Brown", "Black"],
    "Adult Short Sleeve Rashguards": ["White","Blue","Purple", "Brown", "Black"],
    "Kid Long Sleeve Rashguards": ["White", "Grey","Yellow", "Orange", "Green"],
    "Kid Short Sleeve Rashguards": ["White", "Grey","Yellow", "Orange", "Green"],
    "Adult Belts": ["White","Blue","Purple", "Brown", "Black"],
    "Kid Belts": ["White", "Grey-White","Grey","Grey-Black","Yellow-White", "Yellow", "Yellow-Black", "Orange", "Green"],
}

const populateColorAndSize = () => {
    
    Object.keys(sizes).forEach(item => {
        sizes[item].forEach(size => {
            insertSizeData(item, size);
        })
        colors[item].forEach(color => {
            insertColorData(item, color);
        })
    })
  }

  const populateItems = () => {
    Object.keys(sizes).forEach((item)=> {
        sizes[item].forEach((size)=> {
            colors[item].forEach((color) => {
                insertItemData(item, type[item], color, size, 0)
            })
        })
    })
  }

export const initDB = () => {
    //dropTables();
    createTables();
    populateColorAndSize();
    populateItems();
    insertItemData();
}