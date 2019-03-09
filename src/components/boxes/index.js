import React from 'react';
import styled from 'styled-components';


export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 5px 20px 20px
`;

export const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
    padding: 5px;
`;

export const PageContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 40px
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: stretch;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: stretch;
`;
