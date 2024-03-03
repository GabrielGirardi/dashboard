import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

interface Order {
    saleDate: string;
    buyerName: string;
    address: string;
    paymentMethod: string;
    cost: string;
}

const RecentOrders = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/orders');
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function preventDefault(event: React.MouseEvent) {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <Title>Pedidos Recentes</Title>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Endereço</TableCell>
                            <TableCell>Forma de Pagamento</TableCell>
                            <TableCell align="right">Valor</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => (
                            <TableRow key={index}>
                                <TableCell>{order.saleDate}</TableCell>
                                <TableCell>{order.buyerName}</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>{order.paymentMethod}</TableCell>
                                <TableCell align="right">{`R$ ${order.cost}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                Exibir Mais
            </Link>
        </React.Fragment>
    );
}

export default RecentOrders;
