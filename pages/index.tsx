import { Button, ButtonGroup, Container, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";

export const PAGES = {
  "Radar Altimetry": "/radar-altimetry",
  Gravimetry: "/gravimetry",
  "Mass Budget": "/mass-budget",
  "Glacial Isostatic Adjustment": "/glacial-isostatic-adjustment",
  "Suface Mass Balance": "/surface-mass-balance",
};

export const SubmitIndexPage: NextPage = ({}) => {
  const links = Object.keys(PAGES).map((label) => {
    return { label, href: PAGES[label] };
  });
  return (
    <Layout title="IMBIE | New Submission">
      <Container maxW="container.xl">
        <Container mb="2rem">
          <Heading>New Submission</Heading>
          You have not yet submitted any data to IMBIE-3 2022 assessment. In
          order to participate, you must answer a short questionnaire and upload
          the data you wish to contribute. To begin the submission
          questionnaire, please click here:
        </Container>
        <ButtonGroup justifyContent="center" w="full">
          {links.map((item, index) => (
            <Button key={index}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </ButtonGroup>
      </Container>
    </Layout>
  );
};

export default SubmitIndexPage;
