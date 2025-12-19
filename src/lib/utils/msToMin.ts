export const msToMin = (ms: number) => {
  const totalSeconds = Math.round(ms / 1000) // 반올림하여 초 단위 생성
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return { minutes, seconds }
}
