import React, { useState } from 'react';
import {

    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import "../../Login/Login.css";
import { MdEmail } from "react-icons/md";
import { FaLock, FaUserAlt } from "react-icons/fa";

const AsLearner = ({ handleOnBlur, handleSignUp, handleImageUpload }) => {
    const [vehicle, setVehicle] = useState('');

    const handleChange = (event) => {
        setVehicle(event.target.value);
        handleOnBlur(event);
    };


    return (
        <form onSubmit={handleSignUp}>

            <TextField
                required
                className="inputFields"
                label="Full Name"
                name="displayName"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaUserAlt />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />

            <TextField
                required
                className="inputFields"
                label="Email address"
                name="email"
                type="email"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <MdEmail />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />

            <TextField
                required
                type="number"
                className="inputFields"
                label="Age"
                name="age"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaUserAlt />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />

            <TextField
                required
                multiline
                maxRows={5}
                className="inputFields"
                label="Address"
                name="address"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaUserAlt />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />

            <TextField
                required
                type="tel"
                className="inputFields"
                label="Phone"
                name="phone"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaUserAlt />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />

            <Box className="inputFields" sx={{ textAlign: 'left', color: '#666666' }}>
                <label htmlFor="file">Profile Picture*</label>
            </Box>
            <TextField
                required
                type="file"
                className="inputFields"
                name="profilePic"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaUserAlt />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 0 }}
                onChange={handleImageUpload}
            />

            <Box className="inputFields" sx={{ textAlign: 'left', color: '#666666' }}>
                <label htmlFor="file">NID Picture*</label>
            </Box>
            <TextField
                required
                type="file"
                className="inputFields"
                name="nid"
                variant="standard"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaUserAlt />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 0 }}
                onChange={handleImageUpload}
            />

            <FormControl variant="standard" className="inputFields">
                <InputLabel id="demo-simple-select-standard-label">Vehicle Type</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={vehicle}
                    onChange={handleChange}
                    label="Vehicle"
                    sx={{ textAlign: 'left' }}
                    name="vehicleType"

                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Car'}>Car</MenuItem>
                    <MenuItem value={'Bike'}>Bike</MenuItem>
                </Select>
            </FormControl>


            <TextField
                required
                type="password"
                className="inputFields"
                label="Password"
                variant="standard"
                name="password"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaLock />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />

            <TextField
                required
                type="password"
                className="inputFields"
                label="Confirm Password"
                variant="standard"
                name="confirmPassword"
                InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <FaLock />
                        </InputAdornment>
                    )
                }}
                sx={{ mt: 2 }}
                onBlur={handleOnBlur}
            />
            <Button type="submit" className="inputFields btn-regular" sx={{ mt: 2 }}>
                Register
            </Button>
        </form>
    );
};

export default AsLearner;