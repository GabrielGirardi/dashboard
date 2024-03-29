import * as React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from '../layout/Chart';
import Deposits from '../layout/Deposits';
import RecentOrders from '../layout/RecentOrders';
import Copyright from '../ui/Copyright';

const HomePage: React.FC = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                {/* Chart */}

                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}
                        >
                            <Chart />
                        </Paper>
                    </Grid>

                    {/* Recent Deposits */}

                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            height: 240,
                        }}
                        >
                        <Deposits />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <RecentOrders />
                        </Paper>
                    </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} name="Lorem Ipsum" />
        </Container>
    );
};

export default HomePage;