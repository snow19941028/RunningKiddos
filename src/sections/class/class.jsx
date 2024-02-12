
import React, { useState, useEffect } from "react";

import ClassTitle from 'src/sections/class/components/ClassTitle';
import TotalDistance from 'src/sections/class/components/TotalDistance';
import ClassSelector from 'src/sections/class/components/ClassSelector';
import AddMilesButton from 'src/sections/class/components/AddMilesButton';

import CustomTab from "./components/CustomTab";
import {getCourse, getClassSectionPart} from '../../apis/api.classes'
import AddMilesDialog from './components/dialog_components/AddMilesDialog';

export default function Class() {
    const [classData, setClassData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [classTitle, setClassTitle] = useState('');
   /// const [selProgramIndex, setSelProgramIndex] = useState(1)
    const [programId] = useState() 
    const [openAddMilesDialog, setOpenAddMilesDialog] = useState(false);

    const schoolData = JSON.parse(localStorage.getItem('school'));
    const schoolId = schoolData && schoolData.length > 0 ? schoolData[0].id : null;

    useEffect(() => {
        const fetchData = async () => {
          try {

            console.log("response :")

            getClassSectionPart(`Schools/${schoolId}/groups`,
                    {filter: '{"where":{"isClassroom": true}}'}
              )
              .then(res =>{

                setClassData(res.data);
               // setSelProgramIndex(1)
            
                
            }).catch(err => {
                console.log(err)
            });
            
           
            getCourse(`Schools/${schoolId}/courses`)
            .then(res =>{

                setCourseData(res.data);
            })
            .catch(err =>{
                console.log(err)
            });

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [ schoolId]); // Include schoolId in the dependency array

    const handleClassTitleChange = (value) => {
        setClassTitle(classData.filter((row) => row.id === value).at(0).name);
        localStorage.setItem("groupId", value)
    }

    const handleAddMilesClick = () => {
        setOpenAddMilesDialog(true);
    };

    const handleAddMilesDialogClose = () => {
        setOpenAddMilesDialog(false);
    };

    const handleSaveMiles = (selectedOption, input1Value, input2Value) => {
        const newValue = `${selectedOption} - ${input1Value} - ${input2Value}`;
        console.log(newValue);
    };

    return (
        <div 
        style={{
            marginBottom: '20px',
            background: '#FFFFFF',
            borderRadius: '20px',
            opacity: 1,
            flexGrow: 1,
            minHeight: 1,
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '40px'
          }}
        >     
            {courseData !== undefined && courseData.length > 0 && (
                <AddMilesDialog open={openAddMilesDialog} handleClose={handleAddMilesDialogClose} onSave={handleSaveMiles} courseData={courseData} />
            )}
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                <div style={{ width: '70%', display: 'flex', flexDirection: 'row' }}>
                    <ClassSelector classData={classData} handleClassTitleChange={handleClassTitleChange} />
                    <AddMilesButton onClick={handleAddMilesClick} />
                </div>
            </div>
            <div style = {{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <ClassTitle title={classTitle} />
                <TotalDistance distance={16.345} />
            </div>
            <CustomTab progID={programId}/>
        </div>
    );
}