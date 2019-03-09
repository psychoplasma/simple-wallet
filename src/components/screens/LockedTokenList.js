import React from 'react';
import PropTypes from 'prop-types';
import CardMaker from '../CardMaker';
import ScreenMaker from '../ScreenMaker';
import numeral from 'numeral';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  PageContainer,
  PageContent,
  Column
} from '../boxes';


LockedTokenListScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  processing: PropTypes.bool,
  columnHeaders: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object)
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function LockedTokenListScreen(props) {
  const { classes, rows, columnHeaders } = props;

  const renderTableHeaders = headers => headers.map((header, i) => <TableCell key={i}>{header.toUpperCase()}</TableCell>);
  const renderTableRows = rows => rows.map((row, i) => {
    return (
      <TableRow key={i}>
        <TableCell component="th" scope="row">{row.address}</TableCell>
        <TableCell align="right">{numeral(row.unlockable).format('0,0.[000000]')}</TableCell>
        <TableCell align="right">{numeral(row.totalLocked).format('0,0.[000000]')}</TableCell>
      </TableRow>
    )
  });

  return (
    <PageContainer>
      <PageContent>
        <Column>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  { renderTableHeaders(columnHeaders) }
                </TableRow>
              </TableHead>
              <TableBody>
                { renderTableRows(rows) }
              </TableBody>
            </Table>
          </Paper>
        </Column>
      </PageContent>
    </PageContainer>
  );
}

export default ScreenMaker(
  CardMaker(withStyles(styles)(LockedTokenListScreen)),
  {title: 'Locked Token List', size: 3.5, goBackable: true}
);