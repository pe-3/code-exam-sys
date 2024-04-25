import React from 'react';
import { Card, Box, TextField, Button, Divider, List, ListItem, ListItemText, Grid, Typography } from '@mui/material';
import QuestionList from './QuestionList';
import AssignmentIcon from '@mui/icons-material/Assignment';

// 常考题目搜索列表Card组件示例
const PopularQuestionsCard = () => {
  return (
    <Card variant="outlined" sx={{ p: 3 }}>
      <Grid container alignItems="center" justifyContent="flex-start" spacing={1} sx={{ mb: 2 }}>
        <Grid item>
          <AssignmentIcon color='primary' sx={{ fontSize: 30 }} /> {/* 这里是左侧的图标 */}
        </Grid>
        <Grid item xs>
          <Typography variant="h6" component="h2" sx={{ display: 'inline' }}>
            常考题目
          </Typography>
        </Grid>
      </Grid>
      {/* 搜索栏部分 */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          fullWidth
          label="搜索题目"
          variant="outlined"
          size="small"
          sx={{ mr: 1, backgroundColor: 'background.paper' }} // 添加背景色来突出搜索框
        />
        <Button sx={{ py: '10px', boxShadow: 'none' }}>
          搜索
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} /> {/* 添加分割线增强视觉区分 */}
      {/* 常考题目列表部分 */}
      <QuestionList/>
    </Card>
  );
};

export default PopularQuestionsCard;