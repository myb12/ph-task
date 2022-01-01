import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Button, Checkbox, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../../../hooks/useAuth';
import { BiSearchAlt } from 'react-icons/bi';
import { IoMdArrowDropright, IoMdArrowDropleft } from 'react-icons/io';
import axios from "axios";




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


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ManageAllUsers = () => {
    const { allUsers } = useAuth();
    const [paginatedUsers, setPaginatedUsers] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [message, setMessagge] = useState('');
    const [page, setPage] = useState(0);
    const size = 10;
    const numOfPage = Math.ceil(allUsers.length / size);

    useEffect(() => {
        axios.get(`http://localhost:5000/paginatedUsers?page=${page}&&size=${size}`)
            .then(res => {
                setPaginatedUsers(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [page]);


    useEffect(() => {
        if (searchText === '') return;
        setFilteredUser(() =>
            paginatedUsers.filter((user) =>
                user.displayName.toLowerCase().match(searchText.toLowerCase()) ||
                user.email.toLowerCase().match(searchText.toLowerCase()) ||
                user.phone.toLowerCase().match(searchText.toLowerCase())
            )
        );
    }, [searchText, paginatedUsers]);

    useEffect(() => {
        setFilteredUser(paginatedUsers);
    }, [paginatedUsers, page])

    const handleChecked = (e) => {
        console.log(e.target.checked);
    }
    const handleFilter = (e) => {
        setSearchText(e.target.value);
    }

    const handleAgeRange = (event) => {

        setAgeRange(event.target.value);
        if (!event.target.value) {
            setFilteredUser(paginatedUsers);
            setMessagge('');
            return;
        }

        const rangeArray = event.target.value.split('-');
        const fromAge = +rangeArray[0];
        const toAge = +rangeArray[1];
        const filtered = paginatedUsers.filter(user => +user.age >= fromAge && +user.age <= toAge);

        if (!filtered.length) {
            setMessagge('No user found between the age range');
            setFilteredUser([]);
        } else {
            setFilteredUser(filtered);
            setMessagge('');
        }
    };

    // Pagination handlers 

    const handleNext = () => {
        if (page === numOfPage) return;
        setPage(page + 1);
    }

    const handlePrevious = () => {
        if (page === 0) return;
        setPage(page - 1);
    }
    console.log(numOfPage);

    return (
        <>

            <Box>
                <TextField
                    label="Search by name, email or phone"
                    name="displayName"
                    InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                            <InputAdornment position="end">
                                <BiSearchAlt />
                            </InputAdornment>
                        )
                    }}
                    sx={{ my: 2, width: 300 }}
                    onChange={handleFilter}
                />
            </Box>
            <FormControl sx={{ my: 2, width: 300 }}>
                <InputLabel id="demo-simple-select-standard-label">Filter by age</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={ageRange}
                    onChange={handleAgeRange}
                    label="Age range"
                    sx={{ textAlign: 'left' }}
                    name="ageRange"

                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'18-25'}>18-25</MenuItem>
                    <MenuItem value={'26-30'}>26-30</MenuItem>
                    <MenuItem value={'31-40'}>31-40</MenuItem>
                    <MenuItem value={'41-50'}>41-50</MenuItem>
                </Select>
            </FormControl>
            <TableContainer component={Paper} sx={{ maxWidth: '85vw' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Select</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell>Phone</StyledTableCell>
                            <StyledTableCell align="left">Age</StyledTableCell>
                            <StyledTableCell align="left">Type</StyledTableCell>
                            <StyledTableCell align="left">Image</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* table data for my orders  */}
                        {
                            filteredUser?.map(user => <StyledTableRow key={user._id}>
                                <StyledTableCell component="th" scope="row">
                                    <Checkbox {...label} onChange={handleChecked} />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {user.displayName}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {user.email}
                                </StyledTableCell>
                                <StyledTableCell align="left" >
                                    {user.phone}
                                </StyledTableCell>
                                <StyledTableCell align="left" >
                                    {user.age}
                                </StyledTableCell>
                                <StyledTableCell align="left" >
                                    {user.userType}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <img height="60" width="60" src={user.profilePic} alt="" />
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Box style={{ display: 'flex' }}>
                                        <Button sx={{ mr: 1, fontSize: 12 }}>Block</Button>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </StyledTableCell>
                            </StyledTableRow>)
                        }
                    </TableBody>
                </Table>
                {
                    message && <Alert severity="error" sx={{ mt: 2, justifyContent: 'center' }}>{message}</Alert>
                }
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                {
                    `Page ${page + 1} of ${numOfPage}`
                }
                <Button variant="outlined" onClick={handlePrevious} disabled={page === 0} sx={{
                    mx: 1
                }}>
                    <IoMdArrowDropleft style={{ fontSize: 30 }
                    } />
                </Button>
                <Button variant="outlined" onClick={handleNext} disabled={page === numOfPage - 1}>
                    <IoMdArrowDropright style={{ fontSize: 30 }} />
                </Button>
            </Box>
        </>
    );
};

export default ManageAllUsers;