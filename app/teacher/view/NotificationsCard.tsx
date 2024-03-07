import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  List,
} from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';

// 示例数据类型
interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
}

// 组件属性类型
interface NotificationsCardProps {
  notifications: Notification[];
}

// 最新通知组件
const NotificationsCard = ({ notifications }: NotificationsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          最新通知
          <AnnouncementIcon sx={{ ml: 1 }} />
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {notifications.map(notification => (
            <React.Fragment key={notification.id}>
              <ListItem>
                <ListItemText
                  primary={notification.title}
                  secondary={notification.description}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;