import React, { useState, useEffect } from 'react';
import { FormControlLabel, MenuItem, TextField, Switch, withStyles } from '@material-ui/core';
import debounce from 'lodash.debounce';

const styles = theme => ({
  container: {
    display: 'flex',
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200,
  },
  searchField: {
    flex: 1,
  },
  menu: {
    width: 120,
  },
});

const genderMenuItems = [
  {label: 'None', value: ''},
  {label: 'Female', value: 'female'},
  {label: 'Male', value: 'male'},
  {label: 'Unisex', value: 'unisex'},
]

const ProductsFilter = ({ classes, onFilterChange }) => {
  const [filter, setFilter] = useState({ searchKey: '', gender: '', onSale: false });
  const dOnFilterChange = debounce(onFilterChange, 500);

  useEffect(() => {
    dOnFilterChange(filter);
    return () => {
      dOnFilterChange.cancel();
    }
  }, [filter]);

  const handleInputChange = (event) => {
    setFilter({ ...filter, searchKey: event.target.value });
  }

  const handleSelectChange = (event) => {
    setFilter({ ...filter, gender: event.target.value });
  }

  const handleSwitchChange = (event) => {
    setFilter({ ...filter, onSale: event.target.checked });
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Search Products"
        className={`${classes.textField} ${classes.searchField}`}
        value={filter.searchKey}
        onChange={handleInputChange}
        margin="normal"
        variant="outlined"
      />
      <TextField
        select
        label="Select Gender"
        className={`${classes.textField} ${classes.selectField}`}
        value={filter.gender}
        onChange={handleSelectChange}
        SelectProps={{
          MenuProps: {
            className: classes.selectField,
          },
        }}
        margin="normal"
        variant="outlined"
      >
        {genderMenuItems.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={
          <Switch
            checked={filter.onSale}
            onChange={handleSwitchChange}
            value="checkedB"
            color="primary"
          />
        }
        label="Show Products on Sale"
      />
    </form>
  )
}

export default withStyles(styles, { withTheme: true })(ProductsFilter);
