import DBService from '../../services/DBService/DBService';

// DBService object used for opening up indexeddb.
const DB = new DBService();

// Action types
export const ADD_BUDGET = 'ADD_BUDGET';
export const DELETE_BUDGET = 'DELETE_BUDGET';
export const SAVE_BUDGET = 'SAVE_BUDGET';
export const SET_ALL_BUDGETS = 'SET_ALL_BUDGETS';
export const SET_PASSCODE = 'SET_PASSCODE';

// ----------------------------------------------------------
// Async action creator that fetches all budgets from 
// indexeddb and initializes the budgets in the reducer.
export const initBudgets = () => {
    return dispatch => {
        DB.getAllBudgets().then(result => {
            dispatch(setAllBudgets(result));
          }).catch(error => {
            console.log('Error: ' + error.message);
          })
    }
}
// Sync action creator dispatched by initBudgets if 
// budgets were successfully fetched from indexeddb.
export const setAllBudgets = (budgets) => {
    return {
        type: SET_ALL_BUDGETS,
        budgets: budgets
    };
};

// ----------------------------------------------------------
// Async action creator that fetches the passcode from 
// indexeddb and initializes the passcode in the reducer.
export const initPasscode = () => {
    return dispatch => {
        DB.getPasscode().then(result => {
            dispatch(setPasscodeInState(result));
          }).catch(error => {
            console.log('Error: ' + error.message);
          })
    }
}

// Async action creator that sets the passcode in 
// indexeddb and initializes the passcode in the reducer.
export const setPasscode = passcode => {
    return dispatch => {
        DB.setPasscode(passcode).then(() => {
            dispatch(setPasscodeInState(passcode));
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }
}

// Sync action creator dispatched by initPasscode if 
// the passcode was successfully fetched from indexeddb
// and dispatched by setPasscode if the passcode was 
// successfully set in indexeddb.
export const setPasscodeInState = (passcode) => {
    return {
        type: SET_PASSCODE,
        passcode: passcode
    };
};

// ----------------------------------------------------------
export const addBudget = budget => {
    return dispatch => {
        DB.addBudget(budget).then(() => {
            dispatch(addBudgetToState(budget));
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }
}

export const addBudgetToState = budget => {
    return {
        type: ADD_BUDGET,
        budget: budget
    }
}

// ----------------------------------------------------------
export const saveBudget = budget => {
    return dispatch => {
        DB.addBudget(budget).then(() => {
            dispatch(saveBudgetInState(budget));
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }
}

export const saveBudgetInState = budget => {
    return {
        type: SAVE_BUDGET,
        budget: budget
    }
}

// ----------------------------------------------------------
export const deleteBudget = id => {
    return dispatch => {
        DB.deleteBudget(id).then(() => {
            dispatch(deleteBudgetInState(id));
        }).catch(error => {
            console.log('Error: ' + error.message);
        })
    }
}

export const deleteBudgetInState = id => {
    return {
        type: DELETE_BUDGET,
        id: id
    }
}