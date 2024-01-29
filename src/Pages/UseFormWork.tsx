import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import Datatable from "./Datatable";
import {
  userDetailsSchemaForStep1,
  userDetailsSchemaForStep2,
} from "../Schemas/userDetailsSchema";
import { useDispatch } from "react-redux";
import { useDebounce } from "../Hooks/useDebounce";

const initialValues = {
  name: "",
  mobile: "",
  age: "",
  gender: "",
  idType: "",
  idNumber: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};
const FormComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState(initialValues);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useDispatch();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: initialValues,
  });
  const onSubmit = async (data: any) => {
    try {
      if (currentStep === 0) {
        await userDetailsSchemaForStep1.validate(data, { abortEarly: false });
        setCurrentStep(currentStep + 1);
      } else {
        await userDetailsSchemaForStep2.validate(data, { abortEarly: false });
        dispatch({ type: "add_user", payload: data });
      }
      setError(initialValues);
    } catch (validationErrors: any) {
      const formattedErrors = validationErrors.inner.reduce((acc: any, err: any) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      setError({ ...initialValues, ...formattedErrors });
    }
  };
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleAutoComplete = (e: any) => {
    setValue("country", e.target.textContent);
  };
  const countryName = (url: string, name: string) => {
    url = url + name;
    fetch(url)
      .then((res: any) => res.json())
      .then((res: any) => {
        if (res?.length > 0) {
          const tempOptions: any = [];
          res?.forEach((data: any) => {
            tempOptions.push({ label: data.name.common, id: data.name.common });
          });
          setCountryOptions(tempOptions);
        }
      });
  };
  const searchtext: any = useDebounce(searchText, 500);
  const allListURL = "https://restcountries.com/v3.1/all";
  const searchedURL = `https://restcountries.com/v3.1/name/`;
  useEffect(() => {
    if (searchtext === "") {
      countryName(allListURL, "");
    } else {
      countryName(searchedURL, searchtext);
    }
  }, [searchtext]);
  const steps = ["Personal Details", "Address Details"];
  const genderOptions = ["Male", "Female", "Other"];
  const idTypeOptions = ["Aadhar Card", "PAN Card"];

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Stepper activeStep={currentStep} style={{ marginTop: "20px" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography component="h1" variant="h5" align="center" sx={{ padding: 4 }}>
          {steps[currentStep]}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Page 1 fields */}
            {currentStep === 0 && (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={error.name != ""}
                        helperText={error.name}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Mobile"
                        variant="outlined"
                        fullWidth
                        error={error.mobile != ""}
                        helperText={error.mobile}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ textAlign: "left" }}
                        {...field}
                        label="Gender"
                        select
                        variant="outlined"
                        fullWidth
                        error={error.gender != ""}
                        helperText={error.gender}
                      >
                        {genderOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="age"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Age"
                        variant="outlined"
                        fullWidth
                        error={error.age != ""}
                        helperText={error.age}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="idType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ textAlign: "left" }}
                        {...field}
                        label="Govt Issued Id Name"
                        select
                        variant="outlined"
                        fullWidth
                        error={error.idType != ""}
                        helperText={error.idType}
                      >
                        {idTypeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="idNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Id Number"
                        variant="outlined"
                        fullWidth
                        error={error.idNumber != ""}
                        helperText={error.idNumber}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            {/* Page 2 fields */}
            {currentStep === 1 && (
              <>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="Address" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="City" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label="State" variant="outlined" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="zip"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Pin Code"
                        variant="outlined"
                        fullWidth
                        error={error.zip.length > 6}
                        helperText={error.zip}
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        freeSolo
                        options={countryOptions}
                        onChange={handleAutoComplete}
                        renderInput={(params) => (
                          <TextField
                            onChange={(e) => setSearchText(e.target.value)}
                            {...params}
                            label="Country"
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>

          {/* Navigation buttons */}
          <Grid container justifyContent="flex-end" style={{ marginTop: "20px" }}>
            {currentStep > 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                style={{ marginRight: "10px" }}
              >
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              // <Button variant="contained" type="submit"  color="primary">
              //   Next
              // </Button>
              <Button
                variant="contained"
                onClick={() => setCurrentStep(currentStep + 1)}
                color="primary"
              >
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            )}
          </Grid>
        </form>
      </Paper>
      <Datatable />
    </Container>
  );
};

export default FormComponent;
