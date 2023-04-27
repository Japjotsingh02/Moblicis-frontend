import React from 'react';
import { Wrapper } from './Homepage.style';
import Table from '../../components/Table/Table';

function Homepage() {
    const firstReqBody={
        income:5,
        car:['BMW','Mercedes-Benz']
    };

    const secondReqBody={
        gender:'Male',
        phone_price:10000,
    };

    const thirdReqBody={
        startsWith:'M'
    }

    const fourthReqBody={
        car:['BMW','Mercedes-Benz','Audi']
    }

    return (
        <Wrapper>
            <h1 className='header'>Mobilicis Assignment</h1>

            <div className='query'>1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</div>
            <Table endPoint="IncomeCarFilter" reqBody={firstReqBody}/>
            <div className='query'>2. Male Users which have phone price greater than 10,000.</div>
            <Table endPoint="PhonePriceFilter" reqBody={secondReqBody}/>
            <div className='query'>3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.</div>
            <Table endPoint="lnameEmailFilter" reqBody={thirdReqBody}/>
            <div className='query'>4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</div>
            <Table endPoint="CarEmailFilter" reqBody={fourthReqBody}/>
            <div className='query'>5. Show the data of top 10 cities which have the highest number of users and their average income.</div>
            <Table endPoint="Top10Cities"/>

        </Wrapper>
    );
}

export default Homepage;