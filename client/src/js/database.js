import { openDB } from "idb";

const initdb = async () =>
  openDB("textedit", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("textedit")) {
        console.log("textedit database already exists");
        return;
      }
      // Creates object store for textedit with autoIncrement for the id
      db.createObjectStore("textedit", { keyPath: "id", autoIncrement: true });
      console.log("textedit database created");
    },
  });

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Updating Database");

  // Opens the database
  const thatDb = await openDB("textedit", 1);
  // Creates new transaction and specifies the database
  const tx = thatDb.transaction("textedit", "readwrite");
  // Opens desired object store
  const store = tx.objectStore("textedit");
  // Uses the .put() method on store and passes id and content
  const request = store.put({ id: 1, value: content });
  // Gets the request
  const result = await request;
  console.log("Data has been updated in the database", result.value);
};

// Adds logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  const thatDb = await openDB("textedit", 1);
  const tx = thatDb.transaction("textedit", "readonly");
  const store = tx.objectStore("textedit");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);

  return result?.value;
};

// Initializes the database
initdb();
