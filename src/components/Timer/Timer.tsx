import { useState, type FC, useCallback, useEffect } from 'react'

import Stack from '@mui/material/Stack'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import { useTimer } from '~/hooks/useTimer'

dayjs.extend(duration)
dayjs.extend(timezone)

type Props = {
  startTime?: Date
  onStarted: () => void
  onStopped: () => void
}
const Timer: FC<Props> = ({ startTime, onStarted, onStopped }) => {
  const [elapsed, setElapsed] = useState(0)
  const { isRunning, start, stop } = useTimer(1000)

  const handleStart = useCallback(() => {
    start(() => {
      setElapsed((prev) => prev + 1)
    })
    onStarted()
  }, [onStarted, start])

  const handleStop = useCallback(() => {
    stop()
    setElapsed(0)
    onStopped()
  }, [onStopped, stop])

  useEffect(() => {
    // startTime があり、タイマーが起動していないときはタイマーを起動する
    // 別プロセスでタイマーを起動した後に、Timer コンポーネントが呼ばれたときのため
    // 別プロセスで起動しているため、Callback が呼ばれない
    if (startTime && isRunning === false) {
      start(() => {
        setElapsed((prev) => prev + 1)
      })
    }
  }, [isRunning, start, startTime])

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <TextField />
      <Typography key={elapsed}>
        {startTime
          ? dayjs
              .duration(
                dayjs().diff(dayjs(startTime).tz(dayjs.tz.guess())),
                'seconds'
              )
              .format('HH:mm:ss')
          : '00:00:00'}
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
