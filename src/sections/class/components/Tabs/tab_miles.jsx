import * as React from 'react';
import { useState,useEffect } from 'react';

import {Box, Paper,  Table, styled, TableRow, TableBody, TableCell,  TableHead, Pagination,LinearProgress, TableContainer, tableCellClasses } from '@mui/material';

import { getStudentMiles} from 'src/apis/api.classes';

import EditMilesDialog from '../dialog_components/EditMilesDialog';

export function TabMiles() {

  const rowData = [
    { id: 1, firstName: 'Hewitt', lastName: 'Claire', gender: "M", distance: 2.75 }
  ];

  const schoolData                     =   JSON.parse(localStorage.getItem('school'));
  const schoolId                       =   schoolData && schoolData.length > 0 ? schoolData[0].id : null;

  const  [page, setPage]               =   useState(1)
  const  [dialogOpen, setDialogOpen]   =   useState(false)
  const  [students, setStudents]       =   useState([rowData])
  const  [selectedRow, setSelectedRow] =   useState([])
  const  [classData]     =   useState()
  const  rowsPerPage                   =   10;
  const  startIndex                    =   (page - 1) * rowsPerPage;
  const  endIndex                      =   startIndex + rowsPerPage;

  const groupId                        =   localStorage.getItem("groupId") ? localStorage.getItem("groupId") : 0
  const programId                      =   localStorage.getItem('programId') ? localStorage.getItem('programId') : 0


  useEffect(() => {

    const fetchData = async () => {

      try {

         getStudentMiles(`LapEntries/getStudentMilesByGroupForClassSheet?groupId=${groupId}&programId=${programId}`)
        .then(res =>{

          const studentlist = res.data.table
          // const distance = response.data.totals.miles
          setStudents(studentlist)
         
        })
        .catch(err =>{

          console.log(err)
        })
        
      } catch (error) {

        console.log('Error fetching data:', error);
      }
    };

    fetchData();

  }, [groupId, programId, schoolId]);

  const handleOpenDialog = async (row) => {

    try {

     setSelectedRow(row);
      setDialogOpen(true);

    } catch (error) {

      console.error('Error fetching miles data:', error);
    }
    
  };

  const handleCloseDialog = () => {

    setDialogOpen(false);

  };

  const handleStudentEdit = () => {

  }

  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };


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
    // hide last border
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
              <StyledTableCell>Students Name</StyledTableCell>
              <StyledTableCell>Distance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow style={{ cursor: 'pointer' }} key={row.id} onClick={() => handleOpenDialog(`${row.firstName} ${row.lastName}`)}>
                <StyledTableCell width={350} >{`${row.firstName}  ${row.lastName}`}</StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div style={{ width: '5%', fontStyle: 'italic' }}>{row.distanceInMiles}</div>
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
          count={Math.ceil(students.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
      
      <EditMilesDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onSave={handleStudentEdit}
        courseData={selectedRow}
        classList={classData}
      />
    </Box>
  );
}

