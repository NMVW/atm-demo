import React, { useEffect, useState, useRef, Ref } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Txn, State } from '../../interfaces';
import { removeTxn } from '../../services/redux';

import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

// timeWindow in ms
export default function UndoTxnBtn({ close, timeWindow, setToast }: { close: () => void, timeWindow: number, setToast: (toast: string) => void }) {
  const dispatch = useDispatch();

  const [ progress, setProgress ] = useState(0);
  const previousTime: any = useRef(performance.now()); // ms
  const animationRequest: any = useRef(null);

  const lastTxn: Txn = useSelector((state: State) => state.txns.list[state.txns.list.length - 1]);
  const undoTxn = () => {
    dispatch(removeTxn(lastTxn.id));
    close();
    setToast('Aborted transaction.');
  };

  const animate = (time: number) => {
    const timeFractionDelta = (time - previousTime.current) / timeWindow;

    // update progress value
    setProgress((prevProgress: number) => {
      const nextProgress = prevProgress + timeFractionDelta * 100;

      if (nextProgress > 100) {
        cancelAnimationFrame(animationRequest.current);
        close();
        setToast('Transaction complete.');
        return nextProgress;
      }
      return nextProgress;
    });

    previousTime.current = time;
    animationRequest.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    animationRequest.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRequest.current);
  }, []);

  return (
    <>
      <Button className="UndoBtn" variant="outlined" onClick={undoTxn}>
        Undo
        <LinearProgress value={progress} variant="determinate" style={{ width: '73px', height: '34px', position: 'absolute', opacity: .7 }} />
      </Button>
    </>
  );
}