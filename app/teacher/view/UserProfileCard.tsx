import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for user card
const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  // backgroundColor: theme.palette.background.paper,
  // color: theme.palette.text.primary,
}));

const UserName = styled(Typography)({
  marginLeft: 8,
  fontWeight: 'bold'
});

const UserEmail = styled(Typography)({
  marginLeft: 8,
  fontSize: '0.875rem',
  color: 'rgba(0, 0, 0, 0.54)'
});

interface Props {
  avatarSrc?: string;
  name: string;
  email: string;
}

// User profile card component
const UserProfileCard = ({ avatarSrc, name, email } : Props) => {
  return (
    <UserBox>
      <Avatar src={avatarSrc} alt={name} />
      <Box sx={{ ml: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {name && <UserName noWrap>{name}</UserName>}
        {email && <UserEmail noWrap>{email}</UserEmail>}
      </Box>
    </UserBox>
  );
};

export default UserProfileCard;