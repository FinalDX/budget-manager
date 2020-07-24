import { openDB } from 'idb';

openDB("BUDGET_MANAGER", 1, {
    upgrade(db) {
        db.createObjectStore("Budget_Store");
    }
});

class DBService {

    checkBrowserSupport() {
        if (openDB) {
            return true;
        }
        return false;
    }

    async getAllBudgets() {
        const db = await openDB("BUDGET_MANAGER", 1);
        const allBudgets = await db.getAll("Budget_Store");
        return allBudgets;
    }

    async addBudget(budget) {
        const db = await openDB("BUDGET_MANAGER", 1);
        await db.put("Budget_Store", budget, budget.id);
    }

    async deleteBudget(id) {
        const db = await openDB("BUDGET_MANAGER", 1);
        await db.delete("Budget_Store", id);
    }
}

export default DBService;