import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';

export default function OrdersList() {
    const [ordersInfo, setOrdersInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/orders');
                setOrdersInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao obter os dados:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: 'Tem certeza?',
                text: 'Esta ação é irreversível!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, exclua!',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
                setOrdersInfo(ordersInfo.filter(order => order._id !== orderId));
                Swal.fire('Excluído!', 'O pedido foi excluído com sucesso.', 'success');
            }
        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao excluir o pedido.', 'error');
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/orders/${orderId}`, { status: newStatus });
            const updatedOrders = ordersInfo.map(order => {
                if (order._id === orderId) {
                    return { ...order, shippingStatus: newStatus };
                }
                
                return order;
            });
            setOrdersInfo(updatedOrders);
            Swal.fire('Sucesso!', 'O status da entrega foi atualizado.', 'success');
        } catch (error) {
            console.error('Erro ao atualizar o status da entrega:', error);
            Swal.fire('Erro!', 'Ocorreu um erro ao atualizar o status da entrega.', 'error');
        }
    };

    const handleOpenMenu = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrderId(orderId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedOrderId(null);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'saleDate', headerName: 'Data', width: 150 },
        { field: 'buyerName', headerName: 'Nome', width: 150 },
        { field: 'address', headerName: 'Endereço', width: 150 },
        { field: 'product', headerName: 'Produto', width: 150 },
        { field: 'paymentMethod', headerName: 'Form. Pagamento', width: 150 },
        { field: 'cost', headerName: 'Valor', width: 150 },
        { field: 'shippingStatus', headerName: 'Status', width: 150 },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 180,
            renderCell: (params) => (
                <div>
                    <IconButton
                        aria-controls="actions-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleOpenMenu(event, params.row._id)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="actions-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedOrderId === params.row._id}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={() => handleUpdateStatus(params.row._id, 'Aguardando Postagem')}>Aguardando Postagem</MenuItem>
                        <MenuItem onClick={() => handleUpdateStatus(params.row._id, 'Em trânsito')}>Em trânsito</MenuItem>
                        <MenuItem onClick={() => handleUpdateStatus(params.row._id, 'Entregue')}>Entregue</MenuItem>
                        <MenuItem onClick={() => handleDeleteOrder(params.row._id)}>Excluir</MenuItem>
                    </Menu>
                </div>
            ),
        },
    ];

    return (
        <Container style={{ height: '80%', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <DataGrid
                    rows={ordersInfo.map(order => ({ id: order._id, ...order }))}
                    columns={columns}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                />
            )}
        </Container>
    );
}
