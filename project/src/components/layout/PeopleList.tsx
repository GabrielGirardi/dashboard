import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const rows = [
    {
        id: 0,
        Nome: 'Elvis Presley',
        Idade: 38,
        Email: 'elvis.p@gmail.com',
        Telefone: '(+52) 31 555-321',
        Endereço: 'Tupelo, MS',
        Sexo: 'Masculino'
    },
    {
        id: 1,
        Nome: 'Paul McCartney',
        Idade: 31,
        Email: 'mcpaul@hotmail.com',
        Telefone: '(+22) 3125-4123',
        Endereço: 'London, UK',
        Sexo: 'Masculino'
    },
    {
        id: 2,
        Nome: 'Tom Scholz',
        Idade: 54,
        Email: 'tom.scholz@gmail.com',
        Telefone: '(+31) 555-312',
        Endereço: 'Boston, MA',
        Sexo: 'Masculino'
    },
    {
        id: 3,
        Nome: 'Michael Jackson',
        Idade: 58,
        Email: 'mj@outlook.com',
        Telefone: '(+31) 2455-031',
        Endereço: 'Gary, IN',
        Sexo: 'Masculino'
    },
    {
        id: 4,
        Nome: 'Bruce Springsteen',
        Idade: 22,
        Email: 'bruce.spring@gmail.com',
        Telefone: '(+18) 222-901',
        Endereço: 'Long Branch, NJ',
        Sexo: 'Masculino'
    }
];

export default function PeopleList() {
    return (
        <Container style={{ height: '50%', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4, backgroundColor: 'white', py: 3, borderRadius: 1, border: 1, borderColor: 'lightgray' }}>
            <Button variant="contained" color="primary" sx={{ padding: 1, mb: 3 }} href="/cadastro">
                <AddCircleIcon fontSize="small" sx={{ mr: 1 }}/>
                <span style={{ height: '20px' }}>Cadastrar</span>
            </Button>
            <DataGrid
                columns={[
                    { field: 'Nome', hideable: false },
                    { field: 'Idade' },
                    { field: 'Email' },
                    { field: 'Telefone' },
                    { field: 'Endereço' },
                    { field: 'Sexo' }
                ]}
                rows={rows}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </Container>
    );
}
