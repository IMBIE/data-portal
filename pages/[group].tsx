import { Container } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import { MultiForm } from "../components/MultiForm";

import RA_FORM from "../forms/2022/ra.json";
import GMB_FORM from "../forms/2022/gmb.json";
import IOM_FORM from "../forms/2022/iom.json";
import SMB_FORM from "../forms/2022/smb.json";
import GIA_FORM from "../forms/2022/gia.json";
import { useRouter } from "next/router";

export const GROUP_FORMS = {
  "radar-altimetry": RA_FORM,
  gravimetry: GMB_FORM,
  "mass-budget": IOM_FORM,
  "glacial-isostatic-adjustment": GIA_FORM,
  "surface-mass-balance": SMB_FORM,
};

export const SubmitGroupPage: NextPage = () => {
  const router = useRouter();
  const group = router.query.group as string;
  const template = GROUP_FORMS[group];
  return (
    <Layout title="IMBIE Data Portal | New Submission">
      <Container maxW="container.lg">
        <MultiForm pages={template} />
      </Container>
    </Layout>
  );
};

export default SubmitGroupPage;
