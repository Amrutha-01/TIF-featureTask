import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  TabProps,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionForm from "./RequisitionDetailsForm";
import PreviewCard from "./PreviewCard";
import {
  IInterviewSettingsValues,
  IJobDetails,
  IRequisitionDetails,
} from "@src/interface/forms";

const CustomTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Tab p="1rem" fontFamily="Poppins" {...props}>
      {children}
    </Tab>
  );
};

const HomeLayout = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [requistionDetails, setRequistionDetails] =
    useState<IRequisitionDetails | null>(null);
  const [jobDetails, setJobDetails] = useState<IJobDetails | null>(null);
  const [interviewDetails, setInterviewDetails] =
    useState<IInterviewSettingsValues | null>(null);

  const handleNextTab = () => {
    setTabIndex((prev) => {
      return prev + 1;
    });
  };
  const handlePrevTab = () => {
    setTabIndex((prev) => {
      return prev - 1;
    });
  };
  const handleRequistionDetails = (details: IRequisitionDetails) => {
    setRequistionDetails(details);
  };
  const handleJobDetails = (details: IJobDetails) => {
    setJobDetails(details);
  };
  const handleInterviewDetails = (details: IInterviewSettingsValues) => {
    setInterviewDetails(details);
  };

  useEffect(() => {}, [tabIndex]);
  console.log(requistionDetails);
  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs
          index={tabIndex}
          onChange={(index: number) => setTabIndex(index)}
          isLazy
        >
          <TabList>
            <CustomTab>Requistion Details</CustomTab>
            <CustomTab isDisabled={tabIndex < 1}>Job Details</CustomTab>
            <CustomTab isDisabled={tabIndex < 2}>Interview Settings</CustomTab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionForm
                  handleNextTab={handleNextTab}
                  handleRequisitionDetails={handleRequistionDetails}
                  requistionDetails={requistionDetails}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleNextTab={handleNextTab}
                  handleJobDetails={handleJobDetails}
                  handlePrevTab={handlePrevTab}
                  jobDetails={jobDetails}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handleInterviewDetails={handleInterviewDetails}
                  handlePrevTab={handlePrevTab}
                />
              </TabPanel>
            </TabPanels>
            <PreviewCard
              requisitionDetails={requistionDetails}
              jobDetails={jobDetails}
              interviewDetails={interviewDetails}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
