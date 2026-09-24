class FinSightEngine {
    static validateInputs(inputs) {
        for (const [key, value] of Object.entries(inputs)) {
            if (value === null || value === undefined || isNaN(value)) {
                throw new Error(`Invalid input: ${key} must be a number.`);
            }
            if (key === 'principal' && value < 0) {
                throw new Error('Enter a non-negative value for principal.');
            }
            if (key === 'pmt' && value < 0) {
                throw new Error('Enter a non-negative value for periodic payment.');
            }
            if (key === 'loanAmount' && value <= 0) {
                throw new Error('Enter a value greater than 0 for loan amount.');
            }
            if (key === 'rate' && value < 0) {
                throw new Error('Enter a non-negative value for interest rate.');
            }
            if (key === 'growthRate' && value <= -100) {
                throw new Error('Growth rate must be greater than -100%.');
            }
            if (key === 'years' && value < 0) {
                throw new Error('Enter a non-negative value for years.');
            }
            if (key === 'periods' && value < 0) {
                throw new Error('Enter a non-negative value for periods.');
            }
            if (key === 'deferralPeriods' && value < 0) {
                throw new Error('Enter a non-negative value for deferral period.');
            }
            if (key === 'tenure' && value <= 0) {
                throw new Error('Enter a value greater than 0 for tenure.');
            }
            if (key === 'compoundingFrequency' && ![1, 2, 4, 12, 365].includes(value)) {
                throw new Error('Invalid compounding frequency.');
            }
        }
    }

    static calculateFutureValueLumpSum({ principal, rate, years }) {
        this.validateInputs({ principal, rate, years });
        const r = rate / 100;
        const value = principal * Math.pow(1 + r, years);
        if (isNaN(value) || !isFinite(value)) {
            throw new Error('Calculation result exceeds numeric limits.');
        }
        return {
            value,
            formula: 'FV = P × (1 + r)^n',
            working: `FV = ${principal} × (1 + ${r})^${years}`
        };
    }

    static calculateFutureValue({ principal, rate, years }) {
        return this.calculateFutureValueLumpSum({ principal, rate, years });
    }

    static calculateFutureValueOrdinaryAnnuity({ pmt, rate, periods }) {
        this.validateInputs({ pmt, rate, periods });
        const r = rate / 100;
        const n = periods;
        let value;
        let working;

        if (r === 0) {
            value = pmt * n;
            working = `FV = ${pmt} × ${n}`;
        } else {
            value = pmt * ((Math.pow(1 + r, n) - 1) / r);
            working = `FV = ${pmt} × ((1 + ${r})^${n} − 1) / ${r}`;
        }

        if (isNaN(value) || !isFinite(value)) {
            throw new Error('Calculation result exceeds numeric limits.');
        }

        return {
            value,
            formula: 'FV = PMT × ((1 + r)^n − 1) / r',
            working
        };
    }

    static calculateFutureValueAnnuityDue({ pmt, rate, periods }) {
        this.validateInputs({ pmt, rate, periods });
        const r = rate / 100;
        const n = periods;
        let value;
        let working;

        if (r === 0) {
            value = pmt * n;
            working = `FV = ${pmt} × ${n}`;
        } else {
            value = pmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
            working = `FV = ${pmt} × ((1 + ${r})^${n} − 1) / ${r} × (1 + ${r})`;
        }

        if (isNaN(value) || !isFinite(value)) {
            throw new Error('Calculation result exceeds numeric limits.');
        }

        return {
            value,
            formula: 'FV = PMT × ((1 + r)^n − 1) / r × (1 + r)',
            working
        };
    }

    static calculateFutureValueDeferredAnnuity({ pmt, rate, periods, deferralPeriods }) {
        this.validateInputs({ pmt, rate, periods, deferralPeriods });
        const r = rate / 100;
        const n = periods;
        const d = deferralPeriods;
        let value;
        let working;

        if (r === 0) {
            value = pmt * n;
            working = `FV = ${pmt} × ${n}`;
        } else {
            value = pmt * ((Math.pow(1 + r, n) - 1) / r) * Math.pow(1 + r, d);
            working = `FV = ${pmt} × ((1 + ${r})^${n} − 1) / ${r} × (1 + ${r})^${d}`;
        }

        if (isNaN(value) || !isFinite(value)) {
            throw new Error('Calculation result exceeds numeric limits.');
        }

        return {
            value,
            formula: 'FV = PMT × ((1 + r)^n − 1) / r × (1 + r)^d',
            working
        };
    }

    static calculateFutureValueGrowingAnnuity({ pmt, rate, growthRate, periods }) {
        this.validateInputs({ pmt, rate, growthRate, periods });
        const r = rate / 100;
        const g = growthRate / 100;
        const n = periods;
        let value;
        let formula;
        let working;

        if (Math.abs(r - g) < 1e-9) {
            value = pmt * n * Math.pow(1 + r, n - 1);
            formula = 'FV = PMT × n × (1 + r)^(n − 1)';
            working = `FV = ${pmt} × ${n} × (1 + ${r})^(${n} − 1)`;
        } else if (r === 0) {
            value = pmt * ((Math.pow(1 + g, n) - 1) / g);
            formula = 'FV = PMT × ((1 + r)^n − (1 + g)^n) / (r − g)';
            working = `FV = ${pmt} × ((1 + 0)^${n} − (1 + ${g})^${n}) / (0 − ${g})`;
        } else {
            value = pmt * ((Math.pow(1 + r, n) - Math.pow(1 + g, n)) / (r - g));
            formula = 'FV = PMT × ((1 + r)^n − (1 + g)^n) / (r − g)';
            working = `FV = ${pmt} × ((1 + ${r})^${n} − (1 + ${g})^${n}) / (${r} − ${g})`;
        }

        if (isNaN(value) || !isFinite(value)) {
            throw new Error('Calculation result exceeds numeric limits.');
        }

        return {
            value,
            formula,
            working
        };
    }

    static calculatePresentValue({ futureValue, rate, years }) {
        this.validateInputs({ principal: futureValue, rate, years }); // Using principal validation rule for FV here
        const r = rate / 100;
        const value = futureValue / Math.pow(1 + r, years);
        return {
            value,
            formula: 'PV = FV / (1 + r)^t',
            working: `PV = ${futureValue} / (1 + ${r})^${years}`
        };
    }

    static calculateSimpleInterest({ principal, rate, years }) {
        this.validateInputs({ principal, rate, years });
        const r = rate / 100;
        const interest = principal * r * years;
        const maturityValue = principal + interest;
        return {
            value: interest,
            maturityValue,
            formula: 'SI = P × r × t',
            working: `SI = ${principal} * ${r} * ${years}`
        };
    }

    static calculateCompoundInterest({ principal, rate, years, compoundingFrequency = 1 }) {
        this.validateInputs({ principal, rate, years, compoundingFrequency });
        const r = rate / 100;
        const n = compoundingFrequency;
        const amount = principal * Math.pow(1 + r / n, n * years);
        const interest = amount - principal;
        return {
            value: interest,
            maturityValue: amount,
            formula: 'A = P(1 + r/n)^(nt), CI = A - P',
            working: `A = ${principal} * (1 + ${r}/${n})^(${n}*${years}), CI = A - ${principal}`
        };
    }

    static calculateEMI({ loanAmount, rate, tenureMonths }) {
        this.validateInputs({ loanAmount, rate, tenure: tenureMonths });
        const r = rate / 100 / 12; // periodic monthly interest rate
        const n = tenureMonths;
        let emi;
        let working;
        if (rate === 0) {
            emi = loanAmount / n;
            working = `EMI = ${loanAmount} / ${n}`;
        } else {
            emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            working = `EMI = ${loanAmount} * ${r} * (1+${r})^${n} / ((1+${r})^${n} - 1)`;
        }
        
        const totalPayment = emi * n;
        const totalInterest = totalPayment - loanAmount;

        return {
            emi,
            totalPayment,
            totalInterest,
            formula: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1)',
            working
        };
    }

    static calculateAmortization({ loanAmount, rate, tenureMonths }) {
        const { emi } = this.calculateEMI({ loanAmount, rate, tenureMonths });
        const r = rate / 100 / 12;
        let balance = loanAmount;
        const schedule = [];
        let totalInterest = 0;
        let totalPrincipal = 0;

        for (let month = 1; month <= tenureMonths; month++) {
            const interest = balance * r;
            let principal = emi - interest;
            
            // Handle final period rounding
            if (month === tenureMonths) {
                principal = balance;
            }
            
            const closingBalance = Math.max(0, balance - principal);
            
            schedule.push({
                month,
                openingBalance: balance,
                interest,
                principal,
                emi: principal + interest,
                closingBalance
            });

            totalInterest += interest;
            totalPrincipal += principal;
            balance = closingBalance;
        }

        return {
            schedule,
            summary: {
                totalInterest,
                totalPrincipal,
                totalPayment: totalInterest + totalPrincipal
            }
        };
    }

    static calculateScenario({ loanAmount, tenureMonths }) {
        const rates = [8, 10, 12, 15];
        return rates.map(rate => {
            return {
                rate,
                ...this.calculateEMI({ loanAmount, rate, tenureMonths })
            };
        });
    }

    static formatCurrency(value) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinSightEngine;
}
