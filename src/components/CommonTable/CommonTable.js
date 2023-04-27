import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Box, CircularProgress, Paper, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses,Table } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
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

const CommonTable=(props)=> {
    const [DataArray,setDataArray]=useState(null);
    const [IsLoading,setIsLoading]=useState(true);
    const notAcceptedValues=["_id","id","createdAt","updatedAt","__v"];
    
    const fetchData=async()=>{
        setIsLoading(true);
        await axios.post(`${process.env.REACT_APP_BASE_URL}/${props.endPoint}`,props.reqBody)
        .then((data)=>{
          setDataArray(data.data.data);
          // console.log(data);
          setIsLoading(false);
        })
        .catch((err)=>{
          console.log(err);
          setIsLoading(false);
        })
    };
        
    useEffect(() => {
      fetchData();
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
            <TableHead sx={{textTransform:'capitalize'}}>
              <TableRow>
                {Object.keys(DataArray[0]).filter((val)=>{
                  return !notAcceptedValues.includes(val);
                })
                  .map((i)=>{
                      return <StyledTableCell>{i}</StyledTableCell>;
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                DataArray.map((row)=>{
                  return(
                    <StyledTableRow key={row.id}>
                      {Object.values(Object.keys(row)
                        .reduce(function(r,e){
                          if (!notAcceptedValues.includes(e)) r[e] = row[e]
                          else if(props.reqBody==="Top10Cities" && e==="_id") r[e] = row[e]
                                return r;
                        }, {}))
                        .map((value)=>(
                          <StyledTableCell>{value}</StyledTableCell>
                        ))
                      }
                  </StyledTableRow>
                )})
              }
            </TableBody>
          </Table>
          }
        </TableContainer>
    );
}

export default CommonTable;