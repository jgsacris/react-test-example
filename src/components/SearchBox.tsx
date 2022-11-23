import { TextField } from '@mui/material';
import { ChangeEvent, FC } from 'react';

interface SearchBoxParams {
  term: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox: FC<SearchBoxParams> = ({ term, onSearch }) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val.length !== 0) {
      return onSearch(e);
    }
  };

  return (
    <TextField
      label="Search"
      value={term}
      data-test="search"
      onChange={onChange}
      margin="normal"
      variant="outlined"
    ></TextField>
  );
};
