import { openDB } from 'idb';

const DATABASE_NAME = 'BUDGET_MANAGER';
const DATABASE_VERSION = 2;


openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
        switch(oldVersion) {
            case 0:
                db.createObjectStore("Budget_Store");
            // falls through
            case 1:
                db.createObjectStore("User_Store");
                break;
            default:
                console.error('Unknown DB version');
        }
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
        const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
        const allBudgets = await db.getAll("Budget_Store");
        return allBudgets;
    }

    async addBudget(budget) {
        const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
        await db.put("Budget_Store", budget, budget.id);
    }

    async deleteBudget(id) {
        const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
        await db.delete("Budget_Store", id);
    }

    async getPasscode() {
        const db = await openDB(DATABASE_NAME);
        const userPasscode = await db.getAll('User_Store');
        return userPasscode;
    }

    async setPasscode(passcode) {
        const db = await openDB(DATABASE_NAME, DATABASE_VERSION);
        await db.put('User_Store', passcode, passcode.id);
    }
}

export default DBService;