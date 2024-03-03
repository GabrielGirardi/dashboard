import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Button, CardMedia, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
}

export default function PeopleList() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get<Customer[]>('http://localhost:3000/api/customers');
                setCustomers(response.data);
            } catch (error) { 
                Swal.fire({
                    icon: 'error',
                    title: 'Ooops',
                    text: 'Aconteceu um problema, recarregar a página pode resolver!' + '<br/>' + error,
                    confirmButtonText: 'Ok'
                })
            }
        };

        fetchCustomers();
    }, []);

    const handleDeleteCustomer = async (customerId?: string) => {
        const result = await Swal.fire({
          title: 'Tem certeza?',
          text: 'Você não poderá reverter isso!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, exclua!',
          cancelButtonText: 'Cancelar'
        });
      
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/customers/${customerId}`);
                const updatedCustomers = customers.filter(customer => customer._id !== customerId);
                setCustomers(updatedCustomers);
                Swal.fire('Excluído!', 'O cliente foi excluído.', 'success');
            } catch (error) {
                Swal.fire('Erro!', 'Ocorreu um erro ao excluir o cliente.', 'error');
            }
        }
    };

    const renderDeleteButton = (params: any) => (
        <Button onClick={() => handleDeleteCustomer(params.row.id)} variant="contained" color="error" size="small">
            <DeleteForeverIcon fontSize="small"/>
        </Button>
    );

    const rows = customers.map(customer => ({
        id: customer._id,
        Nome: customer.name,
        Email: customer.email,
        Telefone: customer.phone,
        Endereço: customer.address,
        Sexo: customer.gender
    }));

    return (
        <Container style={{ height: '50%', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4, backgroundColor: 'white', py: 3, borderRadius: 1, border: 1, borderColor: 'lightgray' }}>
            <Button variant="contained" color="primary" sx={{ padding: 1, mb: 3 }} href="/cadastro">
                <AddCircleIcon fontSize="small" sx={{ mr: 1 }}/>
                <span style={{ height: '20px' }}>Cadastrar</span>
            </Button>
            { rows.length > 0 ? 
                ( <DataGrid
                    columns={[
                        { field: 'Nome', hideable: false },
                        { field: 'Email' },
                        { field: 'Telefone' },
                        { field: 'Endereço' },
                        { field: 'Sexo' },
                        { field: 'Ação', sortable: false, filterable: false, renderCell: renderDeleteButton }
                    ]}
                    rows={rows}
                    slots={{
                        toolbar: GridToolbar,
                    }} 
                />) : ( 
                    <>
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://miro.medium.com/v2/resize:fit:1358/1*kfdT_C6c0GRws836VE7UgQ.gif"
                            alt="Realize seu primeiro cadastro"
                            sx={{ objectFit: 'contain' }}
                        />
                        <Typography variant="h4" gutterBottom sx={{ display: 'flex', justifyContent: 'center', textTransform: 'capitalize' }}>
                            Realize seu primeiro registro
                        </Typography>
                    </>
                )
            }
        </Container>
    );
}
