const Store = require('openrecord/store/sqlite3');

const store = new Store({
  type: 'sqlite3',
  file: './db/sample.db',
  autoLoad: true,
});

class Customer extends Store.BaseModel {
  static definition(){
    this.attribute('CustomerId', 'integer', { primary: true });
    this.validatesPresenceOf('FirstName', 'LastName');
  }

  getFullName(){
    return this.FirstName + ' ' + this.LastName;
  }
}

store.Model(Customer);

async function openDB() {
  await store.connect();
  await store.ready();
  console.log('connected');
}

async function operateDB() {
  const customer = await Customer.create({
    Email: 'president@whitehouse.gov',
    FirstName: 'Donald',
    LastName: 'Trump',
    Address: 'Whitehouse, Washington'
  });
  console.log(customer.CustomerId);
}

async function closeDB() {
  await store.close();
  console.log('closed');
}

async function main() {
  await openDB();
  await operateDB();
  await closeDB();
}

main();

