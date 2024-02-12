import * as React from 'react';
import { useState, useEffect } from 'react';

import Text from '../Text';
// import ProgramRow from './ProgramRow';
import AddProgram from './AddProgram';
import TextSmall from '../Text_small';
import ProgramTable from './ProgramTable';
import ArchivedPrograms from './ArchivedPrograms';
import {addProgram,getPrograms,saveProgram,deleteProgram} from '../../../../apis/api.config'
// import ArchivedPrograms from './ArchivedPrograms';

export function Program() {
  const [programData, setProgramData] = useState([]);

  const schoolid                      = JSON.parse(localStorage.getItem('school'))[0].id;

  useEffect(() => {
    const fetchData = async () => {
      try {

        getPrograms(`Schools/${schoolid}/sessions`)
        .then(res =>{
          setProgramData(res.data)
        });
        
 
      } catch (error) {

        console.error('Error fetching data:', error);
        
      }
    };
  
    fetchData();
  }, [schoolid]);

  const handleAddProgram = async () => {
    
    const data = {
      "name":'Mile',
      "schoolId":schoolid,
      "startDate":new Date().toISOString().split('T')[0],
      "endDate":new Date().toISOString().split('T')[0],
      "createDate":new Date().toISOString().split('T')[0],
      "createUserId":localStorage.getItem('userid')
    }
    try {
      const response = await addProgram(`sessions/initializeNewSession`, data);
      console.log(response.data)
      const newId = response.data.id;
  
      setProgramData([...programData, { id: newId, name: data.name, start: data.startDate, end: data.endDate, isArchived: false }]);
    } catch (error) {
      // Handle error, e.g., show an alert
      alert(`Error adding program: ${  error.message}`);
    }

  };

  const handleSaved = async (selectedData) => {

    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": false,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }
    
    try{

      saveProgram(`sessions`,data);

    }catch(error){
        console.log("error :")
        console.log(error)
    }
    
    // Handle delete action  
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'isArchived': false } : row
    );
  
    setProgramData(newList);

  };

  const handleAchievedSaved = async (selectedData) =>{
    
    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": true,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }

    saveProgram(`sessions`, data );
    // Handle delete action  
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'name': selectedData.name } : row
    );

    setProgramData(newList);

  };

  const handleAchieved = async (selectedData) => {

    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": true,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }

    saveProgram(`sessions`,data);
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'isArchived': true } : row
    );
    setProgramData(newList);

  };

  const handleUnachieved = async (selectedData) => {
  
    const data = {
      "name": selectedData.name,
      "schoolId": selectedData.schoolId,
      "startDate": selectedData.startDate,
      "endDate": selectedData.endDate,
      "createDate": selectedData.createDate,
      "createUserId": selectedData.createUserId,
      "updateDate": selectedData.updateDate,
      "updateUserId": selectedData.updateUserId,
      "isConfigured": selectedData.isConfigured,
      "isArchived": false,
      "useCards": selectedData.useCards,
      "deactivateDate": selectedData.deactivateDate,
      "hasCopiedMileage": selectedData.hasCopiedMileage,
      "sourceProgram": selectedData.sourceProgram,
      "id": selectedData.id
    }

    saveProgram(`sessions`,data);
    const newList = programData.map((row) =>
      row.id === selectedData.id ? { ...row, 'isArchived': false } : row
    );
    setProgramData(newList);

  };

  const handleDelete = async (id) => {
    deleteProgram(`sessions/${id}`);

    const updateTableData = programData.filter((row) => row.id !== id);
    setProgramData(updateTableData);
  };

  const handleInputChange = (id, field, value) => {
    const updatedRows = programData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setProgramData(updatedRows);
  };

  return (
    <div style={{ paddingTop: '46px' }}>
      <Text t='Program' s='40px' />
      <TextSmall mt={4} mb={5} children='To create a program, simply give it a name and provide dates for the period of time in which data will be collected.
        (Sample names: Noon Hour Mileage Club or Morning Miles.) Program names and dates may be changed at a later time.' />
      <AddProgram handleAddProgram={handleAddProgram} />
      <ProgramTable programData={programData} handleInputChange={handleInputChange} handleSaved={handleSaved} handleAchieved={handleAchieved} handleDelete={handleDelete} />
      <Text t='Archieved Programs' s='40px' />
      <TextSmall mt={4} mb={5} children='Archived Programs are preserved records of past data.
        Archived data is not editable - you cannot scan, change, or delete data. Contact support if you need to make changes.' />
      <ArchivedPrograms programData={programData} handleInputChange={handleInputChange} handleAchievedSaved={handleAchievedSaved} handleUnachieved={handleUnachieved} />
    </div>
  );
}
