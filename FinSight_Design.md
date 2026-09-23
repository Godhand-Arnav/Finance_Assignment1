# FinSight Design System
## Interactive Financial Calculation Notebook

**Product:** FinSight  
**Course:** BS3210 — Finance for Engineers, Designers and Professionals  
**Design Direction:** Modern financial calculation notebook

---

## 1. Design Vision

FinSight should look like a **real financial calculation notebook brought to life as software**.

The visual language is based on ruled paper, written calculations, financial ledgers, mathematical working, restrained ink colors, precise typography, and clear numerical hierarchy.

The calculator is the product. There is no separate dashboard or marketing-style home screen.

The user should be able to open FinSight, choose a calculation, enter values, and immediately see the answer.

---

## 2. Core Design Principle

**Calculate → Show Working → Explain Result**

Every calculator follows:

```text
Calculator
    ↓
Inputs
    ↓
Calculate
    ↓
Answer
    ↓
Working / Formula
    ↓
Chart or Detailed Data
```

---

## 3. Visual Character

FinSight should feel:

- editorial
- academic
- precise
- practical
- financial
- notebook-like
- modern
- restrained

It should not feel like a generic SaaS dashboard, cryptocurrency application, glassmorphism interface, colorful finance dashboard, mobile banking clone, or terminal.

---

## 4. Explicit Restrictions

Do not use:

- harsh gradients
- Lucide icons
- pure white background
- rainbow coloring
- drop shadows
- three feature cards in a row
- emojis
- liquid glass
- em dashes
- Inter
- Geist
- Space Grotesk
- colored left stripes
- fake testimonials
- bento grids
- terminal windows
- "it's not X, it's Y" marketing copy
- checkmark bullet styling
- three pricing tiers
- fake product demonstrations
- soft corner radius
- purple and black color schemes
- skeleton loaders
- radial orbs
- dot grids
- sparkle icons
- animated arrows
- neon colors
- basic pastel colors
- excessive hover animations

---

## 5. Color System

Use a warm paper-based palette.

| Token | Hex | Purpose |
|---|---|---|
| Paper | `#F4F0E6` | Main page background |
| Paper Secondary | `#EEE9DD` | Secondary paper surfaces |
| Ink | `#202923` | Primary text |
| Muted Ink | `#697169` | Secondary text |
| Rule | `#D8D1C2` | Notebook lines and separators |
| Accent | `#285943` | Main financial accent |
| Accent Soft | `#DFE9DF` | Limited accent background |
| Error | `#A14D43` | Validation errors |

Most of the UI should remain paper, ink, muted ink, and rules.

Use the green accent sparingly for the active calculator, Calculate button, major financial result, chart line, and important numerical emphasis.

Do not use gradients, neon green, purple, or multiple competing accent colors.

---

## 6. Background

The main background is warm paper.

```css
background-color: #F4F0E6;
```

Add subtle horizontal notebook rules.

Recommended:

- approximately 32px line interval
- very low contrast
- no dark grid
- no dot grid

The rules should establish the notebook identity without interfering with content.

---

## 7. Typography

### Primary Typeface

Use **IBM Plex Sans** for:

- navigation
- labels
- descriptions
- headings
- buttons
- explanatory text

### Numerical Typeface

Use **IBM Plex Mono** for:

- currency values
- interest rates
- formulas
- calculation working
- tables
- numerical summaries

This distinction creates a technical calculation-book character without relying on a handwritten font.

---

## 8. Type Scale

### Product Name

```text
25px
700
```

### Page Title

```text
31px
600
line-height: 1.1
```

### Section Label

```text
11px
700
letter-spacing: 0.12em
uppercase
```

Example:

```text
01 / INVESTMENT
```

### Body

```text
14px
400
```

### Input Value

```text
16px
IBM Plex Mono
```

### Main Result

```text
38px
600
IBM Plex Mono
```

Mobile result:

```text
31px
```

---

## 9. Layout

Use a notebook/workbook layout rather than floating cards.

Desktop:

```text
┌──────────────────────────────────────────────────────────────┐
│ FinSight                                  BS3210 / ASSIGNMENT │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ CALCULATORS          WORKSPACE                               │
│                                                              │
│ 01 Future Value      FUTURE VALUE                            │
│ 02 Present Value                                             │
│ 03 Simple Interest   Principal                               │
│ 04 Compound Interest ₹1,00,000                               │
│ 05 EMI                                                       │
│ 06 Amortization      Rate                  Time              │
│ 07 Scenarios         10%                   5 years           │
│                                                              │
│                      [ Calculate ]                           │
│                                                              │
│                      ANSWER                                  │
│                      ₹1,61,051.00                            │
│                                                              │
│                      WORKING                                 │
│                      FV = P(1 + r)^t                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 10. Navigation

Navigation is simple and textual.

```text
CALCULATORS

01  Future Value
02  Present Value
03  Simple Interest
04  Compound Interest
05  EMI
06  Amortization
07  Scenarios
```

Numbers are part of the visual identity.

Do not use icon-heavy navigation or a dashboard.

---

## 11. Active Navigation

Identify the active calculator with:

- accent text
- slightly increased left padding
- stronger font weight

Do not use a large colored pill or colored vertical stripe.

---

## 12. Header

Minimal header:

```text
FinSight
Time Value of Money · Financial Calculation Notebook

BS3210
ASSIGNMENT 01
```

Use a strong horizontal rule below it.

The header should resemble the title/header of a technical notebook.

---

## 13. Calculator Page Structure

Every calculator follows:

```text
Section Number
Calculator Title
Short Description

────────────────────────────────────

INPUTS

Input
Input
Input

[ Calculate ] [ Reset ]

────────────────────────────────────

ANSWER

₹1,61,051.00
Future Value

WORKING

Formula
Substitution
Final calculation

────────────────────────────────────

VISUALIZATION / DETAILS
```

The page itself is the container. Do not wrap every section in rounded cards.

---

## 14. Inputs

Inputs should resemble fields written into a worksheet.

Use:

- transparent background
- bottom border
- no rounded container
- no large filled input box

Example:

```text
PRINCIPAL AMOUNT

₹ 1,00,000
────────────────────────
```

Focus state changes the bottom border to the accent color.

---

## 15. Buttons

Primary Calculate button:

```text
Background: #202923
Text: #F4F0E6
Border: #202923
Radius: 0–2px
```

Secondary Reset button:

```text
Background: transparent
Text: #202923
Border: #202923
Radius: 0–2px
```

Do not use pill buttons, glowing buttons, gradients, or animated arrows.

A subtle color change on hover is acceptable.

---

## 16. Result Presentation

The answer is the most important visual element.

```text
ANSWER

₹1,61,051.00

Future Value of the Investment
```

Use IBM Plex Mono, large type, accent green, and generous vertical spacing.

Do not place the answer inside a floating card with a shadow.

---

## 17. Calculation Working

This is a signature FinSight component.

Example:

```text
WORKING

FV = P(1 + r)^t

  = ₹1,00,000 × (1 + 0.10)^5

  = ₹1,61,051.00
```

The final calculation may receive a subtle underline.

This makes the application useful for demonstrating financial understanding as well as software implementation.

---

## 18. Future Value

Page identity:

```text
01 / INVESTMENT
Future Value
```

Inputs:

- Principal Amount
- Annual Rate
- Time, Years

Result:

- Future Value

Visualization:

- simple growth line
- one accent green line
- thin muted axes

---

## 19. Present Value

Page identity:

```text
02 / DISCOUNTING
Present Value
```

Inputs:

- Future Value
- Discount Rate
- Time, Years

Result:

- Present Value

Visualization:

A simple comparison between future amount and discounted current value.

No complex chart if it does not improve understanding.

---

## 20. Simple Interest

Page identity:

```text
03 / INTEREST
Simple Interest
```

Inputs:

- Principal
- Interest Rate
- Time

Results:

- Interest Earned
- Maturity Value

Working:

```text
SI = P × r × t
```

---

## 21. Compound Interest

Page identity:

```text
04 / COMPOUNDING
Compound Interest
```

Inputs:

- Principal
- Annual Rate
- Time
- Compounding Frequency

Options:

```text
Annually
Half-yearly
Quarterly
Monthly
```

Results:

- Compound Interest
- Maturity Value

Visualization:

Growth over time.

Where useful, compare simple and compound growth with restrained line styling.

---

## 22. EMI Calculator

Page identity:

```text
05 / LOAN
EMI Calculator
```

Inputs:

- Loan Amount
- Annual Rate
- Tenure, Years

Main result:

```text
MONTHLY EMI

₹21,247.04
```

Secondary results:

```text
Total Payment
₹12,74,822.36

Total Interest
₹2,74,822.36

Principal
₹10,00,000.00
```

Visualization:

Use a restrained principal-versus-interest comparison.

Avoid colorful dashboard pie charts.

---

## 23. Loan Amortization

Page identity:

```text
06 / REPAYMENT
Loan Amortization
```

The page should resemble a financial ledger.

Top summary:

```text
MONTHLY EMI       TOTAL INTEREST       PAYMENTS
₹21,247.04        ₹2,74,822.36         60
```

Then:

```text
OUTSTANDING BALANCE
```

with a simple declining line chart.

Then the table.

---

## 24. Amortization Table

Columns:

| Month | Opening | Interest | Principal | EMI | Closing |
|---|---:|---:|---:|---:|---:|

Rules:

- no rounded table container
- no shadow
- thin rules
- compact typography
- financial values right aligned
- month number centered or left aligned
- sticky header acceptable
- horizontal scrolling on mobile

The table should resemble an accounting ledger.

---

## 25. Scenario Analysis

Page identity:

```text
07 / COMPARISON
Scenario Analysis
```

Inputs:

- Loan Amount
- Tenure

Required rates:

```text
8%
10%
12%
15%
```

For each rate display:

- EMI
- Total Payment
- Total Interest

---

## 26. Scenario Visualization

Use a horizontal bar comparison.

Example:

```text
8%   █████████████
10%  ███████████████
12%  █████████████████
15%  █████████████████████
```

All bars use the same accent color.

Do not use four different colors.

---

## 27. Charts

Charts should look like graphs printed or drawn on paper.

Use:

- one primary line color
- thin axes
- subtle horizontal rules
- restrained labels
- no shadows
- no gradients
- no 3D
- no animated entrance
- no unnecessary legends

Chart background remains the paper color.

---

## 28. Practical Presets

A small number of real-world presets may be included:

```text
Home Loan
Car Loan
Education Loan
Personal Loan
Investment
```

Presets only populate reasonable example values.

The user must remain able to edit the values.

Do not turn presets into a large feature marketplace.

---

## 29. Financial Insight

After calculation, provide a short factual summary.

Example:

```text
LOAN SUMMARY

Monthly EMI
₹21,247.04

Over 60 payments, the total interest
payable is approximately ₹2.75 lakh.
```

The application should explain calculated results rather than tell users what financial decision to make.

---

## 30. Recent Calculations

A small calculation history can be included:

```text
RECENT CALCULATIONS

10:42  FV    ₹1,00,000 → ₹1,61,051
10:39  EMI   ₹10,00,000 → ₹21,247
10:31  CI    ₹1,00,000 → ₹1,64,362
```

Keep it secondary. Do not turn it into a dashboard.

---

## 31. Responsive Design

### Desktop

```text
Navigation | Calculation Workspace
```

### Tablet

Reduce navigation width.

### Mobile

Navigation becomes a horizontally scrollable section list:

```text
01 Future Value
02 Present Value
03 Simple Interest
...
```

Calculator becomes:

```text
Inputs
↓
Calculate
↓
Answer
↓
Working
↓
Chart
↓
Details
```

---

## 32. Mobile Inputs

Minimum recommended input height:

```text
44px
```

Inputs should remain touch-friendly while retaining the notebook visual treatment.

Do not convert inputs into large rounded cards.

---

## 33. Interaction

Allowed:

- input focus
- active navigation
- calculate state
- validation feedback
- chart update
- table scrolling
- optional theme switch

Avoid:

- bouncing
- floating cards
- animated arrows
- parallax
- decorative page transitions
- excessive hover animation

---

## 34. Validation

Example:

```text
ANNUAL RATE

-5%
────────────────────────
Rate cannot be negative.
```

Error color:

```text
#A14D43
```

Do not cover whole sections with red backgrounds.

---

## 35. Dark Mode

Dark mode is optional.

It should preserve the notebook identity.

Suggested palette:

```text
Background: #171A18
Surface: #202522
Text: #E6E2D8
Muted: #9AA29A
Rule: #3A403B
Accent: #6FA486
```

The dark theme should still feel like a calculation notebook rather than generic dark SaaS.

---

## 36. Accessibility

All controls need:

- clear labels
- keyboard access
- visible focus state
- readable contrast
- descriptive button text

Do not rely on icons alone.

---

## 37. Technical Structure

Recommended:

```text
index.html
│
├── Header
├── Calculator Navigation
├── Calculator Workspace
│   ├── Inputs
│   ├── Results
│   ├── Working
│   ├── Charts
│   └── Tables
└── Footer
```

CSS should define:

```text
Color Tokens
Typography
Spacing
Borders
Inputs
Buttons
Tables
Charts
Responsive Layout
Dark Theme
```

JavaScript should handle:

```text
Calculator Switching
Validation
Financial Calculations
Result Formatting
Chart Updates
Amortization Generation
Scenario Comparison
Theme Persistence
```

---

## 38. Example Reference Screen

```text
FinSight                                      BS3210
Time Value of Money · Financial Calculation Notebook

CALCULATORS

01 Future Value
02 Present Value
03 Simple Interest
04 Compound Interest
05 EMI
06 Amortization
07 Scenarios


01 / INVESTMENT

Future Value

Calculate what a present investment will be worth
after a specified period at an annual rate.

────────────────────────────────────────────────────

PRINCIPAL AMOUNT
₹ 1,00,000
────────────────────

ANNUAL RATE
10 %
────────────────────

TIME, YEARS
5
────────────────────

[ Calculate ]    [ Reset ]

────────────────────────────────────────────────────

ANSWER

₹1,61,051.00

Future value of the investment


WORKING

FV = P(1 + r)^t

   = ₹1,00,000 × (1 + 0.10)^5

   = ₹1,61,051.00


VALUE GROWTH

      ╱
    ╱
  ╱
╱
────────────────────────────────────────────────────
```

This screen is the visual reference for the rest of the application.

---

## 39. Design Quality Checklist

Before a screen is complete, verify:

- It looks like part of the same notebook.
- The calculation is immediately understandable.
- The result is visually dominant.
- Formula working is visible where appropriate.
- Numbers are easy to read.
- The paper background is subtle.
- The accent color is restrained.
- There are no unnecessary cards.
- There are no unnecessary animations.
- There are no unnecessary icons.
- The page remains useful without decoration.
- The design works on mobile.
- The screen still feels like a financial calculation tool.

---

## 40. Final Design Direction

FinSight should ultimately feel like:

> **A carefully designed financial notebook that happens to be interactive.**

The notebook visual language is not decoration added on top of the calculator.

It is the core interface language.
