import React from 'react';
import styled from 'styled-components';
import Separator from './Separator.jsx';


const CardMaker = (WrappedComponent) => {
    return class extends React.Component {
        renderIcon() {
            if (!this.props.icon) { return null; }
            return <CardIcon src={this.props.icon}/>;
        }

        render() {
            let {title, size, goBackable, goBack, ...passThroughProps} = this.props;
            return (
                <Card size={size}>
                    <CardHeader>
                        {this.renderIcon()}
                        {title ? title.toUpperCase() : ''}
                    </CardHeader>

                    <Separator line={true}/>

                    <CardContent>
                        <WrappedComponent {...passThroughProps}/>
                    </CardContent>

                    {    
                        goBackable            
                            ?   <div>
                                    <Separator spacing={20}/>
                                    <CardFooter>
                                        <a style={{textAlign: 'center'}} onClick={goBack}>
                                            Go Back
                                        </a>
                                    </CardFooter>
                                </div>
                            : null
                    }
                </Card>
            );
        }
    }
}

export default CardMaker;

const Card = styled.div`
    display: flex;
    width: ${props => !props.size ? '350px' : `${props.size * 350}px`};
    padding: 20px 0px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    background-color: white;
    box-shadow: -5px 3px 14px 4px rgba(0,0,0,0.24);
    border-radius: 5px;
`;

const CardIcon = styled.div`
    width: 32px;
    height: 32px;
    margin-bottom: 20px;
    background-image: url(${props => props.src})
`;

const CardHeader = styled.div`
    display: flex;
    color: #6e6e6e;
    font-size: 18px;
    font-weight: 600;
    align-self: center;
`;

const CardContent = styled.div`
    display: flex;
    flex: 1;
    padding: 0px 20px 0px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
`;

const CardFooter = styled.div`
    display: flex;
    padding: 0px 20px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
