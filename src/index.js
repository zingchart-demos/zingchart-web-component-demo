import transactions from './transactions.js'
import '../node_modules/zinggrid/es6.js';
import '../node_modules/zingchart/es6.js';

let sorted = transactions.slice(0).sort((a,b) => a.timestamp - b.timestamp);
sorted = sorted.map(o => {
  return [o.timestamp, parseFloat(o.amount.slice(1,-1))]
});

let latestTransactionsRef = document.querySelector("[latest-transactions]");
let totalSalesSparkRef = document.querySelector("[total-sales-spark]");
let totalYTDSparkRef = document.querySelector("[total-ytd-spark]");
console.log(latestTransactionsRef, totalSalesSparkRef, totalYTDSparkRef)
let zgRef = document.querySelector("zing-grid");
let range = {
  start: new Date('1/1/19'),
  end: new Date('1/31/19')
}

latestTransactionsRef.querySelector('zc-series-0').setAttribute('values', accumulatedValues());
totalSalesSparkRef.querySelector('zc-series-0').setAttribute('values', accumulatedValues())
totalYTDSparkRef.querySelector('zc-series-0').setAttribute('values', accumulatedValues())


zgRef.setData(transactions);


function accumulatedValues() {
  let total = 0;
  const result = transactions.map(
    entry => (total += parseFloat(entry.amount))
  );
  return `[${result}]`;
};

function values() {
  let totals = transactions.map(
    (tran)=> (parseFloat(tran.amount))
  )
  return `[${totals}]`
}


function formatValue(value) {
  return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
}

function getTransactions() {
  return transactions.filter(entry => {
    return (
      entry.timestamp >= range.start.getTime() &&
      entry.timestamp < range.end.getTime()
    );
  });
};
// Limit by the last 30 days
function last30DaysTransactions() {
  let THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
  return transactions.filter(entry => 
    range.end.getTime() - entry.timestamp < THIRTY_DAYS);
}
