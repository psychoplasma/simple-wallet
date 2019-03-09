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
import { ClipLoader } from 'react-spinners';
import {
  PageContainer,
  PageContent,
  Column,
  Row
} from '../boxes';
import { formatDate } from '../../utils/conversions';
import LabeledValue from '../LabeledValue.jsx';
import Separator from '../Separator.jsx';


LockDetailsScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  processing: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object),
  totalLockedAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalClaimableAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  owner: PropTypes.string
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

const columnHeaders = ['Lock Reason', 'Locked Token Amount (TKN)', 'Lock Expiry Date', 'Token Status'];


function LockDetailsScreen(props) {
  const { classes, rows, processing, totalLockedAmount, totalClaimableAmount, owner } = props;

  const renderTableHeaders = headers => headers.map((header, i) => <TableCell key={i}>{header.toUpperCase()}</TableCell>);
  const renderTableRows = rows => rows.map((row, i) => {
    return (
      <TableRow key={i}>
        <TableCell component="th" scope="row">{row.reason}</TableCell>
        <TableCell align="right">{numeral(row.amount).format('0,0.[000000]')}</TableCell>
        <TableCell align="right">{formatDate(row.expiry, 'kr')}</TableCell>
        <TableCell align="right">{row.expiry > Date.now() ? 'locked' : !!row.status ? 'claimed' : 'claimable'}</TableCell>
      </TableRow>
    )
  });

  return (
    <PageContainer>
      <PageContent>
        <Column>
          {
            processing
              ? <Row>
                  <ClipLoader
                    size={24}
                    color={'#6ddcc6'}
                    loading={true}
                  />
                </Row>
                : <Column>
                    <Row>
                      <LabeledValue
                        label={'Owner Address'}
                        value={owner}
                        style={{width: 450}}
                      />
                    </Row>

                    <Separator spacing={20}/>

                    <Row>
                      <LabeledValue
                        label={'Total Locked Tokens'}
                        adornment='TKN'
                        value={`${numeral(totalLockedAmount).format('0,0.[000000]')}`}
                      />

                      <Separator vertical={true} spacing={50}/>

                      <LabeledValue
                        label={'Total Claimable Tokens'}
                        adornment='TKN'
                        value={`${numeral(totalClaimableAmount).format('0,0.[000000]')}`}
                      />
                    </Row>

                    <Separator spacing={20}/>

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
          }
        </Column>
      </PageContent>
    </PageContainer>
  );
}

export default ScreenMaker(
  CardMaker(withStyles(styles)(LockDetailsScreen)),
  {title: 'Lock Details', size: 3.5, goBackable: true}
);