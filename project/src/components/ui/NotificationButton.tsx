import React, { useState } from 'react';
import { IconButton, Badge, Popover, Typography, Divider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const notifications = [
    {
        id: 1,
        message: '⏰ Lembrete! Sua assinatura está prestes a expirar em breve. Renove agora para continuar desfrutando de todos os nossos serviços e recursos.'
    },
    {
        id: 2,
        message: '🎉 Última chance! Oferta especial! 20% de desconto em todos os produtos hoje! Corra e compre agora! 💰🛒 #promoção #desconto'
    },
    {
        id: 3,
        message: '🚀 Novo estoque chegou! Os produtos mais recentes e incríveis já estão disponíveis! Atualize seu guarda-roupa hoje e esteja na moda! 👗👠 #moda #tendência'
    },
    {
        id: 4,
        message: '📦 Atualização de Entrega! Seu pedido está a caminho e programado para entrega hoje entre 14h e 18h. Certifique-se de estar em casa para receber seu pacote.'
    },
    {
        id: 5,
        message: '🎁 Presente especial! Compre 2 e leve 3! Aproveite esta oferta especial em todos os produtos selecionados! 🛍️🎁 #promoção #desconto'
    }
]

const NotificationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };    

    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popover' : undefined;

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                  PaperProps={{
                    sx: { width: 400, height: '60%' },
                }}
            >
                <Typography 
                    variant="h6" 
                    gutterBottom  
                    sx={{ p: 2, textAlign: 'center', backgroundColor: 'lightgray' }}
                >
                     Notificações
                </Typography>
                {notifications.map((notification) => (
                    <div style={{ padding: 2 }}>
                        <Typography sx={{ p: 2 }} key={notification.id}>
                                {notification.message}       
                        </Typography>
                        <Divider />
                    </div>
                ))}
            </Popover>
        </>
    );
};

export default NotificationButton;
