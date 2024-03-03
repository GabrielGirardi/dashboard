import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    const [dailyTotal, setDailyTotal] = useState(0);

    useEffect(() => {
        const fetchDailyTotal = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/orders');
                const orders = response.data;
                const total = orders.reduce((acc: number, curr: { cost: string }) => acc + parseFloat(curr.cost), 0);

                setDailyTotal(total.toFixed(2));
            } catch (error) {
                console.error('Erro ao obter os dados:', error);
            }
        };

        fetchDailyTotal();
    }, []);

    const getDay = new Date().getDate();
    const getMonth = new Date().getMonth();
    const monthName = {
        0: 'Janeiro',
        1: 'Fevereiro',
        2: 'Março',
        3: 'Abril',
        4: 'Maio',
        5: 'Junho',
        6: 'Julho',
        7: 'Agosto',
        8: 'Setembro',
        9: 'Outubro',
        10: 'Novembro',
        11: 'Dezembro',
    }[getMonth];
    const getYear = new Date().getFullYear();

    return (
        <>
            <Title>Saldo do dia</Title>
            <Typography component="p" variant="h4">
                R$ {dailyTotal}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {getDay} de {monthName} de {getYear}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Ver extrato
                </Link>
            </div>
        </>
    );
}
