# spin-protocol-admin-tool
Administration App for SpinProtocol decentralized environment

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

1. Clone sub-project to your local `git clone https://github.com/spinprotocol/ethers.js.git`
2. `nvm use v8.12.0`
3. Install sub-project as npm module locally `npm link <path_to_sub_project/ethers.js>`
4. For development stage run `npm run buildRun-dev` in project directory
5. For production stage run `npm run buildRun-prod` in project directory
