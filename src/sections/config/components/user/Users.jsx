import * as React from 'react';
import { useState, useEffect } from 'react';

import {Box, Paper, Table, Button, TableRow, TableBody, TableHead, TextField, TableCell, TableContainer } from '@mui/material';

import { getUsers, saveUser, emailVerification } from 'src/apis/api.config';

import Text from '../Text';
import TextSmall from '../Text_small';
import AddUserAccount from './AddUserAccount';

export function Users() {

  const [rows, setRows]             = useState([]);
  const [editingId, setEditingId]   = useState(null);
  const schoolid                    = JSON.parse(localStorage.getItem('school'))[0].id;
 

  useEffect(() => {

    const fetchData = async () => {

      try {
        getUsers(`Schools/${schoolid}/customUsers`)
        .then(res =>{
          setRows(res.data);
        });

      } catch (error) {

        console.error("Error fetching data: ", error);

      }
    };

    fetchData();

  }, [schoolid]);


  const handleAddRow = () => {
    // Generate a unique ID for the new row
    const newId = Math.max(...rows.map((row) => row.id), 0) + 1;

    // Add a new row to the state
    setRows([...rows, { id: newId, firstName: ``, lastName:'', email:''}]);
    setEditingId(newId);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async(id, firstName, lastName, email) => {
    // console.log(firstName);
  
    saveUser(`Schools/${schoolid}/upsertCoordinator`, {email, firstName, lastName, primaryGrade: null })
    .then(rowresponse =>
      {
        const updatedRows = rows.map(row => {
          if (row.id === id) {
            return { ...row, id: rowresponse.id, firstName, lastName, email };
          }
          return row;
        });
      
        setRows(updatedRows);
        setEditingId(null);

      })
      .catch(err =>console.log(err));
    
  };

  const handleEmailVerification = async(id) => {
    // console.log(firstName);
    try {

      emailVerification(`CustomUsers/${id}/sendTeacherEmail`)
      .then(emailresponse => {

        if (emailresponse.status === 200) {

          console.log("Email sent successfully!");

        } else {

          console.log("Request completed, but status is not successful.");

        }

      })
      .catch(err => console.log(err));
     
    } catch (error) {

      console.log("Error fetching data: ", error)

    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  return (
      <Box style={{paddingTop: '46px'}}>
        <Text t='User Accounts' s='40px' />
        <TextSmall mt={4} mb={5} children='The coordinator has full access. To allow others to scan and/or view data, create an account with their email address and assign levels of access as needed. 
        Click on the Shared User button to create a scan-only account for multiple users.' />
        <AddUserAccount handleAddRow={handleAddRow} />      
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>First Name</TableCell>
              <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Last Name</TableCell>
              <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Email</TableCell>
              <TableCell sx={{backgroundColor:'#FFFFFF', borderBottom:'none'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
              <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                {editingId === row.id ? (
                  <TextField
                    value={row.firstName}
                    onChange={(e) => handleInputChange(row.id, 'firstName', e.target.value)}
                  />
                ) : (
                  row.firstName
                )}
              </TableCell>
                <TableCell  sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                  {editingId === row.id ? (
                    <TextField
                      value={row.lastName}
                      onChange={(e) => handleInputChange(row.id, 'lastName', e.target.value)}
                    />
                  ) : (
                    row.lastName
                  )}
                </TableCell>
                <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                  {editingId === row.id ? (
                    <TextField
                      value={row.email}
                      onChange={(e) => handleInputChange(row.id, 'email', e.target.value)}
                    />
                  ) : (
                    row.email
                  )}
                </TableCell>
                <TableCell sx={{backgroundColor:'#F8F8FA', borderWidth:'10px', borderColor:'#FFFFFF', paddingTop:'2px', paddingBottom:'2px'}}>
                  {editingId === row.id ? (
                    <>
                     <Button
                        sx={{
                          background: '#B9EC51',
                          fontFamily: 'Public Sans',
                          width: '71px',
                          height: '30px',
                          borderRadius: '90px',
                          color: '#333333',
                          marginRight: '10px'
                        }}
                        onClick={() => handleSave(row.id, row.firstName, row.lastName, row.email)}
                      >
                      SAVE
                    </Button>
                    <Button
                        sx={{
                          background: '#B9EC51',
                          fontFamily: 'Public Sans',
                          width: '71px',
                          height: '30px',
                          borderRadius: '90px',
                          color: '#333333',
                        }}
                        onClick={handleCancel}
                      >
                      Cancel
                    </Button>
                    </>
                  ) : (
                    <Box sx={{display:'flex', width:'160px',  justifyContent:'space-between'}}>  
                        <Button 
                        
                          sx={{
                            background: '#FFFFFF', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            color: '#333333', 
                            fontFamily: 'PingFang SC Regular',
                            fontWeight: 'bold',
                            minWidth:'40px'
                          }}
                          onClick={() => handleEdit(row.id)}
                        >
                          <img width={16} height={14} src="assets/Config/Config_Users/edit.png" alt="Logo"/>
                        </Button>
                        <Button 
                        
                          sx={{
                            background: '#FFFFFF', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            color: '#333333', 
                            fontFamily: 'PingFang SC Regular',
                            fontWeight: 'bold',
                            minWidth:'40px'
                          }}
                          onClick={() => handleEmailVerification(row.id)}
                        >
                          <img width={20} height={20} src="assets/Config/Config_Users/mail.png" alt="Logo"/>
                        </Button>
                        <Button 
                          sx={{
                            background: '#FFFFFF', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            color: '#333333', 
                            fontFamily: 'PingFang SC Regular',
                            fontWeight: 'bold',
                            minWidth:'40px'
                          }}
                          onClick={() => handleEdit(row.id)}
                        >
                          <img width={23} height={23} src="assets/Config/Config_Users/avatar.png" alt="Logo"/>
                        </Button>
                      </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
  );
}
