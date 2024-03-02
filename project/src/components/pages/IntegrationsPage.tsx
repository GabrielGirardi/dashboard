import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, Skeleton } from '@mui/material';
import Divider from '@mui/material/Divider';

const integrationsData = [
    {
        name: 'Facebook Ads',
        description: 'Integração com o Facebook Ads para rastreamento de campanhas e conversões.',
        image: 'https://wallpapercave.com/wp/wp12012082.jpg'
    },
    {
        name: 'Google Tag Manager',
        description: 'Integração com o Google Tag Manager para gerenciamento de tags e eventos.',
        image: 'https://wallpapercave.com/wp/wp13306477.jpg'
    },
    {
        name: 'Twitter Ads',
        description: 'Integração com o Twitter Ads para rastreamento de campanhas e conversões.',
        image: 'https://wallpapercave.com/wp/wp4056075.jpg'
    },
    {
        name: 'LinkedIn Ads',
        description: 'Integração com o LinkedIn Ads para rastreamento de campanhas e conversões.',
        image: 'https://wallpapercave.com/wp/wp12216877.png'
    },
    {
        name: 'Instagram Ads',
        description: 'Integração com o Instagram Ads para rastreamento de campanhas e conversões.',
        image: 'https://wallpapercave.com/wp/wp4667551.jpg'
    },
    {
        name: 'Google Analytics',
        description: 'Integração com o Google Analytics para análise de tráfego e comportamento do usuário.',
        image: 'https://wallpapercave.com/wp/wp8548518.jpg'
    },
    {
        name: 'MailChimp',
        description: 'Integração com o MailChimp para automação de e-mail marketing.',
        image: 'https://wallpapercave.com/wp/wp11854851.png'
    },
    {
        name: 'Zendesk',
        description: 'Integração com o Zendesk para suporte ao cliente e gestão de tickets.',
        image: 'https://wallpapercave.com/wp/wp5122369.jpg'
    },
    {
        name: 'Salesforce',
        description: 'Integração com o Salesforce para gestão de relacionamento com o cliente (CRM).',
        image: 'https://wallpapercave.com/wp/wp6680199.jpg'
    },
];

const IntegrationsPage: React.FC = () => {
    const [imageLoading, setImageLoading] = useState<boolean>(true);

    window.addEventListener('load', function() {
        setImageLoading(false);
    });

    

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, backgroundColor: 'white', py: 2, boxShadow: 1, borderRadius: 1 }} style={{ height: '100%', width: '100%' }}>
            <Typography variant="h4" gutterBottom>
                Integrações do Sistema
            </Typography>
            <Divider sx={{ mb: 3 }}/>
            <Grid container spacing={3}>
                {integrationsData.map((integration, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Card sx={[{ transition: 'all 0.3s', '&:hover': { cursor: 'pointer', transform: 'scale(1.02)'}}]}>
                            {imageLoading ? (
                                <Skeleton variant="rectangular" width="100%" height={140} />
                            ) : (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={integration.image}
                                    alt={integration.name}
                                    sx={{ objectFit: 'cover' }}
                                    onLoad={() => setImageLoading(false)}
                                />
                            )}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {integration.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden'}} style={{ height: 36 }}>
                                    {integration.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default IntegrationsPage;
