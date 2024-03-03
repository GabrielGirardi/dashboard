import * as React from 'react';
import PeopleList from '../layout/PeopleList';

const CustomerPage: React.FC = () => {
    return (
        <div style={{ backgroundColor: 'white', borderRadius: 1, border: 1, borderColor: 'lightgray' }}>
            <PeopleList/>
        </div>
    );
};

export default CustomerPage;