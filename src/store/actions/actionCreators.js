import DBService from '../../services/DBService/DBService';
import * as actionTypes from './actionTypes';

// DBService object used for opening up indexeddb.
const DB = new DBService();

// Get the budgets and the passcode from indexeddb
// and set the application state with the retrieved 
// data.
export const initData = () => {
    return async dispatch => {
        // Found error boolean flag.
        let foundError = false;

        // Get all budgets.
        let budgets = DB.getAllBudgets().then(result => {
            dispatch(setAllBudgets(result));
          }).catch(error => {
            console.log('Error: ' + error.message);
            window.alert('Something went wrong :(');
            foundError = true;
          });

        // Get passcode.
        let passcode = DB.getPasscode().then(result => {
            // If a passcode exists, set it in state.
            if (result[0]) {
                dispatch(setPasscodeInState(result[0]));
            }
          }).catch(error => {
            console.log('Error: ' + error.message);
            window.alert('Something went wrong :(');
            foundError = true;
          });
        
        // Wait for promises to be fullfilled.
        await Promise.all([budgets, passcode]);
        // If no errors were found, set dataLoaded to true.
        if (!foundError) {
            dispatch(setLoading());
        }
    }
}

// ----------------------------------------------------------
// Set dataLoaded to true in state. 
// Called after getAllBudgets and getPasscode promises have
// been fullfilled without errors.
export const setLoading = () => {
    return {
        type: actionTypes.DATA_LOADED,
        dataLoading: true
    }
}

// ----------------------------------------------------------
// Action dispatched by initBudgets if 
// budgets were successfully fetched from indexeddb.
export const setAllBudgets = (budgets) => {
    return {
        type: actionTypes.SET_ALL_BUDGETS,
        budgets: budgets
    };
};

// ----------------------------------------------------------
// Set passcode in indexeddb; if successful, set passcode
// in state.
export const setPasscode = passcode => {
    return dispatch => {
        DB.setPasscode(passcode).then(() => {
            dispatch(setPasscodeInState(passcode));
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }
}

// Action dispatched by initData if the passcode was 
// successfully fetched from indexeddb
// and dispatched by setPasscode if the passcode was 
// successfully set in indexeddb.
export const setPasscodeInState = (passcode) => {
    return {
        type: actionTypes.SET_PASSCODE,
        passcode: passcode
    };
};

// ----------------------------------------------------------
// Add or update budget in indexeddb.
export const saveBudget = budget => {
    return dispatch => {
        DB.addBudget(budget).then(() => {
            dispatch(saveBudgetInState(budget));
        }).catch(error => {
            console.log("Error: " + error.message);
        });
    }
}

// Add or update budget in state.
export const saveBudgetInState = budget => {
    return {
        type: actionTypes.SAVE_BUDGET,
        budget: budget
    }
}

// ----------------------------------------------------------
// Delete budget from indexeddb.
export const deleteBudget = id => {
    return dispatch => {
        DB.deleteBudget(id).then(() => {
            dispatch(deleteBudgetInState(id));
        }).catch(error => {
            console.log('Error: ' + error.message);
        })
    }
}

// Delete budget from state.
export const deleteBudgetInState = id => {
    return {
        type: actionTypes.DELETE_BUDGET,
        id: id
    }
}