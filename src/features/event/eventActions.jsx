//importing components and libraries
import { toastr } from "react-redux-toastr";
import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENT,
  FETCH_MENU
} from "./eventConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData, fetchSampleMenu } from "../../app/data/mockApi";

//handles the done button for help and updates table status in database
export const helpDone = table => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    table.help = false;

    console.log("help try", table);
    try {
      await firestore.update(`TableStatus/${table.id}`, table);
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//handles the done button for help and updates table status in database
export const editItem = (item, menu, id) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    let selected = menu.filter(table => {
      return table.id === id;
    });

    selected[0].calories = item.calories;
    selected[0].description = item.description;
    //selected[0].image = item.image;
    selected[0].name = item.name;
    selected[0].price = item.price;
    //console.log("new new bill", newBill)
    try {
      await firestore.update(`menu/${selected[0].id}`, selected[0]);
    } catch (error) {
      console.log("error", error);
      // console.log("State of newBill", newBill)
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//adds items to bill
export const addToBill = (items, bills) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log(bills);

    bills.items = bills.items.concat(items);
    //console.log("new new bill", newBill)
    try {
      await firestore.update(`ActiveBill/${bills.id}`, bills);
    } catch (error) {
      console.log("error", error);
      // console.log("State of newBill", newBill)
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//button for submision
export const submitOrder = (events, notes) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log("notes before launch", notes);
    const newOrder = {
      TableID: 1,
      ready: false,
      orderNotes: notes,
      items: events
    };
    try {
      await firestore.add(`order`, newOrder);
      toastr.success("Success!", "Order Submitted!");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//handles the done button for refill and updates table status in database
export const refillDone = table => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    table.refill = false;

    console.log("help try", table);
    try {
      await firestore.update(`TableStatus/${table.id}`, table);
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//comp button action to delete an item from bill
export const handleComp = (bill, bills) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    let selected = bills.items.filter(table => {
      return table.id !== bill.id;
    });
    bills.items = selected;
    console.log("bill try", selected);
    console.log("ne items", bills.items);

    try {
      await firestore.update(`ActiveBill/${bills.id}`, bills);
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//handles the done button for reset table and updates table status in database
export const resetDone = table => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    table.refill = false;
    table.active = false;
    table.help = false;
    table.ready = false;

    console.log("help try", table);
    try {
      await firestore.update(`TableStatus/${table.id}`, table);
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//handles the done button for food ready and updates table status in database
export const readyDone = table => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    table.ready = false;

    console.log("ready try", table);
    try {
      await firestore.update(`TableStatus/${table.id}`, table);
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//fetching all the evnts
export const fetchEvents = events => {
  return {
    type: FETCH_EVENT,
    payload: events
  };
};

export const fetchMenu = menu => {
  return {
    type: FETCH_MENU,
    payload: menu
  };
};

//creating events
export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success("Success!", "Event has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//updating events
export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

//deleting event
export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
};

//loads from database
export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

//loads menus
export const loadMenu = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let menu = await fetchSampleMenu();
      dispatch(fetchMenu(menu));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
