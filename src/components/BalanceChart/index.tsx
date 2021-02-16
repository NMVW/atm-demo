import { State } from '../../interfaces';

import { useSelector } from 'react-redux';
import React, { ReactNode, ReactNodeArray } from 'react';
import currency from 'currency.js';

interface ChartProps {
  children: ReactNode | ReactNodeArray
  height: number | string
  width: number | string
}

const Chart = ({ children, height, width }: ChartProps) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    height={height}
    width={width}
  >
    {children}
  </svg>
);

interface RectProps {
  fill?: string
  x: number | string
  y: number | string
  width: number | string
  height: number | string
}

const Bar = (props: RectProps) => <rect {...props} />;

export default function BalanceChart({ nextAmount }: { nextAmount: number }) {

  const { original, current }: { original: number, current: number } = useSelector((state: State) => state.accountBalance);

  const height = '30%';
  const width = '100%';

  const originalBar = (
    <g>
      <Bar
        fill="teal"
        fill-opacity="0.5"
        x={0}
        y={height}
        width={width}
        height={height}
      />
      <text fill="white" x={`80%`} y={'55%'}>{currency(original).format()}</text>
    </g>
  );

  const currentRatio = current / original;
  const currentBar = (
    <g>
      <rect
        fill="teal"
        x={0}
        y={height}
        width={`${(currentRatio * 100).toFixed(2)}%`}
        height={height}
      >
        <animate attributeName="width" values={`100%;${currentRatio}`} dur="2s" />
      </rect>
      <text fill="white" x={`${(currentRatio * 100 - 7).toFixed(2)}%`} y={'55%'}>{`${(currentRatio * 100).toFixed(0)} %`}</text>
    </g>
  );

  const scenarioRatio = (nextAmount > 0) && (current - nextAmount) >= 0 ? nextAmount / original: 0;
  const scenarioBar = (
    <Bar
      fill="red"
      fill-opacity="0.7"
      x={`${((currentRatio - scenarioRatio) * 100).toFixed(2)}%`}
      y={height}
      width={`${(scenarioRatio * 100).toFixed(2)}%`}
      height={height}
    />
  );

  return (
    <Chart
      height={50}
      width={'100%'}
    >
      {originalBar}
      {currentBar}
      {scenarioBar}
    </Chart>
  );
}