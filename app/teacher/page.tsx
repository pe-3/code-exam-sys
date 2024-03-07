import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  LinearProgress,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import QuizIcon from '@mui/icons-material/Quiz';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InboxIcon from '@mui/icons-material/Inbox';
import NotificationsCard from './view/NotificationsCard'

// 面板组件 - 最近活动
const RecentActivityCard = () => {
  const activities = [
    {
      id: 1,
      content: '批改了《计算机科学导论》第一次作业。',
      timestamp: '2小时前'
    },
    {
      id: 2,
      content: '发布了《数据库系统》新的课件。',
      timestamp: '1天前'
    },
    {
      id: 3,
      content: '更新了考试安排时间。',
      timestamp: '3天前'
    }
  ];

  return (
    <Card sx={{ minHeight: 200 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          最近活动
        </Typography>
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText primary={activity.content} secondary={activity.timestamp} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// 面板组件 - 快速访问
const QuickAccessCard = () => {
  const links = [
    { name: '作业审批', icon: <AssignmentTurnedInIcon />, destination: '/homework/approval' },
    { name: '课程计划', icon: <CalendarTodayIcon />, destination: '/course/planning' },
    { name: '消息中心', icon: <InboxIcon />, destination: '/messages' },
  ];

  return (
    <Card sx={{ minHeight: 150 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          快速访问
        </Typography>
        <List>
          {links.map((link, index) => (
            <ListItem button key={index} component="a" href={link.destination}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// 面板组件 - 在线资源
const OnlineResourcesCard = () => {
  // 假设这是一个更复杂的组件，展示一些可点击的资源链接等
  return (
    <Card sx={{ minHeight: 150 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          在线资源
        </Typography>
        {/* 资源列表、链接或其他内容 */}
      </CardContent>
    </Card>
  );
};

const TeacherDashboard = () => {
  // 示例数据，实际开发时应从API获取
  const coursesData = [
    { name: '算法与数据结构', progress: 70 },
    { name: '计算机网络', progress: 50 },
    { name: '操作系统', progress: 85 },
  ];

  const tasksData = [
    '检查第三章作业',
    '制定下周考试题目',
    '回复学生邮箱关于课程问题',
  ];

  const notificationsData = [
    { id: 1, title: '系统更新', description: '在线考试系统将于今晚22:00进行维护', time: '1小时前' },
    { id: 2, title: '新学生加入', description: '你的课程《算法与数据结构》有新学生加入', time: '3小时前' },
    // ...更多通知
  ];

  return (
    <Box sx={{ flexGrow: 1, m: 3 }}>
      <Grid container spacing={3}>
        {/* 欢迎信息及快速操作 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              欢迎回来，老师
            </Typography>
            <Button variant="outlined" sx={{ mr: 1 }}>
              创建新课程
            </Button>
            <Button variant="outlined" color="primary">
              发布新考试
            </Button>
          </Paper>
        </Grid>
        
        {/* 课程进度 */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                课程进度
                <SchoolIcon sx={{ ml: 1 }} />
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {coursesData.map((course, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={course.name} />
                    <LinearProgress variant="determinate" value={course.progress} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 待处理任务 */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                待处理任务
                <PendingActionsIcon sx={{ ml: 1 }} />
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {tasksData.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <QuizIcon />
                    </ListItemIcon>
                    <ListItemText primary={task} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* 最新通知 */}
        <Grid item xs={12} md={6} lg={4}>
          <NotificationsCard notifications={notificationsData} />
        </Grid>
      
        {/* 最近活动面板 */}
        <Grid item xs={12} md={6}>
          <RecentActivityCard />
        </Grid>

        {/* 快速访问面板 */}
        <Grid item xs={12} md={6}>
          <QuickAccessCard />
        </Grid>

        {/* 在线资源面板 */}
        <Grid item xs={12}>
          <OnlineResourcesCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;