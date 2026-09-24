const assert = require('assert');
const FinSightEngine = require('../js/engine');

function runTests() {
    console.log("Running FinSightEngine Tests...\n");

    // Test 1: Future Value Lump Sum
    let result = FinSightEngine.calculateFutureValueLumpSum({ principal: 100000, rate: 10, years: 5 });
    assert(Math.abs(result.value - 161051) < 1, "FV Lump Sum should be approx 161051");

    // Test 1b: Ordinary Annuity
    result = FinSightEngine.calculateFutureValueOrdinaryAnnuity({ pmt: 10000, rate: 10, periods: 5 });
    assert(Math.abs(result.value - 61051) < 1, "FV Ordinary Annuity should be approx 61051");

    // Test 1c: Ordinary Annuity 0% interest
    result = FinSightEngine.calculateFutureValueOrdinaryAnnuity({ pmt: 10000, rate: 0, periods: 5 });
    assert.strictEqual(result.value, 50000, "FV Ordinary Annuity at 0% should be PMT * n");

    // Test 1d: Annuity Due
    result = FinSightEngine.calculateFutureValueAnnuityDue({ pmt: 10000, rate: 10, periods: 5 });
    assert(Math.abs(result.value - 67156.1) < 1, "FV Annuity Due should be approx 67156.1");

    // Test 1e: Annuity Due 0% interest
    result = FinSightEngine.calculateFutureValueAnnuityDue({ pmt: 10000, rate: 0, periods: 5 });
    assert.strictEqual(result.value, 50000, "FV Annuity Due at 0% should be PMT * n");

    // Test 1f: Deferred Annuity
    result = FinSightEngine.calculateFutureValueDeferredAnnuity({ pmt: 10000, rate: 10, periods: 5, deferralPeriods: 2 });
    assert(Math.abs(result.value - 73871.71) < 1, "FV Deferred Annuity should be approx 73871.71");

    // Test 1g: Growing Annuity (r != g)
    result = FinSightEngine.calculateFutureValueGrowingAnnuity({ pmt: 10000, rate: 10, growthRate: 5, periods: 5 });
    assert(Math.abs(result.value - 66845.69) < 1, "FV Growing Annuity (r!=g) should be approx 66845.69");

    // Test 1h: Growing Annuity (r = g)
    result = FinSightEngine.calculateFutureValueGrowingAnnuity({ pmt: 10000, rate: 10, growthRate: 10, periods: 5 });
    assert(Math.abs(result.value - 73205) < 1, "FV Growing Annuity (r=g) should be approx 73205");

    // Test 2: Present Value
    result = FinSightEngine.calculatePresentValue({ futureValue: 161051, rate: 10, years: 5 });
    assert(Math.abs(result.value - 100000) < 1, "PV should be approx 100000");

    // Test 3: Simple Interest
    result = FinSightEngine.calculateSimpleInterest({ principal: 100000, rate: 10, years: 5 });
    assert(Math.abs(result.value - 50000) < 0.1, "SI should be 50000");
    assert(Math.abs(result.maturityValue - 150000) < 0.1, "Maturity should be 150000");

    // Test 4: Compound Interest
    result = FinSightEngine.calculateCompoundInterest({ principal: 100000, rate: 10, years: 5, compoundingFrequency: 12 });
    assert(Math.abs(result.maturityValue - 164530.89) < 1, "CI amount should be approx 164530.89");

    // Test 5: EMI
    result = FinSightEngine.calculateEMI({ loanAmount: 500000, rate: 8.5, tenureMonths: 120 });
    assert(Math.abs(result.emi - 6199) < 1, "EMI should be approx 6199");

    // Test 5b: Zero Interest EMI
    result = FinSightEngine.calculateEMI({ loanAmount: 120000, rate: 0, tenureMonths: 12 });
    assert(Math.abs(result.emi - 10000) < 0.1, "Zero interest EMI should be exactly loan / tenure");

    // Test 6: Amortization Final Balance
    result = FinSightEngine.calculateAmortization({ loanAmount: 500000, rate: 8.5, tenureMonths: 120 });
    const finalMonth = result.schedule[result.schedule.length - 1];
    assert(Math.abs(finalMonth.closingBalance) < 0.1, "Final balance should be approx 0");
    
    let totalPrin = result.schedule.reduce((acc, val) => acc + val.principal, 0);
    assert(Math.abs(totalPrin - 500000) < 0.1, "Sum of principal should equal loan amount");

    // Test 7: Scenario Rates
    result = FinSightEngine.calculateScenario({ loanAmount: 500000, tenureMonths: 120 });
    assert(result.length === 4, "Scenario should have 4 rates");
    assert(result[0].rate === 8);
    assert(result[3].rate === 15);

    // Test 8: Invalid Inputs
    assert.throws(() => {
        FinSightEngine.calculateFutureValueLumpSum({ principal: -10000, rate: 10, years: 5 });
    }, /non-negative/, "Should throw error on negative principal");

    assert.throws(() => {
        FinSightEngine.calculateEMI({ loanAmount: 50000, rate: -5, tenureMonths: 12 });
    }, /non-negative/, "Should throw error on negative rate");

    assert.throws(() => {
        FinSightEngine.calculateFutureValueGrowingAnnuity({ pmt: 10000, rate: 10, growthRate: -150, periods: 5 });
    }, /greater than -100%/, "Should throw error on invalid growth rate");

    // Test 9: Currency formatting
    const formatted = FinSightEngine.formatCurrency(1230960);
    assert(formatted.includes('12,30,960'), "Currency format should use Indian numbering system");

    console.log("All tests passed!");
}

try {
    runTests();
} catch (e) {
    console.error("Test failed: ", e.message);
    process.exit(1);
}
