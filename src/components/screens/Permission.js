import React from 'react';
import PropTypes from 'prop-types';
import {
  PageContainer,
  PageHeader,
  PageContent,
  Row,
  Column
} from '../boxes';
import {
    AddToWhiteList,
    WhitelistCheck,
    AddAdmin,
    AdminCheck,
    AddWhiteList
} from '../forms/actions';
import LabeledValue from '../LabeledValue.jsx';
import Separator from '../Separator.jsx';
import ScreenTitle from '../ScreenTitle.jsx';


export default function PermissionScreen(props) {
  return (
    <PageContainer>
      <PageHeader>
        <Column>
          <ScreenTitle title={'Crowdsale Permissions'}/>
          <Separator/>
          <Row>
            <LabeledValue
              style={{width: 400}}
              label={'Contract Address'}
              value={props.contractAddress}
            />
          </Row>
        </Column>
      </PageHeader>
      <PageContent>
        <Row>
          <Column>
            <AddToWhiteList
              onAdd={props.onAddToWhitelist}
              onRemove={props.onRemoveFromWhitelist}
            />
            <Separator vertical={true}/>
            <WhitelistCheck
              onSubmit={props.onWhitelistCheck}
              isWhitelisted={props.isWhitelisted}
              processing={props.loadingIsWhitelisted}
            />
          </Column>
          <Separator/>
          <Row>
            <AddWhiteList onSubmit={props.onAddWhitelist}/>
          </Row>
        </Row>
        <Separator spacing={30}/>
        <Row>
          <AddAdmin onSubmit={props.onAddAdmin}/>
          <AdminCheck
            onSubmit={props.onAdminCheck}
            isAdmin={props.isAdmin}
            processing={props.loadingIsAdmin}
          />
        </Row>
      </PageContent>
    </PageContainer>
  );
}

PermissionScreen.propTypes = {
  contractAddress: PropTypes.string,
  onAddWhitelist: PropTypes.func.isRequired,
  onAddToWhitelist: PropTypes.func.isRequired,
  onRemoveFromWhitelist: PropTypes.func.isRequired,
  onWhitelistCheck: PropTypes.func.isRequired,
  onAddAdmin: PropTypes.func.isRequired,
  onRenounceAdmin: PropTypes.func.isRequired,
  onAdminCheck: PropTypes.func.isRequired,
  thisAccount: PropTypes.string,
  isAdmin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  isWhitelisted: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  loadingIsAdmin: PropTypes.bool,
  loadingIsWhitelisted: PropTypes.bool,
};
