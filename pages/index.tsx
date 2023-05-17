import Head from "next/head";
import { useState } from "react";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../page-components/MenuItem/MenuItem";
import { MainTarget } from "../page-components/MainTarget/MainTarget";

function Home(): JSX.Element {
  return (
    <>
      <MainTarget />
      <MenuItem />
    </>
  );
}

export default withLayout(Home);
