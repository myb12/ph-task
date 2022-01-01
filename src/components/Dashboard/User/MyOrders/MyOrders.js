import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f6830d',
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

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:5000/orders')
            .then(res => {
                setOrders(res.data);
            })
    }, [])

    const handlePay = (id) => {
        history.push(`/dashboard/pay/${id}`)
    }

    return (
        <div>
            <TableContainer component={Paper} sx={{ maxWidth: '85vw' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Plan</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders?.map(order => <StyledTableRow key={order._id}>
                                <StyledTableCell component="th" scope="row">
                                    {order.title}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    ${order.price}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Box style={{ display: 'flex' }}>
                                        <Button
                                            sx={{ mr: 1, fontSize: 12 }}
                                            onClick={() => handlePay(order._id)}
                                        >
                                            Pay
                                        </Button>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MyOrders;