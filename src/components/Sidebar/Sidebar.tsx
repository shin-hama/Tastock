import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TimerIcon from '@mui/icons-material/Timer'
// import SummarizeIcon from '@mui/icons-material/Summarize'
import Stack from '@mui/material/Stack'
import Login from '../Login'

const drawerWidth = 240

type SidebarItem = {
  label: string
  icon: React.ReactNode
}
const items: Array<SidebarItem> = [
  {
    label: 'Timer',
    icon: <TimerIcon />
  }
  // {
  //   label: 'Report',
  //   icon: <SummarizeIcon />
  // }
]

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        height: '100%',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
      variant='permanent'
      anchor='left'
    >
      <Stack
        direction={'column'}
        height='100%'
        justifyContent={'space-between'}
      >
        <List>
          {items.map(({ label, icon }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack>
          <Login />
        </Stack>
      </Stack>
    </Drawer>
  )
}

export default Sidebar
