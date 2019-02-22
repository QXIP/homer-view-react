import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import uuidv1 from 'uuid';
import TableFooter from '@material-ui/core/TableFooter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Cookies from 'universal-cookie';
import styles from './styles';
import TableHead from './TableHead';

/* eslint-disable */

class EnhancedTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'id',
    page: 0,
    rowsPerPage: 5,
    checkedTheme: false,
  };

  componentDidMount() {
    const cookies = new Cookies();
    const themeDark = cookies.get('theme');
    this.setState({ checkedTheme: String(themeDark) === 'true' });
  }

  handleChangeTheme = () => {
    this.setState({ checkedTheme: !this.state.checkedTheme }, () => {
      const cookies = new Cookies();
      cookies.set('theme', this.state.checkedTheme);
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy }, () => {});
  };

  handleClick = (event, id) => {
    const { rowOnClick } = this.props;

    rowOnClick(event, id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  sortData(data, order, orderBy) {
    return _.orderBy(
      data,
      row => _.find(row, el => el.key === orderBy).label,
      order,
    );
  }

  render() {
    const { classes, tableBody, tableHead } = this.props;
    const { order, orderBy, rowsPerPage, page, checkedTheme } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tableBody.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead
              order={order}
              orderBy={orderBy}
              data={tableHead}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {this.sortData(tableBody, order, orderBy)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n)}
                    role="checkbox"
                    tabIndex={-1}
                    key={uuidv1.v1()}
                  >
                    {_.map(n, val => (
                      <TableCell key={uuidv1.v1()} align="left">
                        {val.label}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={tableHead.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Table>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={1}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checkedTheme}
                        onChange={this.handleChangeTheme}
                        value="checkedB"
                        color="primary"
                      />
                    }
                    label="Dark theme"
                  />
                </TableCell>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={tableBody.length || 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableBody: PropTypes.array,
  tableHead: PropTypes.array,
  rowOnClick: PropTypes.func,
};

export default withStyles(styles)(EnhancedTable);