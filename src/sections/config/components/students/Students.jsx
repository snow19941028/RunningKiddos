import * as React from 'react';
import { useState, useEffect } from 'react';

import {Box,Grid, Paper, Table, Button,  styled, TableRow, Checkbox, TextField, TableBody, TableHead, TableCell, Typography, TableContainer,  tableCellClasses } from '@mui/material';

import { getActiveG } from 'src/apis/api.config';


export function Students() {

  // ----Active Students---/


  const [activeFirstName, setActiveFirstName]   =   useState('')
  const [activelastName,  setActivelastName]    =   useState('')
  const [activeIdNumber,  setActiveIdNumber]    =   useState('')
  const [activeGrade,     setAactiveGrade]      =   useState(1)
  const [activeData,      setActiveData]        =   useState([])

  const schoolid                                =   JSON.parse(localStorage.getItem('school'))[0].id
  const activeGroupApiUrl                       =   `Schools/${schoolid}/groups`
  const activeStudentsApiUrl                    =   `Students/getStudents?schoolId=${schoolid}`



  useEffect(() => {

    const fetchActiveStudents = async () => {

      try {

        let groupsResponse          =   [];
        let allActiveStudents         =   [];
        let activeStudentsResponse  =   [];

        getActiveG(activeGroupApiUrl)
        .then(res => {groupsResponse = res.data});
        
        // eslint-disable-next-line no-restricted-syntax
        for (const group of groupsResponse) {

          if(group.isGrade === true){
            // eslint-disable-next-line no-continue
            continue;
          }

          getActiveG(`api/Groups/${group.id}/students`)
          // eslint-disable-next-line no-loop-func, no-return-assign
          .then(res => activeStudentsResponse = res.data)
          .catch(err => console.log(err));

          if (activeStudentsResponse.length === 0){
            // eslint-disable-next-line no-continue
            continue;
          }

          const activeStudentsWithGroupId = activeStudentsResponse.map(student => ({
            ...student,
            Class: group.name,
            Grade: group.grade
          }));

          allActiveStudents = allActiveStudents.concat(activeStudentsWithGroupId);
          setActiveData(allActiveStudents);
        }

      } catch (error) {

        console.error('Error fetching active students:', error);

      }
    };

    fetchActiveStudents();

  }, [activeStudentsApiUrl, activeGroupApiUrl]);

  const handleActiveSearch = () => {

    const updateTableData = activeData.filter((row) => row.firstName === activeFirstName || row.lastName === activelastName || row.id === activeIdNumber || row.grade === activeGrade);
    setActiveData(updateTableData);

  };

  const handlePrint = (index) => () => {
    
    let tableId = '';

    switch (index) {
      case 1:
        tableId = 'activatedStudents';
        break;
      case 2:
        tableId = 'inactivatedStudents';
        break;
      case 3:
        tableId = 'deletedStudents';
        break;
      default:
        break;
    }
    const tableContainer = document.getElementById(tableId);

    // Open a new window for printing
    const printWindow = window.open('', '_blank');

    // Render the content to be printed in the new window
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<h1>Activated Students</h1>');
    printWindow.document.write('<div>');

    // Copy the content of the table container to the new window
    printWindow.document.write(tableContainer.innerHTML);

    printWindow.document.write('</div></body></html>');

    // Close the document and trigger the print
    printWindow.document.close();
    printWindow.print();
  };

  // -----Inactive Students-----//

  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxClick = (event, id) => {

    if (event.target.checked) {

      setSelectedRows((prevSelected) => [...prevSelected, id]);

    } else {

      setSelectedRows((prevSelected) =>
      prevSelected.filter((selectedId) => selectedId !== id));
    }

  };

  const [inactiveFirstName, setInactiveFirstName]   =   useState('');
  const [inactivelastName, setInactivelastName]     =   useState('');
  const [inactiveIdNumber, setInactiveIdNumber]     =   useState('');
  const [inactiveData, setInactiveData]             =   useState([]);



  useEffect(() => {

    const fetchActiveStudents = async () => {

      try {

        let groupsResponse            =   []
        let allinActiveStudents         =   []
        let inactiveStudentsResponse  =   []

        getActiveG(activeGroupApiUrl)
        // eslint-disable-next-line no-return-assign, no-const-assign
        .then(res => groupsResponse = res.data)
        
        // eslint-disable-next-line no-restricted-syntax
        for (const group of groupsResponse) {

          if(group.isGrade === false){
            // eslint-disable-next-line no-continue
            continue;
          }
         
          getActiveG(`Groups/${group.id}/students`)
          // eslint-disable-next-line no-return-assign, no-const-assign, no-loop-func
          .then(res => inactiveStudentsResponse = res.data);

          if (inactiveStudentsResponse.length === 0){
            // eslint-disable-next-line no-continue
            continue;
          }

          const activeStudentsWithGroupId = inactiveStudentsResponse.map(student => ({
            ...student,
          }));
         
          allinActiveStudents = allinActiveStudents.concat(activeStudentsWithGroupId);
          setInactiveData(allinActiveStudents);

        }

      } catch (error) {
        console.error('Error fetching active students:', error);
      }
    };

    fetchActiveStudents();
  }, [activeStudentsApiUrl, activeGroupApiUrl]);


  const handleInactiveSearch = () => {

    const updateTableData = activeData.filter((row) => row.firstName === inactiveFirstName || row.lastName === inactivelastName || row.id === inactiveIdNumber);
    setInactiveData(updateTableData);
  };

  const handleAddProgram = () => {

    const selectedRowsData = inactiveData.filter((item) =>
      selectedRows.includes(item.id)
    );

    setActiveData((prevData) => [...prevData, ...selectedRowsData]);
    const newData = inactiveData.filter((item) => !selectedRows.includes(item.id));
    setInactiveData(newData);
    setSelectedRows([]);

  }



  // ***** Deleted Students ******//

  const [deletedFirstName, setDeletedFirstName]   = useState('');
  const [deletedLastName, setdeletedLastName]     = useState('');
  const [deletedIdNumber, setDeletedIdNumber]     = useState('');
  const [deletedData, setDeletedData]             = useState([{ firstName: 'Jhon', lastName:'Doe', id:'12312312', deletedDate:'2023-12-12'}]);

  const deletedStudentsApiUrl                     = `Students/getDeletedStudents?schoolId=${schoolid}`;


  useEffect(() => {

    const fetchDeletedStudents = async () => {

      try {

        getActiveG(deletedStudentsApiUrl)
        .then(res => setDeletedData(res.data))
        .catch(err => console.log(err))
        
      } catch (error) {

        console.error('Error fetching deleted students:', error);
      
      }
    };

    fetchDeletedStudents();
  
  }, [deletedStudentsApiUrl]);

  const handleDeletedSearch = () => {
    
    const updateTableData = activeData.filter((row) => row.firstName === deletedFirstName || row.lastName === deletedLastName || row.id === deletedIdNumber);
    setDeletedData(updateTableData);
  };

// ----Table Style-----//
  const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FFFFFF',
      color: "rgb(51, 51, 51, 0.5)",
    },
    [`&.${tableCellClasses.body}`]: {
      paddingTop:'8px',
      paddingBottom:'8px',
      fontFamily:'Public Sans',
      fontWeight: 'bold',
      fontSize: 14,
    }

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

  const styleTextField = {
    '& .MuiInputBase-root': {
      // Your custom styles for the input base
      height: '40px',
      width: '200px',
      background: '#FFFFFF'
    },
  };

    return (
        <div style={{paddingTop: '46px'}}>
          <Typography mb={4} sx={{fontSize:'40px', width:'448px', height:'18px', fontFamily:'Public Sans', fontWeight: 'Bold', color: '#333333', lineHeight: '18px'}}>Active Students</Typography>        
          <Grid>
            <Box sx={{display:'flex'}}>
              <Box sx={{ width:'75%', display:'flex', justifyContent:'space-between'}}>
                <TextField 
                  placeholder='First Name'
                  sx={styleTextField}
                  onChange={(e) => {setActiveFirstName(e.target.value)}}
                />
                <TextField 
                  placeholder='Last Name' 
                  sx={styleTextField}
                  onChange={(e) => {setActivelastName(e.target.value)}}
                />
                <TextField 
                  placeholder='Or Id Number' 
                  sx={styleTextField}
                  onChange={(e) => {setActiveIdNumber(e.target.value)}}
                />
                <TextField 
                  placeholder='Grade' 
                  sx={styleTextField}
                  onChange={(e) => {setAactiveGrade(e.target.value)}}
                />
                <Button sx={{
                    backgroundColor:'#97B9FF', 
                    borderRadius:'90px', 
                    width:'100px', 
                    fontSize:'14px', 
                    height: '40px',
                    color:'#333333'}}
                  onClick={handleActiveSearch}
                >
                  Search
                </Button>
                <Button sx={{backgroundColor:'#F8F8FA', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}} onClick={handlePrint(1)}>
                  <img width={14} height={14} src="assets/Config/Config_Students/print.png" alt="Print"/>
                </Button>
              </Box>
              <Box sx={{width:'25%', display:'flex', justifyContent:'flex-end'}}>
                <Button sx={{backgroundColor:'#F8F8FA', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}}>
                  <img width={14} height={14} src="assets/Config/Config_Students/group.png" alt="Print"/>
                </Button>
                <Typography sx={{fontFamily:'Public Sans', fontSize:'16px', height:'40px', margin:'8px'}}>
                  Total Student
                </Typography>
                <Typography sx={{fontFamily:'Calibri', fontWeight:'bold', fontStyle:'italic', fontSize:'30px'}}>
                  {activeData.length}
                </Typography>
              </Box>
            </Box>
            <TableContainer id='activatedStudents'  component={Paper} sx={{background:'#FFFFFF', maxHeight: '450px'}}>
            <Table>
              <TableHead >
                <TableRow>
                  <StyledTableCell>Frist Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Grade</StyledTableCell>
                  <StyledTableCell>Class</StyledTableCell>
                  <StyledTableCell>Id Number</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>                
                {activeData.map((row) => (
                  <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.firstName}</StyledTableCell>
                  <StyledTableCell>{row.lastName}</StyledTableCell>
                  <StyledTableCell>{row.Grade}</StyledTableCell>
                  <StyledTableCell>{row.Class}</StyledTableCell>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>      
            </Table>
          </TableContainer>
          </Grid>
          
          <Typography mt={4} mb={4} sx={{fontSize:'40px', width:'448px', height:'18px', fontFamily:'Public Sans', fontWeight: 'Bold', color: '#333333', lineHeight: '18px'}}>Inactive Students</Typography> 
          <Typography mt={4} mb ={5} sx={{
              width:'1038px', 
              height:'18px', 
              fontSize:'14px', 
              fontFamily:'Public Sans', 
              fontWeight: '500', 
              color:'rgb(51, 51, 51, 0.6)', 
              lineHeight: '18px',
              textAlignL: 'justify'
              }}>
                Students not in the current program, but in the database.
            </Typography>       
          <Grid>
            <Box sx={{display:'flex'}}>
              <Box sx={{ width:'60%', display:'flex', justifyContent:'space-between'}}>
                <TextField 
                  placeholder='First Name' 
                  sx={styleTextField}
                  onChange={(e) => {setInactiveFirstName(e.target.value)}}
                />
                <TextField 
                  placeholder='Last Name' 
                  sx={styleTextField}
                  onChange={(e) => {setInactivelastName(e.target.value)}}
                />
                <TextField 
                  placeholder='Or Id Number' 
                  sx={styleTextField}
                  onChange={(e) => {setInactiveIdNumber(e.target.value)}}
                />
                <Button sx={{
                    backgroundColor:'#97B9FF', 
                    borderRadius:'90px', 
                    width:'90px', 
                    height: '40px',
                    fontSize:'14px', 
                    color:'#333333'}}
                  onClick={handleInactiveSearch}
                >
                  Search
                </Button>
                <Button sx={{backgroundColor:'#F8F8FA', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}} onClick={handlePrint(2)}>
                  <img width={14} height={14} src="assets/Config/Config_Students/print.png" alt="Print"/>
                </Button>
              </Box>
              <Box sx={{width:'40%', display:'flex', justifyContent:'flex-end'}}>
                <Button sx={{backgroundColor:'#F8F8FA', borderRadius:'50%', minWidth:'40px', height:'40px', fontSize:'14px'}}>
                  <img width={14} height={14} src="assets/Config/Config_Students/group.png" alt="Print"/>
                </Button>
                <Typography sx={{fontFamily:'Public Sans', fontSize:'16px', height:'40px', margin:'8px'}}>
                  Total Student
                </Typography>
                <Typography sx={{fontFamily:'Calibri', fontWeight:'bold', fontStyle:'italic', fontSize:'30px'}}>
                  {inactiveData.length}
                </Typography>
              </Box>              
            </Box>       
            
            <Button   
              sx={{
                marginTop: '10px',
                background: '#B9EC51', 
                width: '180px', 
                height: '40px', 
                borderRadius: '30px', 
                color: '#333333', 
                fontFamily: 'PingFang SC-Bold'
              }}
              onClick={handleAddProgram}
            >
              <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{marginRight: '6px'}}/>
              ADD TO PROGRAM
            </Button>       
            <TableContainer id='inactivatedStudents'  component={Paper} sx={{background:'#FFFFFF', maxHeight: '250px'}}>
            <Table>
              <TableHead >
                <TableRow>
                  <StyledTableCell> 
                    {/* <Checkbox
                      indeterminate={
                        selectedRows.length > 0 && selectedRows.length < data.length
                      }
                      checked={selectedRows.length === data.length}
                      onChange={handleSelectAllClick}
                    /> */}
                  </StyledTableCell>
                  <StyledTableCell>Frist Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Id Number</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>                
                {inactiveData.map((row) => (
                  <StyledTableRow key={row.id}>
                  <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onChange={(e) => handleCheckboxClick(e, row.id)}
                      />
                  </StyledTableCell>
                  <StyledTableCell>{row.firstName}</StyledTableCell>
                  <StyledTableCell>{row.lastName}</StyledTableCell>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>      
            </Table>
          </TableContainer>
          </Grid>
          <Typography mt={4} mb={4} sx={{ fontSize: '40px', width: '448px', height: '18px', fontFamily: 'Public Sans', fontWeight: 'Bold', color: '#333333', lineHeight: '18px' }}>Deleted Students</Typography>
      <Typography mt={4} mb={5} sx={{
        width: '1038px',
        height: '18px',
        fontSize: '14px',
        fontFamily: 'Public Sans',
        fontWeight: '500',
        color: 'rgb(51, 51, 51, 0.6)',
        lineHeight: '18px',
        textAlignL: 'justify',
      }}>
        Students graduated in the database.
      </Typography>
      <Grid>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '60%', display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              placeholder='First Name'
              sx={styleTextField}
              onChange={(e) => { setDeletedFirstName(e.target.value) }}
            />
            <TextField
              placeholder='Last Name'
              sx={styleTextField}
              onChange={(e) => { setdeletedLastName(e.target.value) }}
            />
            <TextField
              placeholder='Or Id Number'
              sx={styleTextField}
              onChange={(e) => { setDeletedIdNumber(e.target.value) }}
            />
            <Button sx={{
              backgroundColor: '#97B9FF',
              borderRadius: '90px',
              width: '100px',
              height: '40px',
              fontSize: '14px',
              color: '#333333'
            }}
              onClick={handleDeletedSearch}
            >
              Search
            </Button>
            <Button sx={{ backgroundColor: '#F8F8FA', borderRadius: '50%', minWidth: '40px', height: '40px', fontSize: '14px' }} onClick={handlePrint(3)}>
              <img width={14} height={14} src="assets/Config/Config_Students/print.png" alt="Print" />
            </Button>
          </Box>
          <Box sx={{ width: '40%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ backgroundColor: '#F8F8FA', borderRadius: '50%', minWidth: '40px', height: '40px', fontSize: '14px' }}>
              <img width={14} height={14} src="assets/Config/Config_Students/group.png" alt="Print" />
            </Button>
            <Typography sx={{ fontFamily: 'Public Sans', fontSize: '16px', height: '40px', margin: '8px' }}>
              Total Student
            </Typography>
            <Typography sx={{ fontFamily: 'Calibri', fontWeight: 'bold', fontStyle: 'italic', fontSize: '30px' }}>
              {deletedData.length}
            </Typography>
          </Box>
        </Box>
        <TableContainer id='deletedStudents' component={Paper} sx={{ background: '#FFFFFF', maxHeight: '250px' }}>
          <Table>
            <TableHead >
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell>Last Name</StyledTableCell>
                <StyledTableCell>Id Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deletedData.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.firstName}</StyledTableCell>
                  <StyledTableCell>{row.lastName}</StyledTableCell>
                  <StyledTableCell>{row.id}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
          
      </div>
    );
}
