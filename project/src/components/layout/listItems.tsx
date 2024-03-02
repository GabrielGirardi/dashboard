import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
    <React.Fragment>
        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]} href="/">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]} href="/vendas">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Vendas" />
        </ListItemButton>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]} href="/clientes">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
        </ListItemButton>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]} href="/pedidos">
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
        </ListItemButton>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]}>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrações" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Relatórios Salvos
        </ListSubheader>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Mensal" />
        </ListItemButton>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Semestral" />
        </ListItemButton>

        <ListItemButton sx={[{ '&:hover': {backgroundColor: 'lightGray'} }]}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Anual" />
        </ListItemButton>
    </React.Fragment>
);