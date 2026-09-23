# FinSight TVM Calculator — Product Requirements Document (PRD)

## 1. Product Overview

**Product Name:** FinSight  
**Product Type:** HTML-based web application  
**Course:** BS3210 — Finance for Engineers, Designers and Professionals  
**Assignment:** Assignment 1 — Development of a Time Value of Money (TVM) Calculator Application

FinSight is a practical, interactive Time Value of Money calculator designed to demonstrate financial understanding, correct formula implementation, software development skills, input validation, and user-centric application design.

The application will remain focused on the assignment's required TVM functionality rather than becoming a large personal-finance platform.

The assignment requires an executable HTML-based web application and seven financial calculation modules:
1. Future Value
2. Present Value
3. Simple Interest
4. Compound Interest
5. EMI Calculation
6. Loan Amortization Schedule
7. Scenario Analysis using 8%, 10%, 12%, and 15% interest rates

---

## 2. Product Goals

### Primary Goals

- Provide accurate TVM calculations.
- Make financial calculations easy to understand.
- Provide a clean, professional and interactive interface.
- Allow users to experiment with different financial inputs.
- Generate an automatic loan amortization schedule.
- Visually communicate important calculation results through interactive charts.
- Perform reliably during live faculty demonstration.

### Secondary Goals

- Make the application feel like a practical financial calculator rather than a collection of static formula fields.
- Provide useful real-world context without adding unnecessary complexity.
- Keep the application fully client-side and easy to run.

### Non-Goals

The first version will NOT attempt to become a complete personal-finance application.

Do not add:
- User accounts
- Login/authentication
- Database
- Cloud backend
- Expense tracking
- Investment portfolio management
- Budget management
- Payment processing
- Complex financial planning
- Excessive dashboard functionality
- Unnecessary AI features

---

# 3. Source Requirements

The following requirements are directly based on the assignment brief.

The application must be an **HTML-based web application** and only executable HTML/web applications will be evaluated.

Required calculators:

### Calculator 1 — Future Value

Inputs:
- Principal Amount
- Annual Interest Rate
- Time Period (Years)

Output:
- Future Value

### Calculator 2 — Present Value

Inputs:
- Future Value
- Discount Rate
- Time Period

Output:
- Present Value

### Calculator 3 — Simple Interest

Inputs:
- Principal
- Interest Rate
- Time

Outputs:
- Interest Earned
- Maturity Value

### Calculator 4 — Compound Interest

Inputs:
- Principal
- Rate
- Time
- Compounding Frequency

Outputs:
- Compound Interest
- Maturity Value

### Calculator 5 — EMI

Inputs:
- Loan Amount
- Interest Rate
- Loan Tenure

Outputs:
- EMI
- Total Payment
- Total Interest Payable

### Calculator 6 — Loan Amortization

Inputs:
- Loan Amount
- Interest Rate
- Tenure

Output table:
- Month
- Opening Balance
- Interest
- Principal Repaid
- EMI
- Closing Balance

The schedule must be generated automatically.

### Calculator 7 — Scenario Analysis

The application must compare outcomes under:

- 8%
- 10%
- 12%
- 15%

These requirements are the core acceptance criteria and must not be removed.

---

# 4. Product Direction

## Design Principle

**Simple input → immediate result → visual understanding → optional detail**

The application should not force users through a dashboard before reaching a calculator.

The calculators themselves are the primary interface.

The preferred experience is:

```text
Calculator Selection
       ↓
Input Values
       ↓
Calculate
       ↓
Key Results
       ↓
Interactive Chart
       ↓
Detailed Information
```

---

# 5. Information Architecture

Use a simple top navigation.

```text
FinSight

Future Value
Present Value
Simple Interest
Compound Interest
EMI
Amortization
Scenario Analysis
```

A separate dashboard/home page is **not required**.

The application should open directly on a useful calculator, preferably Future Value or EMI.

Each calculator should be accessible within one click.

---

# 6. UI / UX Requirements

## 6.1 Visual Style

The design should feel like a modern fintech application.

Characteristics:

- Clean
- Professional
- Minimal
- Responsive
- High readability
- Clear hierarchy
- Limited visual clutter
- Strong result emphasis

Avoid:

- Excessive animations
- Decorative graphics with no purpose
- Huge hero sections
- Too many cards
- Overly complicated navigation

---

## 6.2 Theme

Support:

- Light mode
- Dark mode

The selected theme should persist using browser local storage.

The theme should apply consistently to:

- Background
- Cards
- Inputs
- Tables
- Charts
- Navigation
- Text
- Buttons

---

# 7. Calculator Interaction Model

Every calculator should follow a consistent structure.

```text
┌────────────────────────────────────────────┐
│ Calculator Name                            │
│ Short explanation                          │
│                                            │
│ INPUTS                  RESULTS             │
│                                            │
│ Principal ₹             Future Value        │
│ Rate %                  ₹1,61,051           │
│ Time                    Interest Earned     │
│                         ₹61,051             │
│                                            │
│ [ Calculate ]          [ Reset ]            │
└────────────────────────────────────────────┘
```

On desktop:

- Inputs and results can appear side-by-side.

On mobile:

- Inputs appear first.
- Results appear below.

---

# 8. Interactive Charts

Interactive charts are a major upgrade and should be included where they genuinely improve understanding.

Charts should not be added just for decoration.

## 8.1 Future Value Chart

Show investment growth over time.

Example:

```text
Value
₹2L |                         ●
    |                    ●
₹1.5L|                ●
    |            ●
₹1L |●       ●
    +---------------------------
      1   2   3   4   5 Years
```

Chart updates automatically when:

- Principal changes
- Rate changes
- Time changes

---

## 8.2 Present Value

Display a simple comparison:

```text
Future Value       Present Value
₹1,61,051    →     ₹1,00,000
```

A visual discounting representation may be used.

No complex chart is required if it does not add meaningful information.

---

## 8.3 Simple vs Compound Interest

The compound-interest calculator should provide a useful comparison chart:

```text
Year      Simple      Compound
1         ₹108,000    ₹108,000
2         ₹116,000    ₹116,640
3         ₹124,000    ₹125,971
...
```

A line chart can show how the two values diverge over time.

---

## 8.4 EMI Chart

The EMI calculator should show the composition of the loan.

Recommended chart:

- Principal
- Total Interest

Example:

```text
Loan Composition

Principal       ₹10,00,000
Interest        ₹2,74,822
```

A donut/pie chart is appropriate.

---

## 8.5 Amortization Chart

The amortization module should show loan balance declining over time.

Recommended chart:

```text
Outstanding Balance
₹10L |●
     | \
     |  \
     |   \
₹0   |____●
       60 Months
```

The table remains the detailed source of truth.

The chart provides quick visual understanding.

---

## 8.6 Scenario Analysis Chart

Scenario Analysis should compare the required four rates:

- 8%
- 10%
- 12%
- 15%

Display:

- EMI
- Total Payment
- Total Interest

Recommended visualization:

```text
Interest Rate
8%   ███████████
10%  █████████████
12%  ███████████████
15%  ███████████████████
```

An interactive bar chart is preferred.

---

# 9. Practical Real-World Features

The application should include a small number of useful real-world features without becoming over-engineered.

## 9.1 Real-World Presets

Provide optional presets for common scenarios:

- Home Loan
- Car Loan
- Education Loan
- Personal Loan
- Investment

A preset should only populate reasonable example values.

The user must still be able to edit all values.

Example:

```text
Scenario
[ Car Loan ▼ ]

Loan Amount
₹8,00,000

Interest Rate
9%

Tenure
5 Years
```

This feature is optional but recommended.

---

## 9.2 Financial Insight

After a calculation, show a short factual interpretation.

Example:

> **Loan Summary**
>
> Your estimated monthly EMI is ₹21,247.
> Over 5 years, the total interest payable is approximately ₹2.75 lakh.

The insight must be generated directly from the calculated values.

Avoid making financial recommendations or claims that go beyond the calculation.

---

# 10. Validation & Error Handling

Input validation is mandatory.

The system should handle:

### Empty Inputs

Display:

> Please enter all required values.

### Negative Values

Display:

> Value cannot be negative.

### Zero Tenure

Display:

> Loan tenure must be greater than zero.

### Invalid Numeric Input

Display:

> Please enter a valid number.

### Zero Interest

The calculator must correctly handle 0% interest rather than producing division-by-zero errors.

For EMI:

```text
If interest rate = 0:

EMI = Loan Amount / Number of Months
```

### Very Large Inputs

The application should remain stable and display results using appropriate formatting.

---

# 11. Financial Formatting

Use Indian currency formatting.

Example:

```text
₹1,00,000
₹10,00,000
₹1,25,450.50
```

Percentages:

```text
8%
10%
12%
15%
```

Large values should remain readable.

---

# 12. Calculation Requirements

## Future Value

Annual compounding:

```text
FV = P(1 + r)^t
```

Where:

- P = Principal
- r = annual interest rate
- t = time in years

---

## Present Value

```text
PV = FV / (1 + r)^t
```

---

## Simple Interest

```text
SI = P × r × t
```

Maturity value:

```text
Maturity Value = P + SI
```

---

## Compound Interest

```text
A = P(1 + r/n)^(nt)
```

Compound interest:

```text
CI = A - P
```

Where:

- P = Principal
- r = annual rate
- n = compounding frequency
- t = time

---

## EMI

For a standard reducing-balance loan:

```text
EMI = P × r × (1+r)^n / ((1+r)^n - 1)
```

Where:

- P = loan amount
- r = monthly interest rate
- n = number of monthly payments

For 0% interest:

```text
EMI = P / n
```

---

# 13. Amortization Logic

The amortization schedule must be generated automatically.

Each month:

```text
Opening Balance
        ↓
Calculate Interest
        ↓
Calculate Principal Repaid
        ↓
Calculate EMI
        ↓
Calculate Closing Balance
        ↓
Next Month
```

Table columns:

| Month | Opening Balance | Interest | Principal Repaid | EMI | Closing Balance |
|---|---:|---:|---:|---:|---:|

The final month's closing balance should be approximately zero.

Rounding errors must be handled so that the final payment does not leave an incorrect outstanding balance.

---

# 14. Scenario Analysis

The user enters:

- Loan Amount
- Tenure

The application automatically calculates the same loan at:

```text
8%
10%
12%
15%
```

For each rate display:

- Monthly EMI
- Total Payment
- Total Interest

Example structure:

| Rate | EMI | Total Payment | Total Interest |
|---:|---:|---:|---:|
| 8% | ₹... | ₹... | ₹... |
| 10% | ₹... | ₹... | ₹... |
| 12% | ₹... | ₹... | ₹... |
| 15% | ₹... | ₹... | ₹... |

The purpose is to make the financial effect of different rates immediately visible.

---

# 15. Responsive Design

The application must work on:

### Desktop

Two-column layouts are preferred:

```text
Inputs             Results
```

### Tablet

Use a reduced two-column layout where space permits.

### Mobile

Use:

```text
Inputs
↓
Calculate
↓
Results
↓
Chart
↓
Detailed table
```

The amortization table may scroll horizontally on small screens.

---

# 16. Performance

The application must run entirely in the browser.

Requirements:

- No backend required.
- No database required.
- Calculations should execute immediately.
- Amortization for normal loan tenures should generate without noticeable delay.
- Charts should update smoothly.
- Avoid unnecessary external dependencies.

---

# 17. Accessibility

The application should provide:

- Clear labels for every input.
- Keyboard-accessible controls.
- Visible focus states.
- Sufficient text contrast.
- Buttons with descriptive names.
- Error messages associated with the relevant input section.

---

# 18. Technical Architecture

Recommended structure:

```text
FinSight/
│
└── index.html
```

For the assignment, a single executable HTML file is preferred because it can be opened directly in a browser.

Internal organization:

```text
HTML
 ├── Navigation
 ├── Calculator Sections
 ├── Results
 ├── Charts
 └── Amortization Table

CSS
 ├── Theme
 ├── Layout
 ├── Components
 ├── Responsive Rules
 └── Dark Mode

JavaScript
 ├── TVM Calculations
 ├── EMI Calculation
 ├── Amortization Engine
 ├── Scenario Engine
 ├── Validation
 ├── Formatting
 ├── Chart Updates
 └── Theme Persistence
```

---

# 19. Suggested User Flow

### Flow A — Investment

```text
Open FinSight
    ↓
Future Value
    ↓
Enter ₹1,00,000
10%
5 years
    ↓
Calculate
    ↓
Future Value
    ↓
Growth Chart
```

### Flow B — Loan

```text
Open FinSight
    ↓
EMI
    ↓
Enter loan details
    ↓
Calculate
    ↓
EMI + Total Interest
    ↓
Interest/Principal Chart
    ↓
Open Amortization
    ↓
Detailed monthly schedule
```

### Flow C — Rate Comparison

```text
Scenario Analysis
       ↓
Loan Amount + Tenure
       ↓
8% / 10% / 12% / 15%
       ↓
Comparison Table
       ↓
Interactive Chart
```

---

# 20. Demo Readiness

The application must be suitable for live faculty testing.

Recommended demonstration sequence:

### Demo 1
Future Value calculation.

### Demo 2
Compound Interest with different compounding frequencies.

### Demo 3
EMI calculation.

### Demo 4
Generate a complete amortization schedule.

### Demo 5
Change interest rates in Scenario Analysis.

### Demo 6
Demonstrate invalid input handling.

### Demo 7
Switch between light and dark mode.

The application should produce results immediately during each interaction.

---

# 21. Evaluation Alignment

The assignment evaluates the application on:

| Criterion | Product Response |
|---|---|
| Functional Accuracy | Implement tested TVM formulas |
| Correct Financial Formula Implementation | Use documented formulas |
| UI / UX | Clean, responsive fintech interface |
| Input Validation | Validate every calculator |
| Error Handling | Clear user-facing messages |
| Performance | Client-side calculations and efficient rendering |

The application should prioritize correctness over unnecessary features.

---

# 22. MVP Scope

The Minimum Viable Product consists of:

- [ ] Future Value
- [ ] Present Value
- [ ] Simple Interest
- [ ] Compound Interest
- [ ] EMI
- [ ] Amortization
- [ ] Scenario Analysis
- [ ] Input validation
- [ ] INR formatting
- [ ] Responsive UI
- [ ] Light/Dark mode
- [ ] Interactive charts
- [ ] Practical presets
- [ ] Financial result summaries

---

# 23. Explicitly Avoid Over-Engineering

Do not add features merely because they are technically possible.

The application should remain:

**Practical → Interactive → Accurate → Easy to Demonstrate**

rather than:

**Large → Complicated → Feature-heavy**

The strongest experience should come from excellent implementation of the required TVM calculators.

---

# 24. Final Product Vision

FinSight should feel like a small, polished financial calculator product.

The ideal experience is:

> **Enter financial information → instantly understand the result → see how the result changes → inspect the details when needed.**

The application should demonstrate that the developer understands both:

1. **The financial concepts behind TVM**
2. **How to turn those concepts into a usable software product**
