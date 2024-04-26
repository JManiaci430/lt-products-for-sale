import axios from "axios";
import { useGate } from "effector-react";
import Head from "next/head";
import { Inter } from "next/font/google";

import Layout from "@/components/Layout";
import { AppGate } from "@/model/Products";
import styles from "@/styles/Home.module.css";

import "../model/init";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useGate(AppGate);

  return (
    <>
      <Head>
        <title>Food and Stuff</title>
        <meta name="description" content="Where you can buy all of your food...and most of your stuff!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Layout />
      </main>
    </>
  );
}
