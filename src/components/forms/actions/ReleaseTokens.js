import React from 'react';
import PropTypes from 'prop-types';
import PopupPatcher from '../../PopupPatcher';
import { ActionEntryCard } from '../../cards';
import { isValidAddress } from '../../../utils/web3-utils';
import { csvFileToJson } from '../../../utils/fileUtils';


class ReleaseTokens extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      addressList: [],
      loading: false
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onAddHandler = this.onAddHandler.bind(this);
    this.onUploadHandler = this.onUploadHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
  }

  validateInputs(address) {
    if (!isValidAddress(address)) {
      this.props.showMessageBox('Invalid input value!');
      return false;
    }
    return true;
  }

  formatEntries(addressList) {
    if (!addressList || !addressList.length) {
      return '';
    }
    return addressList.reduce((acc, curr) => `${acc}\n${curr.address}`, '');
  }

  onAddHandler() {
    this.setState(state => {
      if (!this.validateInputs(state.address)) { return; }
      state.addressList.push({address: state.address});
      return {
        address: '',
        addressList: state.addressList
      }
    });
  }

  async onUploadHandler(filename) {
    this.setState({ loading: true });
    try {
      let jsonArray = await csvFileToJson(filename);
      this.setState({
        address: '',
        addressList: jsonArray
      });
    } catch (e) {
      this.props.showMessageBox(`Cannot parse the file! Error: ${e.message}`);
    } finally {
      this.setState({ loading: false });
    }
  }

  onClearHandler() {
    this.setState({
      entries: '',
      address: '',
      addressList: []
    });
  }

  onSubmitHandler() {
    try {
      let addressList = this.state.addressList.map(item => {
        if (!isValidAddress(item.address)) {
          throw new Error(`Input list contains an invalid Ethereum address => ${item.address}`);
        }
        return item.address;
      });
      this.props.onSubmit(addressList);
    } catch (e) {
      this.props.showMessageBox(e.message);
    }
  }

  render() {
    return (
      <ActionEntryCard
        title={'Release Tokens For'}
        size={1.15}
        inputList={[
          {
            label: 'Address',
            placeholder: 'Ethereum address',
            onChange: event => this.setState({address: event.target.value}),
            value: this.state.address
          }
        ]}
        listLabel={'Address List'}
        entries={this.formatEntries(this.state.addressList)}
        onAdd={this.onAddHandler}
        onUpload={this.onUploadHandler}
        onClear={this.onClearHandler}
        onSubmit={this.onSubmitHandler}
        processing={this.props.loading || this.state.loading}
      />
    );
  }
}

ReleaseTokens.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default PopupPatcher(ReleaseTokens);
