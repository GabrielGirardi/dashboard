import React, { useState, ChangeEvent } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2'

const buyerName = [
    { value: ''},
    { value: 'Elvis Presley', label: 'Elvis Presley' },
    { value: 'Paul McCartney', label: 'Paul McCartney' },
    { value: 'Tom Scholz', label: 'Tom Scholz' },
    { value: 'Michael Jackson', label: 'Michael Jackson' },
];

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


interface SaleData {
    id: string;
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
        id: '',
        saleDate: new Date().toLocaleDateString('pt-BR'),
        buyerName: '',
        address: '',
        product: '',
        cost: '',
        paymentMethod: '',
        shippingStatus: ''
    });

    const validateCost = (value: string): boolean => {
        if (value.startsWith('0')) {
            return false;
        }
    
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
            return false;
        }
    
        if (value.length > 8) {
            return false;
        }
    
        return true;
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
        const emptyValues: SaleData = {
            id: '',
            saleDate: new Date().toLocaleDateString('pt-BR'),
            buyerName: '',
            address: '',
            product: '',
            cost: '',
            paymentMethod: '',
            shippingStatus: ''
        };

        Swal.fire({
            title: "Tem certeza?",
            text: "Os dados preenchidos serão perdidos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                setSaleData(emptyValues);
            }
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(saleData);
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
                            label="ID"
                            helperText="O id é preenchido automaticamente ao selecionar o cliente"
                            name="id"
                            disabled
                            value={saleData.id}
                            onChange={handleChange}
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
                            value={saleData.buyerName !== '' ? saleData.buyerName : undefined }
                        >
                            {buyerName.map((option) => (
                                <option key={option.value} value={option.value}>
                                    { option.label != null ? option.label : ''}
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
