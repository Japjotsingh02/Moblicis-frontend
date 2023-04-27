import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Box, CircularProgress, Paper, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const fetchData=async(endPoint,reqBody)=>{
  const response=await axios.post(`${process.env.REACT_APP_BASE_URL}/${endPoint}`,reqBody);

  const data = await response.data;
  console.log(data);
  return data;
};

const Table=({endPoint,reqBody})=> {
    const [DataArray,setDataArray]=useState(null);
    const [IsLoading,setIsLoading]=useState(true);
        
    useEffect(() => {
      async function loadData(){
        try{
          // if(!DataArray){
            const res=await fetchData(endPoint,reqBody);
            setDataArray(res);
            setIsLoading(false);
          // }
        }
        catch(err){
          console.error(err);
        }
      }
      loadData();
    }, []);

    return (
        <TableContainer component={Paper}>
          {IsLoading ?
          <Box
            width={"100%"}
            m='1rem auto'
            display='flex'
            alignItems={"center"}
            justifyContent={"center"}
            height={'80vh'}
          >
            <CircularProgress/>
          </Box>
         :
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                  {/* {Object.keys(DataArray[0]).map((i)=>{
                      console.log(i);
                      return <StyledTableCell>i</StyledTableCell>;
                  })} */}
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                  <StyledTableCell align="right">{row.protein}</StyledTableCell>
                </StyledTableRow>
              ))} */}
            </TableBody>
          </Table>
        }
      </TableContainer>
    );
}

export default Table;