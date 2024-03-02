import { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import Swal from 'sweetalert2'

import AddReactionIcon from '@mui/icons-material/AddReaction';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid
} from '@mui/material';

  
const states = [
    { value: ''},
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'PR', label: 'Paraná' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'BA', label: 'Bahia' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'CE', label: 'Ceará' }
];

const gender = [
    { value: ''},
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' }
];

interface ValuesType {
    name?: string,
    birth?: string,
    email?: string,
    phone?: string,
    address?: string,
    state?: string,
    cep?: string,
    gender?: string
}



const RegisterPage: React.FC = () => {
    const [values, setValues] = useState<ValuesType>({
        name: '',
        birth: '',
        email: '',
        phone: '',
        address: '',
        state: '',
        cep: '',
        gender: ''
    })


    const [error, setError] = useState(false);
    
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));

        if (value.trim() === "") {
            setValues((prevState) => ({ ...prevState, [name]: '' }));
            return;
        }

        if (name === 'cep') {
            let formattedValue = value.replace(/\D/g, '');

            if (formattedValue.length > 5) {
                formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(5)}`;
            }

            if (formattedValue.length > 9) {
                formattedValue = formattedValue.slice(0, 9);
            }

            setValues((prevState) => ({ ...prevState, [name]: formattedValue }));

            const cepRegex = /^[0-9]{5}-[0-9]{3}$/;

            setError(!cepRegex.test(formattedValue) && formattedValue.length > 0);
        } else if (name === 'phone') {
            let formattedValue = value.replace(/\D/g, '');

            if (formattedValue.length > 2) {
                formattedValue = `(${formattedValue.slice(0, 2)})${formattedValue.slice(2)}`;
            }

            if (formattedValue.length > 9) {
                formattedValue = `${formattedValue.slice(0, 9)}-${formattedValue.slice(9)}`;
            }

            if (formattedValue.length > 14) {
                formattedValue = formattedValue.slice(0, 14);
            }

            setValues((prevState) => ({ ...prevState, [name]: formattedValue }));
        } else if (name === 'birth') {
            const birthYear = parseInt(value.split('-')[0]);
            const birthMonth = parseInt(value.split('-')[1]) - 1; // Subtraindo 1 do mês
            const birthDay = parseInt(value.split('-')[2]);

            const birthDate = new Date(birthYear, birthMonth, birthDay);

            if (birthDate > new Date()) {
                Swal.fire({
                    title: "Oooops!",
                    text: "A data de nascimento está incorreta.",
                    icon: "warning",
                    confirmButtonText: "Entendi"
                });

                setValues((prevState) => ({ ...prevState, [name]: '' }));
            }
        } else {
            setValues((prevState) => ({ ...prevState, [name]: value }));
        }

    }, []);

    const handleCancel = () => {
        const emptyValues: ValuesType = {
            name: '',
            birth: '',
            email: '',
            phone: '',
            address: '',
            state: '',
            cep: '',
            gender: ''
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
                setValues(emptyValues);
            }
        });
    };
    
    const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Dados do formulário:', values);
    }, [values]);

      
    return (
        <Container style={{ height: '80%', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Card sx={{ padding: 4 }}>
                    <CardHeader title="Cadastro de Clientes" subheader="Preencha os campos para realizar o cadastro"/>
                    <CardContent sx={{ mt: 1 }}>
                        <Box sx={{ p: -1.5 }}>
                            <Grid container spacing={3}>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        helperText="Preencha o nome completo"
                                        label="Nome Completo"
                                        name="name"
                                        onChange={handleChange}
                                        value={values.name}
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        helperText="Data de nascimento"
                                        name="birth"
                                        onChange={handleChange}
                                        type="date"
                                        value={values.birth}
                                        required 
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        helperText="E-mail para contato"
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Telefone"
                                        name="phone"
                                        helperText="Número para contato"
                                        value={values.phone}
                                        onChange={handleChange}          
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                        <TextField
                                        fullWidth
                                        label="Endereço"
                                        name="address"
                                        helperText="Endereço residencial"
                                        onChange={handleChange}
                                        value={values.address}
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="UF"
                                        name="state"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.state !== '' ? values.state : undefined }
                                    >
                                    {states.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            { option.label != null ? option.label : ''}
                                        </option>
                                    ))}
                                    </TextField>
                                </Grid>
                                <Grid xs={12} md={6}>
                                        <TextField
                                        fullWidth
                                        label="CEP"
                                        name="cep"
                                        error={error}
                                        helperText={error ? 'Formato inválido 00000-000' : 'Código de Endereço Postal (00000-000)'}
                                        onChange={handleChange}
                                        value={values.cep}
                                        required
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Sexo"
                                        name="gender"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.gender !== '' ? values.gender : undefined }
                                    >
                                    {gender.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            { option.label != null ? option.label : ''}
                                        </option>
                                    ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>

                    <Divider />
                    
                    <CardActions sx={{ justifyContent: 'flex-end', mt: 3 }}>
                        <Button variant="contained" color="success" type="submit" sx={{ mr: 1, padding: 1.5 }}>
                            <AddReactionIcon fontSize="small" sx={{ mr: 1 }}/> 
                            <span style={{ height: '20px' }}>Cadastrar</span>
                        </Button>
                        <Button variant="contained" color="error" sx={{ ml: 1, padding: 1.5 }} onClick={handleCancel}>
                            <ClearIcon fontSize="small" sx={{ mr: 1 }} />
                            <span style={{ height: '20px' }}>Cancelar</span>
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Container>
    );
}

export default RegisterPage;