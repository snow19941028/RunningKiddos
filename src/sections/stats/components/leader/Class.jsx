import * as React from 'react';
import { useState, useEffect } from 'react';

import { Box, Paper, Table, styled, TableRow, TableBody, TableCell, TableHead, Pagination, LinearProgress, TableContainer, tableCellClasses } from '@mui/material';

import { getStatLeaderClass } from 'src/apis/api.stats';

import Rank from './Rank';

export default function Class() {

  const rowData = [
    { rank: 1, name: 'Large Testing Class', distanceInUnits: 9675.86 }
  ];

  const programId = localStorage.getItem('programId');
  const [rank, setRank] = useState([rowData])
  const [page, setPage] = useState(1)
  const rowsPerPage = 10;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStatLeaderClass(`https://api.runningkiddos.com/api/Groups/getLeaderboard?programId=${programId}&groupType=Class`);
        setRank(res.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [programId]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FFFFFF',
      color: "rgb(51, 51, 51, 0.5)",
    },

    [`&.${tableCellClasses.body}`]: {
      paddingTop: '8px',
      paddingBottom: '8px',
      fontFamily: 'Public Sans',
      fontWeight: 'bold',
      fontSize: 14,
    },

  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <Box>

      <TableContainer component={Paper} sx={{ background: '#FFFFFF' }}>
        <Table>
          <TableHead >
            <TableRow>
              <StyledTableCell>Rank Name</StyledTableCell>
              <StyledTableCell>Class</StyledTableCell>
              <StyledTableCell>Distance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rank.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow style={{ cursor: 'pointer' }} key={row.id}>
                <StyledTableCell width={100} ><Rank param={`${row.rank}`} /></StyledTableCell>
                <StyledTableCell width={150} >{`${row.name}`}</StyledTableCell>
                <StyledTableCell>
                  <div style={{ width: '5%', fontStyle: 'italic' }}>{row.distanceInUnits}</div>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ width: '95%' }}>
                      <LinearProgress sx={{
                        height: 15,
                        borderRadius: 5,
                        backgroundColor: "rgba(185,236,81,0.3)",
                        transform: 'rotateY(180deg)',
                        '& .MuiLinearProgress-bar': {
                          transform: 'rotateY(180deg)',
                          borderRadius: 5,
                          backgroundColor: '#B9EC51',
                        },
                      }} variant="determinate" value={row.distanceInMiles} />
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          sx={
            {
              float: 'right',
              '& .MuiPaginationItem-page': {
                color: '#A9A9A9'
              },
              '& .MuiPaginationItem-page.Mui-selected': {
                color: '#000000', // Set your desired color here
                backgroundColor: '#B9EC51', // Set your desired color here
              },
            }
          }
          count={Math.ceil(rank.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>

    </Box>
  );
}

