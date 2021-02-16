import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import VideoRecordingIcon from '@material-ui/icons/PersonalVideo';

export default function AppMenu({ anchor, close }: { anchor: any, close: () => void }) {
  return (
    <Menu
      variant="menu"
      className={"AppMenu"}
      anchorEl={anchor}
      open={Boolean(anchor)}
      onClose={close}
    >
      <MenuItem onClick={() => window.open(process.env.REACT_APP_PROJECT_REPO_URL, '_blank', 'noopener,noreferrer')}>
        <ListItemIcon>
          <Avatar src={'https://github.githubassets.com/favicons/favicon.png'}>G</Avatar>
        </ListItemIcon>
        <Typography variant="inherit">Repo</Typography>
      </MenuItem>
      <MenuItem onClick={() => window.open(process.env.REACT_APP_E2E_VIDEO_URL, '_blank', 'noopener,noreferrer')}>
        <ListItemIcon>
          <VideoRecordingIcon fontSize="large" />
        </ListItemIcon>
        <Typography variant="inherit">E2E Test Run</Typography>
      </MenuItem>
    </Menu>
  );
}
