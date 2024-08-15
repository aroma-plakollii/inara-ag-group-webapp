import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import {userType} from "../../api/authService";

export const items = [
    {
        name: 'home',
        title: 'Kërko',
        path: '/home',
        icon: (<SearchIcon />)
    },
    {
        name: 'clients',
        title: 'Klientët',
        path: '/clients',
        icon: (<GroupIcon />)
    },
    {
        name: 'bookings',
        title: 'Rezervimet',
        path: '/bookings',
        icon: (<AirplaneTicketIcon />)
    },
    // {
    //     name: 'passengers',
    //     title: 'Pasagjerët',
    //     path: '/passengers',
    //     icon: (<AirlineSeatReclineExtraIcon />)
    // },
];


if (userType === 'SUPERADMIN') {
    items.push(
        {
            name: 'users',
            title: 'Përdoruesit',
            path: '/users',
            icon: (<PersonIcon />)
        },
    );
}