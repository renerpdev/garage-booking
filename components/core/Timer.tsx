import { TimerSettings, useTimer } from "react-timer-hook"

interface TimerProps extends TimerSettings {}
export function Timer({ expiryTimestamp, onExpire, autoStart }: TimerProps) {
  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart
  })

  return (
    <div className={"flex flex-col justify-center items-center p-6 pb-0 antialiased  w-[250px]"}>
      <p
        className={`text-5xl font-black grid grid-cols-3 gap-0 text-center w-full ${minutes === 0 && seconds < 30 ? "text-orange-500" : ""} ${minutes === 0 && seconds < 5 ? "text-red-500" : ""}`}>
        <span>
          {`${minutes < 10 ? "0" : ""}`}
          {minutes}
        </span>
        <span>:</span>
        <span>
          {`${seconds < 10 ? "0" : ""}`}
          {seconds}
        </span>
      </p>
      <p className={" grid grid-cols-3 gap-0 text-center w-full"}>
        <span>min</span>
        <span>:</span>
        <span>seg</span>
      </p>
    </div>
  )
}
