import { Table, TableRow ,Checkbox,TableHead,TableCell,TableBody,TableContainer} from '@mui/material';

const sessionDatas = [
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
  { date: 'December 18', start:'2:52PM', end: '2:52PM', device: 'emulator' },
];

export default function SelectSessionStep(){

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  
  return (
    <TableContainer  sx={{ backgroundColor: '#FFFFFF', maxHeight: '400px'}}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Date</TableCell>
          <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Start</TableCell>
          <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>End</TableCell>
          <TableCell sx={{ backgroundColor: '#FFFFFF', borderBottom: 'none' }}>Device</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sessionDatas.map((row) => (
          <TableRow key={row.id}>
            <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                {row.date}
            </TableCell>
            <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                {row.start}
            </TableCell>
            <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                {row.end}
            </TableCell>
            <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
                {row.device}
            </TableCell>
            <TableCell sx={{ backgroundColor: '#F8F8FA', borderWidth: '10px', borderColor: '#FFFFFF', paddingTop: '2px', paddingBottom: '2px' }}>
              <Checkbox {...label} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  
  );
}