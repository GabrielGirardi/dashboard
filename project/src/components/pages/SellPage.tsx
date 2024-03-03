import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ClearIcon from '@mui/icons-material/Clear';

const shippingStatus = [
    { value : '' },
    { value : 'Aguardando Postagem', label: 'Aguardando Postagem' },
    { value: 'Em trânsito', label: 'Em trânsito' },
    { value: 'Entregue', label: 'Entregue' }
]

const paymentMethod = [
    { value : '' },
    { value: 'Dinheiro', label: 'Dinheiro'},
    { value:'PIX',label:'PIX' },
    { value: 'Mastercard', label: 'Mastercard - Débito/Crédito' },
    { value: 'Visa', label: 'Visa - Débito/Crédito' },
    { value: 'Amex', label: 'Amex - Débito/Crédito' },
    { value: 'Elo', label: 'Elo - Débito/Crédito' },
    { value: 'Hipercard', label: 'Hipercard - Débito/Crédito' }
]

interface Buyer {
    value: string;
    label?: string;
}

interface SaleData {
    hour: string;
    saleDate: string;
    buyerName: string;
    address: string;
    product: string;
    cost: string;
    paymentMethod: string;
    shippingStatus: string;
}

const SalesPage: React.FC = () => {
    const [saleData, setSaleData] = useState<SaleData>({
        hour: new Date().toLocaleTimeString(),
        saleDate: new Date().toLocaleDateString('pt-BR'),
        buyerName: '',
        address: '',
        product: '',
        cost: '',
        paymentMethod: '',
        shippingStatus: ''
    });

    const [buyers, setBuyers] = useState<Buyer[]>([]);

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                const response = await axios.get<Buyer[]>('http://localhost:3000/api/customers');
                setBuyers(response.data);
            } catch (error) { 
                Swal.fire({
                    icon: 'error',
                    title: 'Ooops',
                    text: 'Aconteceu um problema, recarregar a página pode resolver!' + '<br/>' + error,
                    confirmButtonText: 'Ok'
                })
            }
        };

        fetchBuyers();
    }, []);

    const validateCost = (value: string): boolean => {
        return !(
            value.startsWith('0') ||
            !/^\d+(\.\d{0,2})?$/.test(value) ||
            value.length > 8
        );
    };
    
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown; }>) => {
        const { name, value } = event.target;

        if (name === 'cost' && !validateCost(String(value))) {
            return; 
        }

        setSaleData(prevState => ({
            ...prevState,
            [name!]: value
        }));
    };

    const handleCancel = () => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Os dados preenchidos serão perdidos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const emptyValues: SaleData = {
                    hour: new Date().toLocaleTimeString(),
                    saleDate: new Date().toLocaleDateString('pt-BR'),
                    buyerName: '',
                    address: '',
                    product: '',
                    cost: '',
                    paymentMethod: '',
                    shippingStatus: ''
                };
                setSaleData(emptyValues);
            }
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/orders', saleData);
            console.log('Venda criada com sucesso:', response.data);

            const emptyValues: SaleData = {
                hour: new Date().toLocaleTimeString(),
                saleDate: new Date().toLocaleDateString('pt-BR'),
                buyerName: '',
                address: '',
                product: '',
                cost: '',
                paymentMethod: '',
                shippingStatus: ''
            };
            
            setSaleData(emptyValues);

            Swal.fire({
                title: "Venda realizada!",
                text: "A venda foi registrada com sucesso.",
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (error) {
            console.error('Erro ao criar venda:', error);

            Swal.fire({
                title: "Erro!",
                text: "Ocorreu um erro ao registrar a venda." + "<br/>" + error,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, p: 2, backgroundColor: 'white', border: 1, borderColor: 'lightgray', boxShadow: 1, borderRadius: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex' }}>
                <ShoppingBagIcon fontSize="large" sx={{ mr: 1 }} />
                PDV
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Horário"
                            helperText="É preenchido automaticamente com o horário atual por padão"
                            name="id"
                            value={saleData.hour}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Data da Venda"
                            name="saleDate"
                            helperText="Por padrão, é utilizado a data atual"
                            type="text"
                            value={saleData.saleDate}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Selecione um cliente"
                            name="buyerName"
                            helperText="O cadastro pode ser feito na aba de clientes"
                            onChange={handleChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            value={saleData.buyerName}
                            InputLabelProps={{ shrink: true }}
                        >
                            <option value="">Selecione...</option>
                            {buyers.map((option) => (
                                <option key={option.name} value={option.name}>
                                    { option.name != null ? option.name : ''}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Endereço"
                            name="address"
                            value={saleData.address}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Produto"
                            name="product"
                            value={saleData.product}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Valor R$"
                            name="cost"
                            value={saleData.cost}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Forma de Pagamento"
                            name="paymentMethod"
                            value={saleData.paymentMethod}
                            select
                            SelectProps={{ native: true }}
                            onChange={handleChange}
                            required
                        >
                            {paymentMethod.map((option) => (
                                <option key={option.value} value={option.value}>
                                    { option.label != null ? option.label : ''}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Status de Envio"
                            required
                            select
                            SelectProps={{ native: true }}
                            name="shippingStatus"
                            value={saleData.shippingStatus}
                            onChange={handleChange}
                        >
                            {shippingStatus.map((option) => (
                                <option key={option.value} value={option.value}>
                                    { option.label != null ? option.label : ''}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Button variant="contained" color="success" type="submit" sx={{ mt: 4, mr: 1, padding: 1.5 }} title="Realizar venda">
                    <AddShoppingCartIcon fontSize="small" sx={{ mr: 1 }} />
                    <span style={{ height: '20px' }}>Confirmar</span>
                </Button>
                <Button variant="contained" color="warning" href="/cadastro" sx={{ mt: 4, mr: 1, padding: 1.5 }} title="Registrar novo usuário">
                    <PersonAddAlt1Icon fontSize="small" sx={{ mr: 1 }} />
                    <span style={{ height: '20px' }}>Adicionar</span>
                </Button>
                <Button variant="contained" color="error" sx={{ mt: 4, padding: 1.5 }} onClick={handleCancel} title="Apagar Campos Preenchidos">
                    <ClearIcon fontSize="small"/>
                </Button>
            </form>
        </Container>
    );
};

export default SalesPage;
