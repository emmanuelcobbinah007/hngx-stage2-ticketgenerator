import { openDB } from 'idb';

const DB_NAME = 'ticketDB';
const DB_VERSION = 1;
const STORE_NAME = 'tickets';

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        console.log('Object store created');
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e);
  });
};

// Function to add ticket to IndexedDB
export const addTicket = async (ticket) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.add(ticket);
    console.log("Ticket added:", ticket);
  } catch (error) {
    console.error("Failed to add ticket:", error);
  }
};

// Function to load all tickets in IndexedDB
export const loadAllTickets = async () => {
  const db = await openDB('ticketDB', 1);
  const transaction = db.transaction('tickets', 'readonly');
  const store = transaction.objectStore('tickets');
  const allTickets = await store.getAll();  // This is still an IDBRequest

  return allTickets;  // Make sure to return this directly
};

// Function to delete ticket from IndexedDB
export const deleteTicket = async (id) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);  // Use the correct DB name and version
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.delete(id);
    await tx.done;
    console.log(`Ticket with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete ticket with id ${id}:`, error);
  }
};