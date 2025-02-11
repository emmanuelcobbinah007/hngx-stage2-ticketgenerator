import { openDB } from 'idb';

const DB_NAME = 'ticketDB';
const DB_VERSION = 1;
const STORE_NAME = 'tickets';

// Open the database and handle upgrades
export const openDatabase = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          console.log('Object store created');
        }
      }
    });
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
  }
};

// Function to add ticket to IndexedDB
export const addTicket = async (ticket) => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await store.add(ticket);
    await tx.done;  // Ensure transaction is completed
    console.log("Ticket added:", ticket);
  } catch (error) {
    console.error("Failed to add ticket:", error);
  }
};

// Function to load all tickets in IndexedDB
export const loadAllTickets = async () => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    // Get all tickets and return as an array
    const allTickets = await store.getAll();
    await tx.done;
    return allTickets;
  } catch (error) {
    console.error("Failed to load tickets:", error);
  }
};

// Function to delete ticket from IndexedDB
export const deleteTicket = async (id) => {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await store.delete(id);
    await tx.done;
    console.log(`Ticket with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete ticket with id ${id}:`, error);
  }
};
