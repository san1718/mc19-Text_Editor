import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Updating Database');

  // Opens the database
  const thatDb = await openDB("textedit", 1);
  // Creates new transaction and specifies the database
  const tx = thatDb.transaction("textedit", "readwrite");
  // Opens desired object store
  const store = tx.objectStore("textdone");
  // Uses the .put() method on store and passes id and content
  const request = store.put({ id: 1, value: content});
  // Gets the request
  const result = await request;
  console.log("Data has been updated in the database", result);
};


// Adds logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
