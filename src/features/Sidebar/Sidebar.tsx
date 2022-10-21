import { Navigation } from '../../common/components/navigation/Navigation'
import { Paper } from '@mui/material';
import './sidebar.scss'
export const Sidebar = () => {
    return (
        <Paper elevation={3} className='sidebar' component={'nav'}>
            <Navigation />
        </Paper>

    )
}
