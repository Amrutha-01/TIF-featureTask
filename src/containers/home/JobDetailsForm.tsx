import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect"; // Assuming you have a FormSelect component
import { IJobDetails } from "../../interface/forms";

interface JobDetailsFormProps {
  handleNextTab: () => void;
  handlePrevTab: () => void;
  handleJobDetails: (details: IJobDetails) => void;
  jobDetails: IJobDetails | null; // Added to pass the initial values
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({
  handleNextTab,
  handlePrevTab,
  handleJobDetails,
  jobDetails, // Added to pass the initial values
}) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik<IJobDetails>({
    initialValues: jobDetails || {
      jobTitle: "",
      jobDetails: "",
      jobLocation: "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      handleNextTab();
      handleJobDetails(values);
    },
  });

  useEffect(() => {
    handleJobDetails(values);
  }, [values]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormSelect
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={(name: any, value: any) => setFieldValue(name, value)} // Ensure the formik state updates
          onBlur={handleBlur}
          value={values.jobLocation} // Pass the value from formik
          error={errors.jobLocation}
          touched={touched.jobLocation}
          options={[
            { label: "New York", value: "new_york" },
            { label: "San Francisco", value: "san_francisco" },
            // Add other locations here
          ]}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={handlePrevTab}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
