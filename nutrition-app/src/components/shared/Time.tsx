import { FC } from "react";
import { Time } from "../../common/types";

type TimeProps = {
  time: Time;
  handleChangeTime: (time: Time) => void;
};

const TimeInput: FC<TimeProps> = ({ time, handleChangeTime }) => {
  return (
    <div className="flex flex-row space-x-2">
      <div className="flex flex-col">
        <label htmlFor="time" className="text-sm font-semibold mb-1">
          Time
        </label>
        <div className="flex flex-row">
          <input
            type="number"
            id="time"
            name="hours"
            value={time.hours}
            onChange={(e) =>
              handleChangeTime({ ...time, hours: parseInt(e.target.value) })
            }
            className="w-10 h-10"
            placeholder="00"
          />
          <span className="text-sm">:</span>
          <input
            type="text"
            id="time"
            value={time.minutes}
            onChange={(e) =>
              handleChangeTime({ ...time, minutes: parseInt(e.target.value) })
            }
            className="w-10 h-10"
            placeholder="00"
          />
          <span className="text-sm">:</span>
          <input
            type="text"
            id="time"
            value={time.seconds}
            onChange={(e) =>
              handleChangeTime({ ...time, seconds: parseInt(e.target.value) })
            }
            className="w-10 h-10"
            placeholder="00"
          />
        </div>
      </div>
    </div>
  );
};
export default TimeInput;
