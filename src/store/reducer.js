import * as actionTypes from './actions/actions';

const initialState = {
    budgets: null,
    selectedBudget: null
}

const reducer = (state = initialState, action) => {
    let updatedBudgets;
    switch(action.type) {
        case actionTypes.ADD_BUDGET:
            return {
                ...state,
                budgets: [...state.budgets, action.budget]
            };
        case actionTypes.DELETE_BUDGET:
            updatedBudgets = [...state.budgets];
            let index = updatedBudgets.findIndex(budget => budget.id === action.id);
            updatedBudgets.splice(index, 1);
            return {
                ...state,
                budgets: updatedBudgets
            };
        case actionTypes.SAVE_BUDGET:
            updatedBudgets = [...state.budgets];
            let foundIndex = updatedBudgets.findIndex(budget => budget.id === action.budget.id);
            if (foundIndex !== -1) {
                updatedBudgets[foundIndex] = action.budget;
            } else {
                updatedBudgets.push(action.budget);
            }
            return {
                ...state,
                budgets: updatedBudgets
            };
        case actionTypes.SET_ALL_BUDGETS:
            return {
                ...state,
                budgets: action.budgets
            };
        default:
            return state;
    }
};

export default reducer;