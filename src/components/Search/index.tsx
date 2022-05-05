import React, { useState } from 'react';

import { styled } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Search(props: { input: string, isLoading: boolean, update: (text: string) => void }) {
  // const [open, setOpen] = React.useState(true);

  // const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
  //   setOpen(false);
  //   props.reset && props.reset();
  // };

  const [ input, setInput ] = useState(props.input);
  console.log('local input', input);
  return (
    <SearchBar>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {
        props.isLoading ? <Skeleton variant="text" height={40} /> : (
          <StyledInputBase
            style={{ paddingLeft: '3rem', borderRadius: '10rem', border: 'solid' }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            type="string"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )
      }
    </SearchBar>
  );
}

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 10,
  backgroundColor: 'white',
  borderColor: 'black',
  // '&:hover': {
  //   backgroundColor: 'light-grey',
  // },
  marginRight: '1rem',
  marginLeft: 0,
  width: '20rem',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: '1rem',
  // height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '1rem',
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
