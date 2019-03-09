# simple-wallet
Simple Ethereum Wallet

## Installing dependencies

```
# Install nvm
brew install nvm

# Install node.js
nvm node v8.12.0

# Install node modules (run in the project directory)
npm install

# Install electron
npm install -g electron

# Install browserify
npm install -g browserify

```

## Running app

1. `nvm use v8.12.0`
2. Install sub-project as npm module locally `npm link <path_to_sub_project/ethers.js>`
3. For development stage run `npm run buildRun-dev` in project directory
4. For production stage run `npm run buildRun-prod` in project directory
