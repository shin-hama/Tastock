import { useState, type FC } from 'react'

import Stack from '@mui/material/Stack'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const Timer: FC = () => {
  const [elapsed, setElapsed] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null)

  const handleStart = () => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)
    setTimer(timer)
  }

  const handleStop = () => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
      setElapsed(0)
    }
  }

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <TextField />
      <Typography>
        {dayjs.duration(elapsed, 'seconds').format('HH:mm:ss')}
      </Typography>
      {timer ? (
        <IconButton onClick={handleStop}>
          <StopCircleIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleStart}>
          <PlayCircleIcon />
        </IconButton>
      )}
    </Stack>
  )
}

export default Timer
