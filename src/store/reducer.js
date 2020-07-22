const initialState = {
    budgets: [],
    selectedBudget: null
}

// If the budget already exists in the budgets array in the 
// state, then update the existing budget.
// If the budget does not exist, add it to the budgets array.
const saveBudget = (state, budget) => {
    let updatedBudgets = [...state.budgets];
    if (budget.id < state.budgets.length) {
        updatedBudgets[budget.id] = budget;
    } else {
        updatedBudgets.push(budget);
    }
    return {...state, budgets: updatedBudgets};
};
// ----------------------------------------------------------

// Delete the budget from the budgets array in the state by 
// using the index.
const deleteBudget = (state, index) => {
    let updatedBudgets = [...state.budgets];
    updatedBudgets.splice(index, 1);
    return {...state, budgets: updatedBudgets};
}
// ----------------------------------------------------------

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_BUDGET':
            return saveBudget(state, action.budget);
        case 'DELETE_BUDGET':
            return deleteBudget(state, action.index);
        case 'SELECT_BUDGET':
            return {...state, 
                selectedBudget: action.selectedBudget,
                show: 'BudgetControls'
            }
        default:
            return state;
    } 
};

export default reducer;