import React from 'react';
import { Link, CardMedia, Container, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage: React.FC = () => {
    return (
        <Container style={{ height: '80%', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardMedia 
                component="img"
                height="400" 
                image="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif"
                alt="404 - Página não encontrada"
                sx={{ objectFit: 'contain' }}
            />
            <Typography variant="h2" gutterBottom>Página não encontrada</Typography>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <Link href="/" sx={[{ display: 'flex', transition: 'all 0.3s', fontWeight: 'bold', '&:hover': {transform: 'scale(1.02)'} }]} underline="none">
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }}/>
                Voltar para a Página Inicial
            </Link>
        </Container>
    )
}

export default NotFoundPage;