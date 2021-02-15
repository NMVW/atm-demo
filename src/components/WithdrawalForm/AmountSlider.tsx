import React from 'react';
import currency from 'currency.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import AtmIcon from '@material-ui/icons/LocalAtm';
import Tooltip from '@material-ui/core/Tooltip';

import { MAX_WITHDRAWAL_AMOUNT, WITHDRAWAL_INCREMENT_AMOUNT } from '../../constants';

const useStyles = makeStyles({
  root: {
    padding: '1rem',
    width: 500,
  },
  input: {
    width: 100,
    textAlign: 'center',
  },
});

export default function AmountSlider(props: { amount: number, setAmount: (amount: number) => void }) {
  
  const classes = useStyles();

  const onSliderUpdate = (event: any, newAmount: number | number[]) => props.setAmount(+newAmount);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <IconButton onClick={() => props.setAmount(0)}>
            <AtmIcon color={props.amount > 0 ? 'primary' : 'action'} />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Slider
            value={props.amount}
            aria-labelledby="discrete-slider"
            step={WITHDRAWAL_INCREMENT_AMOUNT}
            marks
            min={0}
            max={MAX_WITHDRAWAL_AMOUNT}
            onChange={onSliderUpdate}
          />
        </Grid>
        <Grid item className="AmountValue">
          <Tooltip title={`Limited to ${currency(WITHDRAWAL_INCREMENT_AMOUNT).format()} increments. Daily max withdrawal ${currency(MAX_WITHDRAWAL_AMOUNT).format()}`} arrow>
            <span className="DisplayValue">
              { currency(props.amount).format() }
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}
