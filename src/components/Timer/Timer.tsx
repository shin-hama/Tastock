import { useState, type FC, useCallback } from 'react'

import Stack from '@mui/material/Stack'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useTimer } from '~/hooks/useTimer'

dayjs.extend(duration)

type Props = {
  onStarted: () => void
  onStopped: () => void
}
const Timer: FC<Props> = () => {
  const [elapsed, setElapsed] = useState(0)
  const { isRunning, start, stop } = useTimer(1000)

  const handleStart = () => {
    start(() => {
      setElapsed((prev) => prev + 1)
    })
  }

  const handleStop = useCallback(() => {
    stop()
  }, [stop])

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <TextField />
      <Typography>
        {dayjs.duration(elapsed, 'seconds').format('HH:mm:ss')}
      </Typography>
      {isRunning ? (
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
