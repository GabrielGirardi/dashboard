import React from 'react';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';

export default function ActionsBar(props: { firstButtonName: string; secondButtonName?: string; hideButton?: number; actionButton?: string; }) {
    const firstButtonName = props.firstButtonName;
    const secondButtonName = props.secondButtonName;
    const hideButton = props.hideButton;

    return (
        <Container style={{ height: 'fit-content', width: '100%' }} maxWidth="xl" sx={{ mt: 4, mb: 4, display: 'flex', gap: 1 }}>
            <Button 
                variant="contained" 
                color="primary" 
                href={props.actionButton}
                sx={{ mr: 1, display: hideButton == 1 ? 'none' : '' }}
            >
                { firstButtonName }
            </Button>
            
            <Button 
                variant="contained" 
                color="primary"
                sx={{ display: hideButton == 2 ? 'none' : '' }}
            >
                { secondButtonName }
            </Button>
        </Container>
    );
}