import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';
import { ITab } from './NewPostForm';

type TabItemProps = {
  tab: ITab;
  selectedTab: string;
  setSelectedTab: (tabTitle: string) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  tab,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <Box
      display="flex"
      flexGrow="1"
      p="15px 10px"
      borderRight="1px solid #f1ecec"
      borderTop="none"
      borderBottom={selectedTab === tab.title ? '3px solid #2196F3' : ''}
      onClick={() => setSelectedTab(tab.title)}
    >
      <SvgIcon
        color={selectedTab === tab.title ? 'secondary' : undefined}
        sx={{ mr: '10px', height: '25px', width: '25px' }}
      >
        {tab.icon}
      </SvgIcon>
      <Typography
        fontSize="16px"
        fontWeight="600"
        color={selectedTab === tab.title ? 'secondary' : '#9e9e9e'}
      >
        {tab.title}
      </Typography>
    </Box>
  );
};
export default TabItem;
