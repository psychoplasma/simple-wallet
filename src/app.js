import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
    Login,
    Restore,
    ImportKeystoreFile,
    ImportMnemonics,
    ImportPrivateKey,
    Crowdsale,
    SpinToken,
    Permission,
    Wallet,
    Send,
    SendTransaction,
    TxReceipt,
    History,
    WriteContract,
    VestingAndLocks,
    LockedTokenList,
    LockDetails,
    Settings
} from './containers';
import { connect } from 'react-redux';
import NavigationBar from './components/NavBar.jsx';
import * as PATHS from './navigationPaths';
import { SPIN_TOKEN_CONTRACT_NAME, SPIN_CROWDSALE_CONTRACT_NAME } from './api/contractMetaData';

const theme = createMuiTheme({
    palette: {
        primary: { 
            main: '#42a5f5'
        },
    },
    typography: {
      htmlFontSize: 14,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'sans-serif',
      ].join(','),
    },
  });

class App extends React.Component {
    render() {
        const { encryptedWallet, isLoggedIn, isTokenContractAvailable, isSaleContractAvailable } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div>
                        <NavigationBar 
                            items={[
                                {path: PATHS.authScreen, name:'Wallet'},
                                {path: PATHS.tokenScreen, name:'Token'},
                                {path: PATHS.saleScreen, name:'Crowdsale'},
                                // {path: PATHS.vestingAndLocksScreen, name: 'VestingAndLocks'},
                                // {path: PATHS.permissionScreen, name:'Permission'}
                            ]}
                        />
                        <Route exact 
                            path={PATHS.authScreen} 
                            render={(props) => {
                                return (
                                    encryptedWallet 
                                    ?  !isLoggedIn
                                            ? <Login {...props}/>
                                            : <Wallet {...props}/>
                                    :  <Restore {...props}/>
                                )
                            }}
                        />
                        <Route path={PATHS.saleScreen} render={(props) => {return isLoggedIn && isSaleContractAvailable ? <Crowdsale {...props}/> : null;}}/>
                        <Route path={PATHS.tokenScreen} render={(props) => {return isLoggedIn && isTokenContractAvailable ? <SpinToken {...props}/> : null;}}/>
                        <Route path={PATHS.vestingAndLocksScreen} render={(props) => {return isLoggedIn && isSaleContractAvailable ? <VestingAndLocks {...props}/> : null;}}/>
                        <Route path={PATHS.permissionScreen} render={(props) => {return isLoggedIn && isSaleContractAvailable ? <Permission {...props}/> : null;}}/>
                        <Route path={PATHS.walletScreen} component={Wallet}/>
                        <Route path={PATHS.sendScreen} component={Send}/>
                        <Route path={PATHS.sendTransactionScreen} component={SendTransaction}/>
                        <Route path={PATHS.txReceiptScreen} component={TxReceipt}/>
                        <Route path={PATHS.loginScreen} component={Login}/>
                        <Route path={PATHS.restoreScreen} component={Restore}/>
                        <Route path={PATHS.historyScreen} component={History}/>
                        <Route path={PATHS.importKeystoreFileScreen} component={ImportKeystoreFile}/>
                        <Route path={PATHS.importMnemonicsScreen} component={ImportMnemonics}/>
                        <Route path={PATHS.importPrivateKeyScreen} component={ImportPrivateKey}/>
                        <Route path={PATHS.writeContractScreen} component={WriteContract}/>
                        <Route path={PATHS.lockedTokenListScreen} component={LockedTokenList}/>
                        <Route path={PATHS.lockDetailsScreen} component={LockDetails}/>
                        <Route path={PATHS.settingsScreen} component={Settings}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ authState, contracts }) => {
    return {
        isLoggedIn: authState.isLoggedIn,
        encryptedWallet: authState.encryptedWallet,
        network: authState.network,
        isTokenContractAvailable: contracts[authState.network] && contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME]
            ? !!contracts[authState.network][SPIN_TOKEN_CONTRACT_NAME].address : false,
        isSaleContractAvailable: contracts[authState.network] && contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME]
            ? !!contracts[authState.network][SPIN_CROWDSALE_CONTRACT_NAME].address : false
    };
}

export default connect(mapStateToProps)(App);
