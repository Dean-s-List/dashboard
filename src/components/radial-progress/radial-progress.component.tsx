import { FC } from "react";

type ProgressType = {
  progress: number;
  trackColor: string;
  indicatorColor: string;
  indicatorCap: string;
  labelColor: string;
  spinnerMode: boolean;
  spinnerSpeed: number;
};

interface ProgressProps {
  props: ProgressType;
}

export const RadialProgress = (props: ProgressType) => {
  const {
    progress,
    trackColor,
    indicatorColor,
    labelColor = `#333`,
    spinnerMode = false,
    spinnerSpeed = 1,
  } = props;

  const size = 50;
  const trackWidth = 5;
  const indicatorWidth = 5;

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  //   const hideLabel = size < 100 || !label.length || spinnerMode ? true : false;

  return (
    <div className="ml-[5%] flex">
      <div className="svg-pi-wrapper" style={{ width: size, height: size }}>
        <svg className="svg-pi" style={{ width: size, height: size }}>
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator ${
              spinnerMode ? "svg-pi-indicator--spinner" : ""
            }`}
            style={{ animationDuration: `${spinnerSpeed * 1000}` }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>

        {
          <div
            className="svg-pi-label"
            style={{ color: "#fff", fontSize: "0.5rem" }}
          >
            {/* <span className="svg-pi-label__loading">{label}</span> */}

            {!spinnerMode && (
              <span className="svg-pi-label__progress">
                {`${progress > 100 ? 100 : progress}%`}
              </span>
            )}
          </div>
        }
      </div>
    </div>
  );
};
