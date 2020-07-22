import * as idb from 'idb';


//https://hackernoon.com/use-indexeddb-with-idb-a-1kb-library-that-makes-it-easy-8p1f3yqq
const DATABASE_NAME = 'BUDGET_LISTS';
const DATABASE_VERSION = 2;
const db = idb.default;

export const BUCKETS = ['Bucket01', 'Bucket02']
export const BUSINESS_UNITS = ['BU1', 'BU2', 'BU3', 'BU4', 'BU5']
export const STATUS = ['In Progress', 'Completed', 'Pending']

const dbPromise = db.open(DATABASE_NAME, DATABASE_VERSION, function (upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      break;
    case 1:
      // Update object store
      upgradeDb.createObjectStore('BudgetStore', { keyPath: 'id' });
      const budgetStore = upgradeDb.transaction.objectStore('BudgetStore', 'readwrite')
      // Assign indexes
      budgetStore.createIndex('Budgets', 'budgets');
      break;
    default:
      break;
  }
});

class DBService {

  get(tablespace, key) {
    return dbPromise.then(db => {
      return db.transaction(tablespace).objectStore(tablespace).get(key);
    }).catch(error => {
      // Do something?
    });
  }

  getAll(tablespace, indexName, index = []) {
    return dbPromise.then(db => {
      return db.transaction(tablespace).objectStore(tablespace).index(indexName).getAll(index);
    }).catch(error => {
      // Do something?
    });
  }

  put(tablespace, object, key = null) {
    return dbPromise.then(db => {
      if (key) {
        return db.transaction(tablespace, 'readwrite').objectStore(tablespace).put(object, key);
      }
      return db.transaction(tablespace, 'readwrite').objectStore(tablespace).put(object);
    }).catch(error => {
      // Do something?
    });
  }

  delete(tablespace, key) {
    return dbPromise.then(db => {
      return db.transaction(tablespace, 'readwrite').objectStore(tablespace).delete(key);
    }).catch(error => {
      // Do something?
    });
  }

  deleteAll(tablespace) {
    return dbPromise.then(db => {
      return db.transaction(tablespace, 'readwrite').objectStore(tablespace).clear();
    }).catch(error => {
      // Do something?
    });
  }
}

export default DBService;