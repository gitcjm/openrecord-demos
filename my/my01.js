/**
 * 2019-2-20
 */

/* demo01 */

// Setup OpenRecord. Tell it which DB to connect.
const Store =require('openrecord/store/sqlite3');

const store = new Store({
    type: 'sqlite3',
    file: './db/sample.db',
    autoLoad: true,
});

// Open the database, do some operations and close it.
async function openDB() {
    await store.connect();
    await store.ready();
    console.log('connected');
}

async function operateDB() {
    // ...
    console.log('executed');
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

/* demo02 */

// Create a model(M in MVC) which corresponds to a table in databases.
// class Customer extends Store.BaseModel {
// }
// store.Model(Customer);

// Then write a query.
async function operateDB() {
    const customer = await Customer.find(1);
    console.log(customer.FirstName, customer.LastName);
}

/* demo03 */

// Create a model(M in MVC) which corresponds to a table in databases.
class Customer extends Store.BaseModel {
    // static definition() {
    //     this.attribute('CustomerId', 'integer', { primary: true});
    //     this.attribute('FirstName', 'string');
    //     this.attribute('LastName', 'string');
    //     this.validatesPresenceOf('FirstName', 'LastName');
    // }
    //
    // getFullName() {
    //     return this.FirstName + ' ' + this.LastName;
    // }
    //
    // getCustomerId() {
    //     return this.CustomerId;
    // }
    //
    // // failed
    // getCompany() {
    //     return this.Company;
    // }
}
store.Model(Customer);

async function operateDB() {
    const customer = await Customer.find(3);
    console.log(customer.getFullName());
}

// Get a single record by non primary key use where() together with first().
async function operateDB() {
    const customer = await Customer.where({Company: 'Google Inc.'}).first();
    console.log(customer.getFullName());
}

// Get multiple records
async function operateDB() {
    //const customers = await Customer.find([1, 2, 3]);
    const customers = await Customer.get([1, 2, 3]);
    customers.forEach(c => console.log(c.getFullName()));
}

// Limit your result
async function operateDB() {
    const customers = await Customer.limit(5, 10);
    customers.forEach(c => console.log(c.getCustomerId() + ' '
        + c.getFullName()));
}

// To create a new record you could use create() method.
// async function operateDB() {
//     const customer = await Customer.create({
//         Email: '36133@qq.com',
//         FirstName: 'junming',
//         LastName: 'cui',
//         Address: 'yuncheng, shanxi'
//     });
//     console.log(customer.CustomerId + ' ' + customer.FirstName);
// }

// Update record
async function operateDB() {
    const customer = await Customer.find(61);
    await customer.update({
        Address: 'Whitehouse'
    })
    console.log(customer.CustomerId + ' ' + customer.FirstName + ' ' + customer.Address);
}

// Delete record
async function operateDB() {
    const customer = await Customer.find(62);
    await customer.destroy();
}