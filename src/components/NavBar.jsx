import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import styled from 'styled-components';


export default function NavigationBar(props) {
    let renderItems = () => {
        return props.items.map((item, index) => {
            return (
                <LinkItem key={ index } href={`${item.path}`}>
                    { item.name }
                </LinkItem>
            );
        });
    };

    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Container>
                        <SpinLogo/>
                    </Container>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav style={{padding:10, alignSelf: 'center'}}>
                    { renderItems() }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

class LinkItem extends NavItem {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link 
                to={this.props.href}
                style={{
                    margin: 20,
                    alignSelf: 'center',
                    color: '#64b5f6',
                    fontSize: 16,
                    fontWeight: '400',
                }}
            >
                {this.props.children}
            </Link>
        );
    }
}

const SpinLogo = styled.div`
    background-image: url("../assets/logo_spin_with_text.png");
    width: 198px;
    height: 26px;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
