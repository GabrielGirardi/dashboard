import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
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
    

    return (
        <React.Fragment>
            <Title>Saldo  do dia</Title>
            <Typography component="p" variant="h4">
                R$ 3.024,00
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {getDay} de {monthName} de 2021
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Ver extrato
                </Link>
            </div>
        </React.Fragment>
    );
}