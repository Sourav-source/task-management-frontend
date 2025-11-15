import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert,
  Edit,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../context/AuthContext';
import { TASK_STATUS } from '../../utils/constants';

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(task._id);
    handleMenuClose();
  };

  const handleToggleStatus = () => {
    const newStatus =
      task.status === TASK_STATUS.COMPLETED
        ? TASK_STATUS.PENDING
        : TASK_STATUS.COMPLETED;
    onToggleStatus(task._id, newStatus);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <IconButton
              size="small"
              onClick={handleToggleStatus}
              color={
                task.status === TASK_STATUS.COMPLETED ? 'success' : 'default'
              }
            >
              {task.status === TASK_STATUS.COMPLETED ? (
                <CheckCircle />
              ) : (
                <RadioButtonUnchecked />
              )}
            </IconButton>
            <Chip
              label={task.status}
              size="small"
              color={
                task.status === TASK_STATUS.COMPLETED ? 'success' : 'warning'
              }
            />
          </Box>

          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>
              <Edit fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            {isAdmin() && (
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Delete fontSize="small" sx={{ mr: 1 }} />
                Delete
              </MenuItem>
            )}
          </Menu>
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            textDecoration:
              task.status === TASK_STATUS.COMPLETED ? 'line-through' : 'none',
            opacity: task.status === TASK_STATUS.COMPLETED ? 0.7 : 1,
          }}
        >
          {task.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {task.description}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Created: {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;