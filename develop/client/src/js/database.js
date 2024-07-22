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

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (content) => {console.log('PUT to the database');

//creates a connection to the database and specifies the version
const db = await openDB('jate', 1);

//creates a new transaction and specifies the store and data privilge
const tx = db.transaction('jate', 'readwrite');

//where you want object stored
const store = tx.objectStore('jate');

//PUT to add data to the db
const request = store.put({value: content});

//Get confirmation of request
const result = await request;
console.log ('-data saved to the database', result);

await tx.done;

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {console.log ('GET all from the database');

//create a connection to the db and tells the version
const db = await openDB('jate', 1);

//create a new transaction and tell its privilge
const tx = db.transaction('jate', 'readonly');

//open to where object is stored
const store = tx.objectStore('jate');

//getALL to get all data in db
const request = store.getAll();

//confirmation of request
const result = await request;
console.log('result.value', result);

await tx.done;
return result;
};

initdb();
