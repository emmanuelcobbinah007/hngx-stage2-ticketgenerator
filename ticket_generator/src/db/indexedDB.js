// Helper function to get tickets from localStorage
const getTicketsFromLocalStorage = () => {
  const tickets = localStorage.getItem('tickets');
  return tickets ? JSON.parse(tickets) : [];
};

// Function to save tickets to localStorage
const saveTicketsToLocalStorage = (tickets) => {
  localStorage.setItem('tickets', JSON.stringify(tickets));
};

// Function to add a ticket to localStorage
export const addTicket = (ticket) => {
  try {
    const tickets = getTicketsFromLocalStorage();
    ticket.id = tickets.length ? tickets[tickets.length - 1].id + 1 : 1; // Auto increment ID
    tickets.push(ticket);
    saveTicketsToLocalStorage(tickets);
    console.log("Ticket added:", ticket);
  } catch (error) {
    console.error("Failed to add ticket:", error);
  }
};

// Function to load all tickets from localStorage
export const loadAllTickets = () => {
  try {
    return getTicketsFromLocalStorage();
  } catch (error) {
    console.error("Failed to load tickets:", error);
    return [];
  }
};

// Function to delete a ticket from localStorage
export const deleteTicket = (id) => {
  try {
    let tickets = getTicketsFromLocalStorage();
    tickets = tickets.filter(ticket => ticket.id !== id);
    saveTicketsToLocalStorage(tickets);
    console.log(`Ticket with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete ticket with id ${id}:`, error);
  }
};
