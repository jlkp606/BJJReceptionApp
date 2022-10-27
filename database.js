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