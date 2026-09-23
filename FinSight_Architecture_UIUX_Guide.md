# FinSight — Architecture & UI/UX Guide

## 1. Product Definition

FinSight is a calculator-first Time Value of Money (TVM) web application designed as a modern financial calculation notebook.

The application must feel like a serious calculation workspace rather than a generic SaaS dashboard.

The assignment requires:
- Future Value
- Present Value
- Simple Interest
- Compound Interest
- EMI Calculation
- Loan Amortization Schedule
- Scenario Analysis using 8%, 10%, 12%, and 15%

The application should remain focused on these calculations. Practical improvements should enhance the existing calculators rather than turn FinSight into a full financial-planning platform.

---

# 2. Product Philosophy

## Core idea

> Open the notebook → understand what the application does → choose a calculation → enter values → see the formula → see the working → understand the result.

The user should never feel lost.

The interface should prioritize:
1. Understanding
2. Calculation
3. Explanation
4. Visualization
5. Navigation

Avoid unnecessary product features, dashboards, accounts, backend services, financial integrations, or unrelated financial calculators.

---

# 3. User Journey

The intended first-time journey is:

```text
OPEN FIN:SIGHT
      ↓
INTRODUCTION
      ↓
SCROLL
      ↓
"WHAT ARE YOU CALCULATING?"
      ↓
CALCULATION DROPDOWN
      ↓
SELECT CALCULATOR
      ↓
INPUT VALUES
      ↓
CALCULATE
      ↓
FORMULA
      ↓
STEP-BY-STEP WORKING
      ↓
RESULT
      ↓
CHART / TABLE WHEN RELEVANT
      ↓
RECENT CALCULATION
      ↓
CHOOSE ANOTHER CALCULATION
```

There should not be a traditional dashboard as the first screen.

---

# 4. Navigation Concept

## 4.1 Opening screen

The first screen should intentionally contain very little.

Example:

```text
FIN:SIGHT

FINANCIAL
CALCULATIONS

MADE CLEAR.

A simple workspace for understanding
how your money changes over time.

                    ↓
              SCROLL TO BEGIN
```

This is an introduction, not a marketing landing page.

Avoid:
- feature cards
- testimonials
- pricing
- large CTA buttons
- decorative gradients
- unnecessary illustrations
- dashboard statistics

---

## 4.2 Calculation selector

After scrolling:

```text
WHAT ARE YOU CALCULATING?

Choose a calculation to begin.

[ Select a calculation                         ▾ ]
```

Dropdown options:

```text
CORE CALCULATIONS

01  Future Value
02  Present Value
03  Simple Interest
04  Compound Interest
05  EMI Calculation
06  Loan Amortization
07  Scenario Analysis
```

The dropdown acts as the application's table of contents.

---

# 5. Practical Enhancements

These are deliberately small.

## 5.1 Quick Presets

Each calculator may provide a few realistic example values.

Example:

```text
QUICK EXAMPLES

₹1,00,000 at 10% for 5 years
₹5,00,000 loan at 8.5% for 10 years
₹10,00,000 loan at 9% for 20 years
```

Selecting a preset fills the relevant inputs.

Presets must never replace manual input.

---

## 5.2 What-if Adjustment

After a result is calculated, allow small changes to important variables.

Example:

```text
INTEREST RATE

8% ─────────●──────── 15%

Current: 10%

[ −0.5% ]     [ +0.5% ]
```

The result and chart update when the value changes.

This should remain simple and should not become a separate simulation product.

---

## 5.3 Formula and Working

Every applicable calculator should explain its calculation.

Example:

```text
WORKING

FV = P(1 + r)^t

   = ₹1,00,000 × (1 + 0.10)^5

   = ₹1,61,051
```

The working area is important because the application is for a finance/engineering academic context.

Do not only show the final number.

---

## 5.4 Charts

Charts should support understanding, not decoration.

Future Value / Compound Interest:
- value over time

EMI:
- principal vs interest
- total payment

Amortization:
- balance declining over time

Scenario Analysis:
- EMI or total interest at 8%, 10%, 12%, and 15%

Charts should be simple, readable, and restrained.

---

## 5.5 Recent Calculations

Keep a small local history.

Example:

```text
RECENT

Future Value
₹1,00,000 → ₹1,61,051
10% · 5 years

EMI
₹10,00,000 · 8.5% · 5 years
₹20,516 / month
```

Limit the visible history to approximately five recent calculations.

No account or database is required.

---

# 6. Calculator Page Structure

Every calculator should follow the same mental model:

```text
CALCULATOR TITLE
Short explanation

INPUTS
    ↓
CALCULATE
    ↓
WORKING
    ↓
RESULT
    ↓
CHART / TABLE
    ↓
RECENT
    ↓
NEXT CALCULATION
```

Consistency is more important than giving every calculator a completely different layout.

---

# 7. Future Value UI

```text
01 — FUTURE VALUE

How much will your money be worth in the future?

Principal Amount
₹ [ 100000 ]

Annual Interest Rate
[ 10 ] %

Time Period
[ 5 ] years

[ Calculate ]

────────────────────────

WORKING

FV = P(1 + r)^t
   = ₹1,00,000 × (1 + 0.10)^5
   = ₹1,61,051

RESULT

Future Value
₹1,61,051

[ Growth Chart ]
```

---

# 8. Present Value UI

Inputs:
- Future Value
- Discount Rate
- Time Period

Outputs:
- Present Value

Show the formula and substituted values.

---

# 9. Simple Interest UI

Inputs:
- Principal
- Interest Rate
- Time

Outputs:
- Interest Earned
- Maturity Value

Working:

```text
SI = P × R × T
```

---

# 10. Compound Interest UI

Inputs:
- Principal
- Rate
- Time
- Compounding Frequency

Outputs:
- Compound Interest
- Maturity Value

The frequency selector should include practical choices such as:
- Annually
- Half-yearly
- Quarterly
- Monthly
- Daily

---

# 11. EMI UI

Inputs:
- Loan Amount
- Interest Rate
- Loan Tenure

Outputs:
- Monthly EMI
- Total Payment
- Total Interest

Example:

```text
RESULT

Monthly EMI
₹20,516

Total Payment
₹12,30,960

Total Interest
₹2,30,960
```

Include a small principal-vs-interest visualization.

Provide a clear route to the amortization schedule:

```text
[ View Amortization Schedule ]
```

The entered loan information should carry into the amortization calculator.

---

# 12. Loan Amortization UI

Inputs:
- Loan Amount
- Interest Rate
- Tenure

Output:

```text
MONTH   OPENING       INTEREST     PRINCIPAL     EMI       CLOSING

01      ₹10,00,000    ₹7,083       ₹13,433       ₹20,516   ₹9,86,567
02      ₹9,86,567     ₹7,028       ₹13,488       ₹20,516   ₹9,73,079
...
```

The schedule must be generated automatically.

Provide:
- monthly table
- remaining-balance visualization
- total principal
- total interest

The amortization engine should reuse the EMI calculation rather than implementing a second EMI formula.

---

# 13. Scenario Analysis UI

The assignment requires at least:

- 8%
- 10%
- 12%
- 15%

Example:

```text
SCENARIO ANALYSIS

Loan Amount
₹10,00,000

Tenure
5 years

RATE       EMI        TOTAL INTEREST

8%         ₹20,276    ₹2.16L
10%        ₹21,247    ₹2.75L
12%        ₹22,244    ₹3.35L
15%        ₹23,790    ₹4.27L
```

Add a simple comparison chart.

Scenario analysis should call the same financial engine used by the EMI calculator.

---

# 14. Architecture

## High-level architecture

```text
                    FIN:SIGHT
                       │
                       ▼
              PRESENTATION LAYER
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
     Navigation     Forms        Results
          │            │            │
          └────────────┼────────────┘
                       ▼
              APPLICATION LAYER
                       │
          ┌────────────┼─────────────┐
          ▼            ▼             ▼
      Validation   Calculator     State
                     Router
                       │
                       ▼
               FINANCIAL ENGINE
                       │
      ┌────────────────┼────────────────┐
      ▼       ▼        ▼        ▼       ▼
     FV      PV       SI       CI      EMI
                                      │
                              ┌───────┴────────┐
                              ▼                ▼
                         Amortization      Scenario
                       │
                       ▼
                 CALCULATED DATA
                       │
              ┌────────┴────────┐
              ▼                 ▼
            Charts            Tables
```

---

# 15. Architectural Principle

## UI must not contain financial formulas.

Bad:

```javascript
button.onclick = () => {
    result = principal * Math.pow(1 + rate, years);
};
```

Better:

```javascript
const result = calculateFutureValue({
    principal,
    rate,
    years
});

renderResult(result);
```

The financial engine should be independently testable.

---

# 16. Recommended Project Structure

```text
FinSight/
│
├── index.html
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── notebook.css
│   ├── components.css
│   ├── calculators.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   │
│   ├── core/
│   │   ├── validation.js
│   │   ├── formatter.js
│   │   └── state.js
│   │
│   ├── calculators/
│   │   ├── futureValue.js
│   │   ├── presentValue.js
│   │   ├── simpleInterest.js
│   │   ├── compoundInterest.js
│   │   ├── emi.js
│   │   ├── amortization.js
│   │   └── scenario.js
│   │
│   ├── charts/
│   │   ├── growthChart.js
│   │   ├── loanChart.js
│   │   └── scenarioChart.js
│   │
│   └── ui/
│       ├── navigation.js
│       ├── calculatorView.js
│       ├── results.js
│       ├── presets.js
│       ├── history.js
│       └── theme.js
│
└── README.md
```

For final submission, these modules can be bundled into the required executable HTML application.

---

# 17. Financial Engine Contracts

Each calculator should accept clear inputs and return structured data.

## Future Value

```javascript
calculateFutureValue({
    principal,
    rate,
    years
});
```

Returns:

```javascript
{
    futureValue,
    formula,
    working
}
```

## Present Value

```javascript
calculatePresentValue({
    futureValue,
    discountRate,
    years
});
```

## Simple Interest

```javascript
calculateSimpleInterest({
    principal,
    rate,
    time
});
```

Returns:

```javascript
{
    interest,
    maturityValue,
    formula,
    working
}
```

## Compound Interest

```javascript
calculateCompoundInterest({
    principal,
    rate,
    time,
    frequency
});
```

## EMI

```javascript
calculateEMI({
    loanAmount,
    annualRate,
    tenureYears
});
```

Returns:

```javascript
{
    emi,
    totalPayment,
    totalInterest
}
```

## Amortization

```javascript
generateAmortization({
    loanAmount,
    annualRate,
    tenureYears
});
```

Returns an array:

```javascript
[
    {
        month: 1,
        openingBalance,
        interest,
        principal,
        emi,
        closingBalance
    }
]
```

## Scenario

```javascript
calculateScenario({
    loanAmount,
    tenureYears,
    rates: [0.08, 0.10, 0.12, 0.15]
});
```

Internally it should reuse `calculateEMI()`.

---

# 18. State

Keep state deliberately small.

```javascript
const appState = {
    activeCalculator: "futureValue",
    theme: "light",
    currentResult: null,
    recentCalculations: []
};
```

Do not introduce Redux, Zustand, a backend database, authentication, or complex state management.

---

# 19. Data Flow

Every calculation should follow:

```text
USER INPUT
    ↓
NORMALIZE
    ↓
VALIDATE
    ↓
FINANCIAL ENGINE
    ↓
RESULT OBJECT
    ↓
FORMAT
    ↓
UI
    ├── Result
    ├── Working
    ├── Chart
    └── History
```

Charts must consume calculated datasets rather than reading raw HTML inputs directly.

---

# 20. Validation

Validate before calculation.

Examples:

```text
Principal amount > 0
Interest rate >= 0
Time period > 0
Loan tenure > 0
Frequency selected
```

Error messages should be close to the input.

Bad:

```text
ERROR
```

Better:

```text
Enter a value greater than 0.
```

Never silently calculate invalid data.

---

# 21. Formatting

All monetary values should be formatted for Indian users.

Example:

```text
₹1,00,000
₹12,30,960
₹2,30,960
```

Percentages should be displayed consistently:

```text
8%
10%
12%
15%
```

Internal calculations may use decimals.

---

# 22. UI/UX Visual Direction

## Overall feeling

The interface should feel like:

> A serious financial calculation notebook redesigned as software.

Not:
- generic SaaS
- banking portal
- trading terminal
- mobile finance dashboard

---

# 23. Notebook Visual Language

Use:
- warm off-white paper
- subtle horizontal ruled lines
- dark ink-like typography
- restrained green accent
- muted red for errors
- thin borders
- almost-square corners
- generous whitespace

Avoid:
- gradients
- neon
- glassmorphism
- large shadows
- rounded cards
- rainbow colors
- excessive icons
- decorative blobs
- excessive animations

---

# 24. Suggested Palette

```text
Paper              #F4F0E6
Secondary Paper    #EEE9DD
Ink                #202923
Muted Ink          #697169
Border             #D8D1C2
Primary Green      #285943
Error Red          #A14D43
```

The palette should remain restrained.

---

# 25. Typography

Recommended:

```text
UI / Headings:
IBM Plex Sans

Numbers / Formulas:
IBM Plex Mono
```

Financial numbers should use a monospace font so columns align naturally.

Avoid:
- Inter
- Geist
- Space Grotesk

---

# 26. Layout

Desktop:

```text
┌──────────────────────────────────────────────┐
│ FIN:SIGHT                                    │
├──────────────────────────────────────────────┤
│                                              │
│ INTRODUCTION                                 │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ WHAT ARE YOU CALCULATING?                    │
│                                              │
│ [ Select a calculation                    ▾ ] │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ CALCULATOR                                   │
│                                              │
│ Inputs              Working / Result         │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│ CHART / TABLE                                │
│                                              │
└──────────────────────────────────────────────┘
```

The layout should not become card-heavy.

---

# 27. Input Design

Inputs should resemble fields in a calculation worksheet.

Example:

```text
Principal Amount

₹  [ 100000                         ]

Annual Interest Rate

    [ 10                            ] %
```

Labels should always be visible.

Do not rely on placeholders as labels.

---

# 28. Buttons

Primary action:

```text
[ Calculate ]
```

Secondary actions:

```text
[ Reset ]
[ Use Example ]
[ View Amortization ]
```

Buttons should be rectangular or have only a very small radius.

No exaggerated pill buttons.

---

# 29. Results

The result should be visually stronger than the inputs, but still restrained.

Example:

```text
RESULT

Future Value

₹1,61,051
```

Use typography and spacing instead of huge colorful cards.

---

# 30. Working Section

The working section is one of FinSight's defining UX elements.

It should visually resemble handwritten calculation steps:

```text
WORKING

FV = P(1 + r)^t

   = ₹1,00,000 × (1 + 0.10)^5

   = ₹1,61,051
```

Do not animate every calculation step.

The result should appear cleanly after calculation.

---

# 31. Chart Design

Charts should have:
- thin lines
- restrained colors
- clear labels
- minimal gridlines
- no 3D
- no gradients
- no excessive animation

The chart exists to answer a financial question.

Example:

> How does the balance change over time?

not:

> How can we make this screen visually impressive?

---

# 32. Responsive Design

On mobile:

```text
FIN:SIGHT

WHAT ARE YOU CALCULATING?

[ Select calculation ▾ ]

01 — EMI

Loan Amount
₹ [          ]

Interest Rate
[       ] %

Tenure
[       ] years

[ Calculate ]

WORKING

...

RESULT

₹20,516

CHART

...
```

Inputs should become full width.

Tables should horizontally scroll rather than compress into unreadable text.

---

# 33. Theme

Light mode should be the primary experience because it supports the notebook concept.

Dark mode can be provided as an optional theme.

Dark mode should preserve the same hierarchy and notebook character.

Do not introduce a completely different visual language.

---

# 34. Interaction Rules

Interactions should be purposeful.

Use subtle transitions for:
- calculator switching
- result updates
- chart updates
- dropdown opening

Avoid:
- hover gimmicks
- bouncing elements
- animated arrows
- excessive page transitions
- decorative motion

---

# 35. Accessibility

Minimum requirements:
- keyboard-accessible controls
- visible focus states
- sufficient text contrast
- labels associated with inputs
- error messages readable by screen readers
- buttons with clear text
- charts accompanied by meaningful numeric information

---

# 36. Performance

The application should run entirely client-side.

No backend is required.

Avoid:
- unnecessary frameworks
- unnecessary API calls
- large libraries
- complex state systems

The assignment evaluates performance during live testing, so calculations should be immediate.

---

# 37. Testing Strategy

Test each financial engine independently.

### Future Value
- normal values
- zero interest
- decimal rates
- invalid negative values

### Present Value
- normal values
- zero discount rate
- invalid values

### Simple Interest
- normal values
- zero rate

### Compound Interest
- annual
- quarterly
- monthly
- daily

### EMI
- normal loan
- zero interest
- decimal interest
- different tenures

### Amortization
- first month
- final month
- closing balance near zero
- total principal
- total interest

### Scenario
- exactly 8%, 10%, 12%, 15%
- same loan and tenure across scenarios

---

# 38. Submission Architecture

The development architecture may be modular:

```text
HTML
CSS modules
JavaScript modules
```

But the final submission should be an executable HTML web application as required.

Therefore:

```text
DEVELOPMENT
Multiple modules
      ↓
BUILD / BUNDLE
      ↓
FINAL
FinSight.html
```

The final HTML must work without a backend.

---

# 39. Scope Freeze

## Included

- 7 required TVM calculators
- formula display
- calculation working
- validation
- Indian currency formatting
- charts
- quick presets
- small what-if adjustment
- recent calculations
- dark/light theme
- responsive layout
- amortization table
- scenario comparison

## Excluded

- authentication
- database
- bank integration
- investment portfolio
- stock tracking
- cryptocurrency
- financial news
- tax planning
- budgeting platform
- AI financial advisor
- complicated financial planning
- unnecessary dashboards

FinSight should remain a focused TVM calculator.

---

# 40. Final UX Principle

The product should feel like this:

```text
OPEN
  ↓
UNDERSTAND
  ↓
CHOOSE
  ↓
CALCULATE
  ↓
SEE THE FORMULA
  ↓
UNDERSTAND THE RESULT
  ↓
VISUALIZE
  ↓
TRY ANOTHER SCENARIO
```

The application should make financial calculations easier to perform and easier to understand.

The goal is not to build the largest finance application.

The goal is to build a small, polished, accurate, practical financial calculation tool.
