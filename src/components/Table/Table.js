import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TableContainer from '@mui/material/TableContainer';
import { Paper, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';

const BASE_URL="https://mobilicis-server.onrender.com/user";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

function Table({endPoint,reqBody}) {
    const [DataArray,setDataArray]=useState([]);
    const fetchData=()=>{
        axios.post(`${BASE_URL}/${endPoint}`,reqBody)
            .then((data)=>{
                setDataArray(data);
            })
            .catch((err)=>{
                alert(err.measssge || err);
            })
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(DataArray);
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
                {Object.keys(DataArray[0]).map((i)=>{
                    console.log(i);
                    return <StyledTableCell>i</StyledTableCell>;
                })}
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
      </TableContainer>
    );
}

export default Table;