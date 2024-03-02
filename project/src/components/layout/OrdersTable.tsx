import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Container from '@mui/material/Container';


function createData(
        id: number, 
        date: string, 
        name: string, 
        address: string, 
        product: string, 
        card: string, 
        amount: number, 
        status: string
    ) {
    return { id, date, name, address, product, card, amount, status };
}


export default function OrdersTable() {
    const modifiedData = React.useMemo(() => {
        const ordersInfo = [
            createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'Camisa Azul Nike', 'VISA ⠀•••• 3719', 312.44, 'Entregue'),
            createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'Calça Jeans Preta Recortada', 'VISA ⠀•••• 2574', 866.99, 'Em trânsito'),
            createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'Bola de Futebol Campo', 'MC ⠀•••• 1253', 100.81, 'Aguardando Postagem'),
            createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'Bola de Vôlei Areia', 'AMEX ⠀•••• 2000', 654.39, 'Entregue'),
            createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'Tênis Puma Branco/Dourado', 'VISA ⠀•••• 5919', 212.79, 'Entregue'),
        ];

        const columns = [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'date', headerName: 'Data', width: 150 },
            { field: 'name', headerName: 'Nome', width: 150 },
            { field: 'address', headerName: 'Endereço', width: 150 },
            { field: 'product', headerName: 'Produto', width: 150 },
            { field: 'card', headerName: 'Form. Pagamento', width: 150 },
            { field: 'amount', headerName: 'Valor', width: 150 },
            { field: 'status', headerName: 'Status', width: 150 },
        ];

        return { columns, rows: ordersInfo };
    }, []);

    return (
        <Container style={{ height: '80%', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <DataGrid
                {...modifiedData}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </Container>
    );
}