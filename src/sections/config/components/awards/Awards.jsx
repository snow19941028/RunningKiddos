import * as React from 'react';
import { useState, useEffect } from 'react';

import { List, Paper, Table, Button, Select, Popover, ListItem, TableRow, MenuItem, TableBody, TableHead, TextField, TableCell, Typography, TableContainer } from '@mui/material';

import { getKindData, getAwardData, addAwardData, saveAwardData, deleteAwardData, getAwardLevelData, addAwardLevelData, deleteAwardLevelData } from '../../../../apis/api.config'

export function Awards() {

  const tempCertificates = [
    { value: 1, displayValue: 'No Certificate' },
    { value: 2, displayValue: 'White' },
    { value: 3, displayValue: 'Black' },

    // Add more options as needed
  ];

  const tempUnitData = [
    { value: 1, displayValue: 'mi' },
    { value: 2, displayValue: 'cm' },
    { value: 3, displayValue: 'm' },
    // Add more options as needed
  ];

  // ------Awards------//
  const [awardsData, setAwardsData]       = useState([]);
  const [anchorEl, setAnchorEl]           = useState(null);
  // const [selectedItemsList, setSelectedItemsList] = useState([]);
  // const [itemsList, setItemList]       =    useState([]);
  const [certificates, setCertificates]   = useState(tempCertificates);
  const [units, setUnits]                 = useState(tempUnitData)


  const schoolData = JSON.parse(localStorage.getItem('school'));
  const schoolID = schoolData && schoolData.length > 0 ? schoolData[0].id : null;
  const programID = localStorage.getItem('programId') ? localStorage.getItem('programId') : 0

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch program data

        let awardData = []

        getAwardData(`Schools/${schoolID}/incentives`)
          .then(res => {

            setAwardsData(res.data);
            awardData = res.data
            //   setItemList(res.data.map(one=>one.name))  

          })
          .catch(err => {
            console.log(err)
          });

        getAwardLevelData(`Schools/${schoolID}/incentiveTiers`)
          .then(res => {

            res.data.map(async (one) => {
              getAwardLevelData(`IncentiveTiers/${one.id}/incentives`)
                .then(response => ({ ...one, certificateId: response.data.certificateId }))
            })

            const result = res.data.map(one => ({ ...one, selectedItemList: [] }))
            const result1 = result.map(one => ({ ...one, itemList: awardData }))
            setLevelData(result1);
            console.log(result1)

          })
          .catch(err => {

            console.log(err)
          });


        getKindData(`Certificates`)
          .then(res => {

            setCertificates(res.data)

          })
          .catch(err => {

            console.log(err)

          })

        getKindData(`Units`)
          .then(res => {

            setUnits(res.data)
            console.log(res.data)

          })
          .catch(err => {

            console.log(err)

          })

      } catch (error) {

        console.log("error :")
        console.log(error)

      }
    };

    fetchData();
  }, [programID, schoolID]);

  const handleAddAwardsData = async () => {
    const data = { name: '', schoolId: schoolID, programId: programID }
    try {
      // Send a request to create a new row with no name

      addAwardData('incentives', data)
        .then(res => {

        })
        .catch(err =>

          console.log(err)

        );

    } catch (error) {

      console.error('Error adding award:', error);

    }

    setAwardsData([...awardsData, data]);
  };

  const handleDeleteAwardsData = async (id) => {

    deleteAwardData(`incentives/${id}`);

    const updateTableData = awardsData.filter((row) => row.id !== id);
    setAwardsData(updateTableData);

  };

  const handleSaveAwardsData = async (id) => {

    try {

      const rowToSave = awardsData.find((row) => row.id === id);


      if (rowToSave && rowToSave.name.trim() !== '') {

        saveAwardData(`incentives/${id}`, rowToSave);

        const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
        getAwardData(`Schools/${schoolid}/incentives`)
          .then(res => {

            setAwardsData(res.data);

          })
          .catch(err => console.log(err));

      } else {
        // Handle the case where the row data is not valid
        console.error('Invalid row data. Cannot save.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAwardsDataInputChange = (id, field, value) => {

    if (field === 'distance') {
      const updatedRows = levelData.map((row) =>
        row.id === id ? { ...row, name: value } : row);

      setLevelData(updatedRows);

    }
    else {

      const updatedRows = awardsData.map((row) =>
        row.id === id ? { ...row, name: value } : row);

      setAwardsData(updatedRows);
    }

  };

  // --------Awards Level----------------//

  const [levelData, setLevelData] = useState([
    { id: 1, unit: 1, distance: 2, certificate: 1, awards: 1 },
    { id: 2, unit: 2, distance: 2, certificate: 2, awards: 1 },
    { id: 3, unit: 1, distance: 2, certificate: 1, awards: 1 },
    // Add more initial rows as needed
  ]);

  const handleAddLevelData = () => {

    const data = { unitId: 1, schoolId: schoolID, programId: programID }
    try {
      // Send a request to create a new row with no name
      addAwardLevelData('IncentiveTiers', data)
        .then(res => {
        })
        .catch(err =>
          console.log(err)
        );
    } catch (error) {

      console.error('Error adding award:', error);

    }
    // Generate a unique ID for the new row

    // Add a new row to the state
    setLevelData([...levelData, data]);

  };

  const handleDeleteLevelData = async (id) => {

    deleteAwardLevelData(`incentiveTiers/${id}`);
    // Handle delete action
    const updateTableData = levelData.filter((row) => row.id !== id);
    setLevelData(updateTableData);
  };

  const handlesaveawardsLevelData = async (ID) => {

    const saveData = levelData.find((row) => (row.id === ID));
    saveData.hasChanges = true;
    console.log(saveData);
    saveData.id = ID
    alert("e")
    saveAwardData(`incentiveTiers/${ID}`, saveData);

    const schoolid = JSON.parse(localStorage.getItem('school'))[0].id;
    getAwardLevelData(`Schools/${schoolid}/incentiveTiers`)
      .then(res => {

        setLevelData(res.data);

      })
      .catch(err => console.log(err));

  }

  const handleLevelDataInputChange = (id, field, value) => {

    const updatedRows = levelData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setLevelData(updatedRows);
  };

  const handleButtonClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleItemSelect = (item, id) => {
    console.log(item, id);
    // const updatedRow = levelData.find((row) => row.id === id);
    // updatedRow.selectedItemList = [...updatedRow.selectedItemList, item]
    // updatedRow.itemsList = updatedRow.itemsList.filter((i) => i !== item);
    // const updatedRows = levelData.map((row) =>
    //   row.id === id ? updatedRow : row
    // );
    // setLevelData(updatedRows);
    // setAnchorEl(null);
  };

  const handleRemoveButton = (item, id) => {
    console.log("Item removed");
    console.log(id);
    const updatedRow = levelData.find((row) => row.id === id);
    updatedRow.selectedItemList = [...updatedRow.selectedItemList, item]
    // setSelectedItemsList((prevList) => prevList.filter((i) => i !== item));
    updatedRow.itemList = updatedRow.itemList.filter((i) => i !== item);
    // setItemList((prevList) => [...prevList, item]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ paddingTop: '46px' }}>
      <Typography sx={{ fontSize: '40px', width: '148px', height: '18px', fontFamily: 'Public Sans', fontWeight: 'Bold', color: '#333333', lineHeight: '18px' }}>Awards</Typography>
      <Typography mt={4} mb={1} sx={{
        width: '1038px',
        height: '18px',
        fontSize: '14px',
        fontFamily: 'Public Sans',
        fontWeight: '500',
        color: 'rgb(51, 51, 51, 0.6)',
        lineHeight: '18px',
        textAlignL: 'justify'
      }}>
        Add the names of the awards used in this program.
      </Typography>
      <Button
        sx={{
          marginTop: '20px',
          marginBottom: '0px',
          background: '#B9EC51',
          width: '180px',
          height: '40px',
          borderRadius: '30px',
          color: '#333333',
          fontFamily: 'PingFang SC-Bold'
        }}
        onClick={handleAddAwardsData}
      >
        <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{ marginRight: '6px' }} />
        ADD AWARDS
      </Button>

      <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}> </TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {awardsData.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ backgroundColor: '#F8F8FA', width: '100px', align: 'center', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <img width={20} src="assets/Config/Config_Awards/prize.png" alt="Logo" style={{ marginRight: '6px' }} />
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', width: '350px', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <TextField
                    value={row.name}
                    onChange={(e) => handleAwardsDataInputChange(row.id, 'name', e.target.value)}
                    sx={{
                      '& .MuiInputBase-root': {
                        // Your custom styles for the input base
                        height: '40px',
                        width: '200px',
                        background: '#FFFFFF'
                      },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', width: '90px', justifyContent: 'space-between' }}>
                    <Button
                      sx={{
                        background: '#FFFFFF',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        color: '#333333',
                        fontFamily: 'PingFang SC Regular',
                        fontWeight: 'bold',
                        minWidth: '40px'
                      }}
                      onClick={() => handleSaveAwardsData(row.id)}
                    >
                      <img width={18} height={18} src="assets/Config/Config_Program/save.png" alt="Logo" />
                    </Button>
                    <Button
                      sx={{
                        background: '#FFFFFF',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        color: '#333333',
                        fontFamily: 'PingFang SC Regular',
                        fontWeight: 'bold',
                        minWidth: '40px'
                      }}
                      onClick={() => handleDeleteAwardsData(row.id)}
                    >
                      <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant='h3' sx={{ marginTop: '20px' }}>Awards Levels</Typography>
      <Typography
        sx={{
          width: '1038px',
          fontSize: '14px',
          fontFamily: 'PingFang SC-Medium',
          fontWeight: 500,
          color: '#333333',
          opacity: 0.6
        }}
      >
        Click on ‘Select Award’ to add the Awards you entered. Use the dropdown to select a
        Certificate.Black and White certificates are unlimited.
      </Typography>
      <Button
        sx={{
          marginTop: '20px',
          background: '#B9EC51',
          width: '240px',
          height: '40px',
          borderRadius: '30px',
          color: '#333333',
          fontFamily: 'PingFang SC-Bold'
        }}
        onClick={handleAddLevelData}
      >
        <img src="assets/Config/Config_Program/add@2x.png" alt="Logo" style={{ marginRight: '6px' }} />
        ADD AWARDS LEVELS
      </Button>
      <TableContainer component={Paper} sx={{ backgroundColor: '#FFFFFF' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Units</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Distance to Achieve</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Certificates</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Awards</TableCell>
              <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {levelData.map((row) => (

              <TableRow key={row.id}>
                <TableCell sx={{ backgroundColor: '#F8F8FA', width: '100px', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <Select
                    value={row.unitId}
                    onChange={(e) => handleLevelDataInputChange(row.id, 'unitId', e.target.value)}
                  >
                    {units.map((option) => (
                      <MenuItem key={option.value} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', width: '200px', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <TextField
                    type='number'
                    value={row.name}
                    onChange={(e) => handleAwardsDataInputChange(row.id, 'distance', e.target.value)}
                  />
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <Select
                    value={row.certificate}
                    onChange={(e) => handleLevelDataInputChange(row.id, 'certificate', e.target.value)}
                  >
                    {certificates.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  {row.selectedItemList && row.selectedItemList.map((selecteditem) => (
                    <b style={{
                      backgroundColor: '#FFFFFF',
                    }} >
                      {selecteditem.name}
                      <Button
                        sx={{
                          background: '#B9EC51 ',
                          width: '25px',
                          height: '35px',
                          color: '#333333',
                          fontFamily: 'PingFang SC Regular',
                          fontWeight: 'bold',
                          minWidth: '35px',
                          marginLeft: '8px',
                          marginRight: '8px'
                        }}
                        onClick={() => handleRemoveButton(selecteditem, row.id)}
                      >
                        <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo" />
                      </Button>
                    </b>
                  ))}

                  <Button variant="outlined"
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderBottom: 'none',
                      color: '#000000',
                      borderColor: '#FFFFFF'
                    }}
                    onClick={(e) => handleButtonClick(e)}
                  >
                    Select Award
                  </Button>

                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <List
                    >
                      {row.itemList && row.itemList.map((item) => (
                        <ListItem button key={item.id+row.id} onClick={(e) => {console.log(e.target); handleItemSelect(item, row.id)}}>
                          {item.name}
                        </ListItem>
                      ))}
                    </List>
                  </Popover>
                </TableCell>
                <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                  <Button
                    sx={{
                      background: '#FFFFFF',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      color: '#333333',
                      fontFamily: 'PingFang SC Regular',
                      fontWeight: 'bold',
                      minWidth: '40px'
                    }}
                    onClick={() => handlesaveawardsLevelData(row.id)}
                  >
                    <img width={18} height={18} src="assets/Config/Config_Program/save.png" alt="Logo" />
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
                      minWidth: '40px'
                    }}
                    onClick={() => handleDeleteLevelData(row.id)}
                  >
                    <img width={18} height={18} src="assets/Config/Config_Tracks/ban.png" alt="Logo" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
