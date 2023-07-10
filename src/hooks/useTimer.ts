import { useCallback, useState } from 'react'

interface UseTimer {
  /**
   * タイマーが稼働しているか
   */
  isRunning: boolean
  /**
   * タイマーを開始する
   * @param callback タイマーが実行する処理
   * @returns
   */
  start: (callback?: () => void) => void
  /**
   * タイマーを停止する
   */
  stop: () => void
}
/**
 * @description 一定間隔ごとに処理を実行する
 * @param period 間隔。デフォルトは1000ms
 */
export const useTimer = (period = 1000): UseTimer => {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null)

  const handleStart: UseTimer['start'] = useCallback(
    (callback) => {
      const timer = setInterval(() => {
        callback?.()
      }, period)
      setTimer(timer)
    },
    [period]
  )

  const handleStop: UseTimer['stop'] = useCallback(() => {
    if (timer) {
      clearInterval(timer)
      setTimer(null)
    }
  }, [timer])

  return {
    isRunning: !!timer,
    start: handleStart,
    stop: handleStop
  }
}
