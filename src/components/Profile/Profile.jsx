import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import nophoto from "../../assets/img/nophoto.gif"
import ApiClient from '../API/ApiClient'



import {
    Grid, FormControlLabel, Checkbox, FormControl, RadioGroup,
    FormLabel, Radio, Typography, InputLabel, MenuItem,
    FormGroup,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '@mui/icons-material';
import Sidebar from '../Sidebar/Sidebar';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const Profile = () => {
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    //   const dispatch = useDispatch();
    const navigate = useNavigate()
    // State to track the current step (1 or 2)
    const [currentStep, setCurrentStep] = useState(1);
    const [filmId, setFilmId] = useState(null); // Store film ID after the POST request
    const [age, setAge] = React.useState('');

    const [selectedFile, setSelectedFile] = useState(null);

    const { getRequestApi, postRequestApi } = ApiClient()
    const [countries, setCountries] = useState([]);
    // const [openDialog, setOpenDialog] = useState(false);

    const handleChangeTitle = (event) => {
        setAge(event.target.value);
    };
    // const handleDialogClose =  () => {
    //     setOpenDialog(false);
    // };


    const [formData, setFormData] = useState({

        title: "",
        first_name: "",
        last_name: "",
        email: "",
        company: "",
        job_title: "",
        address: "",
        city: "",
        zip: "",
        state: "",
        country_id: "",
        phone: "",
        mobile: "",
        website: "",
        gstin: "",
        published_in_market_guide: "",
        activity: "",
        passport_photo: "",

    })
    const preLoadData = async () => {
        const data = await getRequestApi('film/buyer', {});
        setFormData(data.data);
    }

    useEffect(() => {
        preLoadData();
        const loadCountries = async () => {
            try {
                const response = await getRequestApi("site/country", {});
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        loadCountries();
    }, []);


    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));


        errors[name] = "";
        setErrors(errors);
    };


    const validateForm = (values) => {
        const errors = {};



        // if (!values?.title) {
        //     errors.title = 'At least one title is required';
        // }
        let element
        if (!formData.first_name) {
            errors.first_name = "First Name is required"
            element = document.getElementById("first_name");
            if (element) {
                element.focus();
            }
        };
        if (!formData.last_name) {
            errors.last_name = "Last Name is required"
            element = document.getElementById("last_name");
            if (element) {
                element.focus();
            }
        };
        if (!formData.company) {

            errors.company = "Company Name is required"
            element = document.getElementById("company");
            if (element) {
                element.focus();
            }
        };
        if (!formData.job_title) {
            errors.job_title = "Job title is required"
            element = document.getElementById("job_title");
            if (element) {
                element.focus();
            }
        };
        if (!formData.address) {

            errors.address = "Address is required";
            element = document.getElementById("address");
            if (element) {
                element.focus();
            }
        }
        if (!formData.city) {

            errors.city = "City is required";
            element = document.getElementById("city");
            if (element) {
                element.focus();
            }
        }
        if (!formData.state) {

            errors.state = "state is required";
            element = document.getElementById("state");
            if (element) {
                element.focus();
            }
        }
        if (!formData.country_id) {

            errors.country_id = "Country is required";
            element = document.getElementById("country_id");
            if (element) {
                element.focus();
            }
        }
        if (!formData.zip) {

            errors.zip = "Zip code is required";
            element = document.getElementById("zip");
            if (element) {
                element.focus();
            }
        }
        if (!formData.state) {

            errors.state = "State is required";
            element = document.getElementById("state");
            if (element) {
                element.focus();
            }
        }
        if (!formData.phone) {

            errors.phone = "Phone number is required";
            element = document.getElementById("phone");
            if (element) {
                element.focus();
            }
        }
        if (!formData.mobile) {

            errors.mobile = "Mobile is required";
            element = document.getElementById("mobile");
            if (element) {
                element.focus();
            }
        }
        // if (!formData.website) {
        //     errors.website = "Website is required";
        //     element = document.getElementById("website");
        //     if (element) {
        //         element.focus();
        //     }
        // }

        if (!formData.email) {

            errors.email = "Email is required";
            element = document.getElementById("email");
            if (element) {
                element.focus();
            }
        }

        setErrors(errors);


        return Object.keys(errors).length === 0;




        // return errors;
    };


    const [photoUrl, setPhotoUrl] = useState(nophoto);
    const [open, setOpen] = useState(false);
    const [photoInputValue, setPhotoInputValue] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteClick = () => {
        setPhotoUrl(nophoto);
        setPhotoInputValue('');
    };

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPhotoUrl(reader.result);
    //             setPhotoInputValue(file.name);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file); // Store the selected file in state
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoUrl(reader.result); // Set the image preview
                setPhotoInputValue(file.name); // Set the file name
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    // const handleSavePhoto = () => {
    //   if (selectedFile) {
    //     const uploadedPhotoUrl = URL.createObjectURL(selectedFile); // Temporarily use object URL for preview
    //     handleSave(uploadedPhotoUrl); // Pass the uploaded URL to the parent component
    //     handleClose();
    //   }
    // };

    const handleSavePhoto = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/file/upload`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });

                if (response.ok) {
                    const result = await response.json();

                    console.log('File uploaded successfully:', result);
                    if (result.id) {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            passport_photo: result.id,
                        }));
                    }


                    handleClose();
                } else {
                    console.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Error:', error);
            }


            // const uploadedPhotoUrl = URL.createObjectURL(selectedFile);



            // console.log("Saving photo: ", uploadedPhotoUrl);
            // handleClose()
        } else {
            console.log("No file selected");
        }
    };

    const genres = [
        'Buyer',
        'Distributors',
        'Film Festivals',
        'Film Commission',
        'Filming Funds',
        'Film Market',
        'Gap Financiers / Investors',
        'Publicity & Marketing',
        'Production Companies',
        'Sales Agents',
        'Technical',
        'Theatrical Exhibitions',
        'VOD Platform',
        'Others',
    ];

    const title = {
        "1": "Mr",
        "2": "Miss",
        "3": "Smt",
        "4": "Shri"
    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm(formData)) {
            // setOpenDialog(true)
            // alert("pass")
            const response = await postRequestApi(`film/buyer/update`, formData);
            alert("Data saved successfully.")
            navigate(0);
            // if (response?.status && response.data) {


            //     // navigate("/login");
            // } else {
            //     // alert("dd");
            //     //   navigate("404");

            // }
            // Submit the form data here (e.g., API call)
        }
    };



    return (
        <>
            <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                        <div className="col-md-12 px-3 search-sidebar">


                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                <div className=" main-content-space ">
                    <div className='pagetitle-name'><h1>Profile </h1>
                    </div>
                    <div class="update-profile-form card ">
                        <Grid container>
                            <Grid item xs={2} sm={2} md={2} lg={2}>
                            </Grid>
                            <Grid item xs={8} sm={8} md={8} lg={8}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>



                                        {/* <form style={{ maxWidth: '900px', margin: '3rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}> */}
                                        <form onSubmit={handleSubmit}>
                                            <Typography style={{}} variant="h5" gutterBottom>All fields marked in <span style={{ color: "red" }}>'*'</span> are mandatory.</Typography>
                                            <h1 className='mt-4'>Personal Information</h1>
                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={6} sm={6} md={6} lg={6} style={{ display: "flex", alignItems: "center" }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="title-label">Please select title</InputLabel>
                                                        <Select
                                                            labelId="title-label"
                                                            name="title"
                                                            value={formData.title}
                                                            onChange={(event) => {
                                                                handleChange({
                                                                    ...event,
                                                                    target: {
                                                                        ...event.target,
                                                                        value: String(event.target.value), // Convert the single value to a string if needed
                                                                    },
                                                                });
                                                            }}
                                                            label="Please select title"
                                                            renderValue={(selected) => title[selected] || ''}
                                                        >
                                                            {Object.entries(title).map(([id, name]) => (
                                                                <MenuItem key={id} value={id}>
                                                                    {name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>


                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} lg={6}>

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                                            </Grid>

                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="First Name"
                                                        label={
                                                            <span>
                                                                First Name <span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        name="first_name"
                                                        id="first_name"
                                                        value={formData.first_name}
                                                        onChange={handleChange}

                                                    />
                                                    {errors.first_name && (
                                                        <p className="error text-danger">
                                                            {errors.first_name}
                                                        </p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="Last Name"
                                                        label={
                                                            <span>
                                                                Last Name <span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }

                                                        name="last_name"
                                                        value={formData.last_name}
                                                        onChange={handleChange}
                                                        id="last_name"
                                                    />
                                                    {errors.last_name && (
                                                        <p className="error text-danger">
                                                            {errors.last_name}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="Company Name"
                                                        label={
                                                            <span>
                                                                Company Name <span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="text"
                                                        name="company"
                                                        id="company"
                                                        value={formData.company}
                                                        onChange={handleChange}


                                                    />
                                                    {errors.company && (
                                                        <p className="error text-danger">
                                                            {errors.company}
                                                        </p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>

                                                    <TextField
                                                        fullWidth
                                                        // label="Job Title"
                                                        label={
                                                            <span>
                                                                Job Title<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="text"
                                                        name="job_title"
                                                        id="job_title"
                                                        value={formData.job_title}
                                                        onChange={handleChange}
                                                        placeholder="Job Title"

                                                    />
                                                    {errors.job_title && (
                                                        <p className="error text-danger">
                                                            {errors.job_title}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="Address"
                                                        label={
                                                            <span>
                                                                Address<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        name="address"
                                                        id="address"
                                                        value={formData.address}
                                                        onChange={handleChange}
                                                        multiline
                                                        rows={4}

                                                    />
                                                    {errors.address && (
                                                        <p className="error text-danger">
                                                            {errors.address}
                                                        </p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="City"
                                                        label={
                                                            <span>
                                                                City<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        value={formData.city}
                                                        onChange={handleChange}


                                                    />
                                                    {errors.city && (
                                                        <p className="error text-danger">
                                                            {errors.city}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="ZIP"
                                                        label={
                                                            <span>
                                                                ZIP<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="number"
                                                        name="zip"
                                                        id="zip"
                                                        value={formData.zip}
                                                        onChange={handleChange}


                                                    />
                                                    {errors.zip && (
                                                        <p className="error text-danger">
                                                            {errors.zip}
                                                        </p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="State"
                                                        label={
                                                            <span>
                                                                State<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="text"
                                                        id="state"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleChange}


                                                    />
                                                    {errors.state && (
                                                        <p className="error text-danger">
                                                            {errors.state}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>

                                                    <FormControl fullWidth>
                                                        <InputLabel id="countries-label">Please select country <span style={{ color: "red" }}>*</span></InputLabel>
                                                        <Select
                                                            labelId="countries-label"
                                                            name="country_id"
                                                            value={formData.country_id}
                                                            onChange={handleChange}
                                                            id="country_id"
                                                            label="Country"
                                                            renderValue={(selected) => {
                                                                const selectedCountry = countries.find((country) => country.id === selected);
                                                                return selectedCountry ? selectedCountry.name : '';
                                                            }}
                                                        >
                                                            {countries.map((country) => (
                                                                <MenuItem key={country.id} value={country.id}>
                                                                    {country.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>

                                                    </FormControl>

                                                    {errors.country_id && (
                                                        <p className="error text-danger">
                                                            {errors.country_id}
                                                        </p>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="Email"
                                                        id="email"
                                                        label={
                                                            <span>
                                                                Email<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="text"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Email"

                                                    />
                                                    {errors.email && (
                                                        <p className="error text-danger">
                                                            {errors.email}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>


                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="Phone"
                                                        label={
                                                            <span>
                                                                Phone<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="number"
                                                        name="phone"
                                                        id="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Phone"
                                                    />
                                                    {errors.phone && (
                                                        <p className="error text-danger">
                                                            {errors.phone}
                                                        </p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        // label="Mobile"
                                                        label={
                                                            <span>
                                                                Mobile<span style={{ color: 'red' }}>*</span>
                                                            </span>
                                                        }
                                                        type="text"
                                                        name="mobile"
                                                        id="mobile"
                                                        value={formData.mobile}
                                                        onChange={handleChange}
                                                        placeholder="Mobile"
                                                    />
                                                    {errors.mobile && (
                                                        <p className="error text-danger">
                                                            {errors.mobile}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={1} style={{ marginTop: "5px" }}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="Company Website"
                                                        // label={
                                                        //     <span>
                                                        //         Company Website<span style={{ color: 'red' }}>*</span>
                                                        //     </span>
                                                        // }
                                                        type="text"
                                                        name="website"
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                        placeholder="Company Website"
                                                    />
                                                    {errors.website && (
                                                        <p className="error text-danger">
                                                            {errors.website}
                                                        </p>
                                                    )}

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <TextField
                                                        fullWidth
                                                        label="GSTIN"

                                                        type="text"
                                                        name="gstin"
                                                        value={formData.gstin}
                                                        onChange={handleChange}
                                                        placeholder="GSTIN"

                                                    />
                                                    {errors.gstin && (
                                                        <p className="error text-danger">
                                                            {errors.gstin}
                                                        </p>
                                                    )}

                                                </Grid>
                                            </Grid>









                                            <h1 className='mt-4'>Photo</h1>

                                            <p> Photo for catalogues (Size - 2x2 inch, Resolution - 72dpi)</p>
                                            <p> Medium Close up/ Close up photo of yourself in jpg format (no larger than 1024 kb).
                                                Front profile | Individual portrait | Properly exposed colour photograph</p>






                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <div className="form-group">
                                                        <label className="control-label" htmlFor="PHOTO_URL">
                                                            Photo:
                                                        </label>
                                                        <div>
                                                            <div className="container-fluid" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                                                <div className="row">
                                                                    <div className="col-md-12" style={{ paddingRight: '0px' }}>

                                                                        <img
                                                                            width="200px"
                                                                            id="imgPhoto"
                                                                            src={formData?.passport?.url ? `${REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_PREFIX}/file/${formData.passport.url}` : photoUrl}
                                                                            style={{ cursor: "pointer" }}
                                                                            onError={() => {
                                                                                setPhotoUrl('/images/nophoto.gif');
                                                                                setPhotoInputValue('');
                                                                            }}
                                                                            alt="Uploaded"
                                                                            onClick={handleClickOpen}
                                                                        />
                                                                        <br />
                                                                        <div id="myCroppic">

                                                                        </div>

                                                                        <span
                                                                            id="btnUploadPhoto"
                                                                            className="span-link"
                                                                            style={{ marginTop: '10px', display: 'inline-block' }}

                                                                            onClick={handleClickOpen}
                                                                        >
                                                                            UPLOAD
                                                                        </span>


                                                                        <table id="PHOTO_URL_ET" className="dxeValidDynEditorTable" style={{ width: '100%' }}>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style={{ width: '100%' }}>
                                                                                        <input
                                                                                            type="hidden"
                                                                                            name="PHOTO_URL$State"
                                                                                            id="PHOTO_URL_State"
                                                                                            value={'{"validationState": ""}'}
                                                                                        />

                                                                                    </td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>

                                                                        <span className="field-validation-valid text-danger" data-valmsg-for="PHOTO_URL" data-valmsg-replace="true"></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {errors.photo && (
                                                                <p className="error text-danger">
                                                                    {errors.photo}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Grid>
                                            </Grid>




                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                                    <h1 style={{ marginTop: "15px" }}>Market Guide Profile</h1>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <Typography>Do you want your personal information published in the Market Guide? <span style={{ color: "red" }}>*</span></Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <div style={{ display: "flex" }}>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="published_in_market_guide"
                                                                id="published_in_market_guide_no"
                                                                value="0"
                                                                checked={formData.published_in_market_guide === 0 || formData.published_in_market_guide === "0"}
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="published_in_market_guide_no">
                                                                No
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="published_in_market_guide"
                                                                id="published_in_market_guide_yes"
                                                                value="1"
                                                                checked={formData.published_in_market_guide == 1 || formData.published_in_market_guide == "1"}
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="published_in_market_guide_yes">
                                                                Yes
                                                            </label>
                                                        </div>

                                                    </div>

                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <h1>Company Profile</h1>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <ul>
                                                        <li>
                                                            If you are representing <strong>a Company/Organisation/Institution</strong>, please provide a brief description and select the main activity for the same.
                                                        </li>
                                                        <li>If you are <strong>not associated</strong> with a Company/Organisation/Institution, please provide a brief description about your profession and select your main activity.</li>
                                                    </ul>
                                                </Grid>
                                            </Grid>




                                            <Grid container spacing={2}>

                                                <Grid item xs={3} sm={3} md={3} lg={3}>
                                                    <Typography>Profile:</Typography>
                                                    <span><i>(max. 1500 characters</i>)</span>
                                                </Grid>

                                                <Grid item xs={9} sm={9} md={9} lg={9}>
                                                    {/* <Typography variant="h5" gutterBottom>Characters remaining : 1500.</Typography> */}
                                                    <TextField
                                                        fullWidth
                                                        // label="Profile Details"
                                                        name="about_us"
                                                        value={formData.about_us}
                                                        onChange={handleChange}
                                                        multiline
                                                        placeholder="Profile Details"
                                                        rows={8}
                                                        className='custom-label'
                                                    />
                                                </Grid>


                                            </Grid>




                                            {/* <Grid container spacing={2} style={{ marginTop: "15px" }}>
                                        <Grid item xs={2} sm={2} md={2} lg={2} style={{ display: "flex", alignItems: "center" }}>
                                            <label>Activity: <span style={{ color: "red" }}>*</span></label>
                                        </Grid>
                                        <Grid item xs={10} sm={10} md={10} lg={10}>
                                            <FormControl fullWidth>
                                                <InputLabel id="countries-label">Please select</InputLabel>
                                                <Select
                                                    labelId="countries-label"
                                                    name="activity"

                                                    value={formData.activity || []}
                                                    onChange={handleChange}
                                                    label="activity"


                                                >

                                                </Select>

                                            </FormControl>
                                        </Grid>

                                    </Grid> */}





                                            {/* <Grid container spacing={2} style={{ marginTop: "15px" }}>

                                        <Grid item xs={4} sm={4} md={4} lg={4}>

                                            <Typography>What are you looking for at Film Bazaar?
                                            </Typography>
                                        </Grid>




                                        <Grid item xs={8} sm={8} md={8} lg={8} style={{ border: "1px solid black" }}>
                                            <FormControl component="fieldset" fullWidth>

                                                <FormGroup
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr',
                                                        gap: '8px',
                                                    }}
                                                >
                                                    {genres.map((genre) => (
                                                        <FormControlLabel
                                                            key={genre}
                                                            control={<Checkbox />}
                                                            label={genre}
                                                            sx={{
                                                                '& .MuiSvgIcon-root': {
                                                                    
                                                                },
                                                            }}
                                                        />
                                                    ))}
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>

                                    </Grid> */}

                                            <Grid container spacing={2} style={{ marginTop: "15px" }}>
                                                <Grid item xs={4} sm={3} md={3} lg={3}>
                                                </Grid>
                                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                                    <div className="form-group">
                                                        <div>
                                                            <button className="btn btn-primary btn-yellow">Submit</button>
                                                        </div>
                                                    </div>

                                                </Grid>

                                            </Grid>

                                        </form>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                        </Grid>

                        <React.Fragment>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                    Photo Upload
                                </DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleClose}
                                    sx={(theme) => ({
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: theme.palette.grey[500],
                                    })}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        Upload your photo.
                                    </Typography>
                                </DialogContent>
                                <DialogContent dividers>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        CLOSE
                                    </Button>
                                    <Button autoFocus onClick={handleSavePhoto}>
                                        SAVE PHOTO
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                        </React.Fragment>

                        {/* <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
                            <DialogTitle>Are You Sure?</DialogTitle>
                            <DialogContent>
                                Once submitted, the form cannot be edited/resubmitted. Do you want to proceed?
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleDialogClose(false)} color="primary">Cancel</Button>
                                <Button onClick={() => handleDialogClose(true)} color="primary">Proceed</Button>
                            </DialogActions>
                        </Dialog> */}

                    </div>
                </div>
            </main>

        </>


    );
};








export default Profile;
