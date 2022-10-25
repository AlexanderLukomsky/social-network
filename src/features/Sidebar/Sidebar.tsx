import { Paper } from '@mui/material';

import { Navigation } from '../../common/components/navigation/Navigation';
import './sidebar.scss';

export const Sidebar = () => (
  <Paper elevation={3} className="sidebar" component="nav">
    <Navigation />
  </Paper>
);
