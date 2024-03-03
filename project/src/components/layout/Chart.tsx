import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import Title from './Title';
import axios from 'axios';

function createData(
    time: string,
    amount?: number,
): { time: string; amount: number | null } {
    return { time, amount: amount ?? null };
}

export default function Chart() {
    const theme = useTheme();
    const [chartData, setChartData] = React.useState<{ time: string; amount: number | null }[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/orders');
                const orders = response.data;
                const dynamicData = orders.map((order: any, index: number) => {
                    const time = order.hour.split(':')[0];
                    const amount = parseFloat(order.cost); // Convertendo para número
                    return createData(time, amount);
                });

                dynamicData.sort((a, b) => {
                    const timeA = parseInt(a.time);
                    const timeB = parseInt(b.time);
                    return timeA - timeB;
                });

                setChartData(dynamicData);
            } catch (error) {
                console.error('Erro ao obter os dados:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <Title>Hoje</Title>
            <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                <LineChart
                    dataset={chartData}
                    margin={{
                        top: 16,
                        right: 20,
                        left: 70,
                        bottom: 30,
                    }}
                    xAxis={[
                        {
                            scaleType: 'point',
                            dataKey: 'time',
                            tickNumber: 2,
                            tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Vendas (R$)',
                            labelStyle: {
                                ...(theme.typography.body1 as ChartsTextStyle),
                                fill: theme.palette.text.primary,
                            },
                            tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
                            max: 2500,
                            tickNumber: 3,
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'amount',
                            showMark: false,
                            color: theme.palette.primary.light,
                        },
                    ]}
                    sx={{
                        [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                        [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                        [`& .${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translateX(-25px)',
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}
