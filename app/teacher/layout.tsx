// components/StudentLayout.tsx
'use client';
import { Container, Box, Drawer, useTheme } from '@mui/material';
import StudentSidebar from '../layout/StudentSidebar';
import React from 'react';
import TopBar from '../layout/TopBar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  
  return (
    <>
    <Box sx={{ bgcolor: 'background.default' }}>
      <TopBar
        role='teacher'
        onMenuClick={() => {}}
        onThemeChange={() => {}}
        isDarkMode={false}
      />
      <Box sx={{ display: 'flex' }}>
        <StudentSidebar role='teacher'/>
        <Container component="main" 
          sx={{
            flexGrow: 1,
            p: theme.spacing(3), // 使用来自主题的间距
            height: '100vh',
            overflow: 'auto', // 如果内容过多，出现滚动条
          }}>
          {children}
        </Container>
      </Box>
    </Box>
    </>
  );
}