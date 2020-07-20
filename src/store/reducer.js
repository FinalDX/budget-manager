const initialState = {
    budgets: [],
    selectedBudget: null,
    modal: {},
    dashboard: {
        showBudgetControls: false,
        date: {
            month: new Date().toLocaleString('default', { month: 'long' }),
            year: new Date().getFullYear() 
        }
    },
    budgetControls: {
        saved: true
    }
}

const reducer = (state = initialState, action) => {
    let updatedBudgets = [...state.budgets];
    switch (action.type) {
        case 'SAVE_BUDGET':
            if (action.budget.id < state.budgets.length) {
                updatedBudgets[action.budget.id] = action.budget;
            } else {
                updatedBudgets.push(action.budget);
            }
            return {...state, budgets: updatedBudgets};
        case 'DELETE_BUDGET':
            updatedBudgets.splice(action.index, 1);
            return {...state, budgets: updatedBudgets};
        default:
            return state;
    } 
};

export default reducer;