import { TimerSettings, useTimer } from "react-timer-hook"

interface TimerProps extends TimerSettings {}
export function Timer({ expiryTimestamp, onExpire, autoStart }: TimerProps) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire,
    autoStart
  })

  return (
    <div className={"flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 !pb-0 min-w-[250px]"}>
      <div
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black grid grid-cols-5 ${days > 0 ? "grid-cols-7" : ""} gap-0 text-center w-full ${days === 0 && hours === 0 && minutes <= 5 && seconds === 0 ? "text-orange-500" : ""} ${days === 0 && hours === 0 && minutes <= 1 && seconds === 0 ? "text-red-500" : ""}`}>
        {days > 0 && (
          <>
            <span>
              {`${days < 10 ? "0" : ""}`}
              {days}
            </span>
            <span>:</span>
          </>
        )}
        <span>
          {`${hours < 10 ? "0" : ""}`}
          {hours}
        </span>
        <span>:</span>
        <span>
          {`${minutes < 10 ? "0" : ""}`}
          {minutes}
        </span>
        <span>:</span>
        <span>
          {`${seconds < 10 ? "0" : ""}`}
          {seconds}
        </span>
      </div>
      <div className={`grid grid-cols-5 ${days > 0 ? "grid-cols-7" : ""} gap-0 text-center w-full`}>
        {days > 0 && (
          <>
            <span>días</span>
            <span>:</span>
          </>
        )}
        <span>horas</span>
        <span>:</span>
        <span>min</span>
        <span>:</span>
        <span>seg</span>
      </div>
    </div>
  )
}
