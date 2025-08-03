##  Jupiter Toys - Playwright Test Suite

## 🚀 Installation

1. **Set up Node.js**
   - Install Node.js
   - [Download Node.js](https://nodejs.org/en/download/)
   - Restart your terminal after installation

2. **Clone the repository and install dependencies**
   ```sh
   git clone https://github.com/BrendanLester/JupiterToys
   cd JupiterToys
   npm i
   ```

3. **Install Playwright dependencies**
   ```sh
   npx playwright install
   ```

3. **Run Tests**
   ```sh
   npx playwright test                          //run all tests
   ```
   ```sh
   npx playwright test -g cart.spec.ts          //run an individual test
   ```


## CI/CD
Junit reporting has been enabled within playwright.config.ts for use in CI/CD tools

## OOP Information
OOP has purposely not been used in this test suite. The Page/POM structure is 'Classless'.

## Test Cases
| Test Case  | Test Spec File                             | 
|------------|--------------------------------------------|
|Test Case 1 | [contact.spec.ts](./tests/contact.spec.ts) |
|Test Case 2 | [contact.spec.ts](./tests/contact.spec.ts) |
|Test Case 3 | [cart.spec.ts](./tests/cart.spec.ts)       |
