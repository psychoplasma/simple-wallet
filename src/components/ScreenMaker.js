import React from 'react';
import { PageContainer, Row } from './boxes';


const ScreenMaker = (WrappedComponent, screenProps) => {
  return class extends React.Component {
    render() {
      let { title, size, ...passThroughProps } = this.props;
      return (
        <PageContainer style={{justifyContent: 'center', alignItems: 'center'}}>
          <Row>
            <WrappedComponent
              title={screenProps.title || this.title || ''}
              size={screenProps.size || this.size || 1}
              goBackable={screenProps.goBackable === true}
              {...passThroughProps}
            />
          </Row>
        </PageContainer>
      );
    }
  }
}

export default ScreenMaker;
