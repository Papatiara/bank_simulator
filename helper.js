class Client {
    constructor(id, value) {
        this.id = id;
        this.balance = value;
    }
}


var Transactions = function () {
    this.clientIdList = [];
    this.clientList = [];
}
// Balance method
// input => id (integer)
// output integer => (balance) 
Transactions.prototype.balance = function (id) {
    if (!this.clientIdList.includes(id)) {
        return false;
    } else {
        return this.clientList[id].balance
    }
}
// Deposit method
// Create a new account if id was never seen
// input => id (integer) and amount (integer)
// output JSON => (new balance, id) 
Transactions.prototype.deposit = function (id, value) {
    if (this.clientIdList.includes(id)) {
        this.clientList[id].balance = this.clientList[id].balance + value;
        return { "destination": { "id": `${id}`, "balance": this.clientList[id].balance } };
    } else {
        const newClient = new Client(id, value);
        this.clientList[id] = (newClient);
        this.clientList[id].balance = value;
        this.clientIdList.push(id);
        return { "destination": { "id": `${id}`, "balance": value } };
    }
}
// Withdraw method
// input => id (integer) and amount (integer)
// output JSON => (new balance, id) // return false if cliend is not found

Transactions.prototype.withdraw = function (id, value) {
    if (this.clientIdList.includes(id)) {
        this.clientList[id].balance = this.clientList[id].balance - value;
        return { "origin": { "id": `${id}`, "balance": this.clientList[id].balance } };
    } else {
        return false;
    }
}

// Transfer method
// input => id (integer) and amount (integer)
// reuse deposit and withdraw logig
// output String (type of Json) => (new balance, id) // return false if cliend is not found

Transactions.prototype.transfer = function (idFrom, idTo, value) {
    if (this.clientIdList.includes(idFrom)) {
        return `{"origin":${JSON.stringify(this.withdraw(idFrom, value).origin)}, "destination": ${JSON.stringify(this.deposit(idTo, value).destination)}}`
    } else {
        return false;
    }
}

module.exports = new Transactions(0, 0);