let salaryPerMonth = 15000;
let socialInsuranceBase = 18630;
let providentFundBase = 25500;
let additionalDeductionPerMonth = 2000;

let oldAgeInsuranceRate = 0.08;
let medicalInsuranceRate = 0.02;
let unemploymentInsuranceRate = 0.004;
let providentFundRate = 0.08;

const TaxLevels = [
    {low: 0, high: 36000, rate: 0.03, deduction: 0},
    {low: 36000, high: 144000, rate: 0.10, deduction: 2520},
    {low: 144000, high: 300000, rate: 0.20, deduction: 16920},
    {low: 300000, high: 420000, rate: 0.25, deduction: 31920},
    {low: 420000, high: 660000, rate: 0.30, deduction: 52920},
    {low: 660000, high: 960000, rate: 0.35, deduction: 85920},
    {low: 960000, high: Number.MAX_SAFE_INTEGER, rate: 0.45, deduction: 181920},
];

function findTaxLevel(taxableIncome) {
    for (const taxLevel of TaxLevels) {
        if (taxableIncome > taxLevel.low && taxableIncome <= taxLevel.high) {
            return taxLevel
        }
    }
}

let providentFundPerMonth = providentFundBase * providentFundRate;
let oldAgeInsurancePerMonth = socialInsuranceBase * oldAgeInsuranceRate;
let medicalInsurancePerMonth = socialInsuranceBase * medicalInsuranceRate;
let unemploymentInsurancePerMonth = socialInsuranceBase * unemploymentInsuranceRate;
let socialInsurancePerMonth = oldAgeInsurancePerMonth + medicalInsurancePerMonth + unemploymentInsurancePerMonth;

let cumulativeTax = 0;

for (let n = 1; n <= 12; n++) {
    let monthlyTaxableIncome = salaryPerMonth - socialInsurancePerMonth - providentFundPerMonth - 5000 - additionalDeductionPerMonth
    let taxLevel = findTaxLevel(n * monthlyTaxableIncome);
    let currentMonthTax = (n * monthlyTaxableIncome) * taxLevel.rate - taxLevel.deduction - cumulativeTax;
    cumulativeTax += currentMonthTax;
    let currentMonthNetIncome = salaryPerMonth - socialInsurancePerMonth - providentFundPerMonth - currentMonthTax
    console.log(`
Current Month: ${n}
Tax rate: ${taxLevel.rate}
Gross income: ${salaryPerMonth}
Tax: ${currentMonthTax}
Provident fund: ${providentFundPerMonth}
Social insurance: ${socialInsurancePerMonth}
Net income: ${currentMonthNetIncome}
`)
}

let yearlyTaxableIncome = (salaryPerMonth - socialInsurancePerMonth - providentFundPerMonth - 5000 - additionalDeductionPerMonth) * 12;

let taxLevel = findTaxLevel(yearlyTaxableIncome);

let yearlyTax = yearlyTaxableIncome * taxLevel.rate - taxLevel.deduction
let yearlyNetIncome = (salaryPerMonth - socialInsurancePerMonth - providentFundPerMonth) * 12 - yearlyTax

console.log(`
Monthly gross income: ${salaryPerMonth}
Yearly gross income: ${salaryPerMonth * 12}
Yearly net income: ${yearlyNetIncome}
Yearly tax: ${yearlyTax}
Tax rate: ${taxLevel.rate}
Yearly provident fund: ${providentFundPerMonth * 12 * 2}
Yearly social insurance: ${socialInsurancePerMonth * 12}
`)
