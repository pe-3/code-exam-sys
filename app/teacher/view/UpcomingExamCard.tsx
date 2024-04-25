import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Stack,
  Chip
} from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SchoolIcon from '@mui/icons-material/School';

const UpcomingExamCard = () => {
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, p: 1 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <SchoolIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" gutterBottom>
            即将开始的考试
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          高等数学 - 第一章节测试
        </Typography>
        <Typography variant="body2">
          考试时间：2024年02月25日 10:00 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
          <AlarmOnIcon color="warning" sx={{ fontSize: 30, mr: 1 }} />
          <Typography variant="body1" color="warning.dark">
            考试将在 15 分钟后开始
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          variant="contained"
          color="success"
          fullWidth
          sx={{ 
            color: 'white', // 强制设置文本颜色为白色
            '&:hover': {
              // 可以调整悬浮时的样式
              bgcolor: 'success.dark', // 悬浮时背景颜色变暗
              color: 'white'  // 悬浮时文本颜色保持不变
            }
          }}
        >
          立即加入考试
        </Button>
      </CardActions>
    </Card>
  );
};

export default UpcomingExamCard;