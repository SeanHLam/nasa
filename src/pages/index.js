import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Lottie from "react-lottie";
import { useRouter } from "next/router";
import animationData from "../../src/lotties/spaceLoad.json";

export default function Home() {
  const [data, setData] = useState();
  const apiKey = process.env.NEXT_PUBLIC_KEY
  const url = `https://api.nasa.gov/techtransfer/patent/?q=10&engine&api_key=${apiKey}`;
  const router = useRouter();
  
  const getTechTransferData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    console.log(info);
    setData(info);
  };

  useEffect(() => {
    getTechTransferData();
  },);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="main" />
      <Head>
        <title>NASA API APP</title>
        <meta
          name="description"
          content="A space themed website using API's provided by NASA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="flex justify-center items-center flex-col p-4">
          <div className="text-4xl text-navyBlue-100 font-bold">
            TechTransfer Patents
          </div>
        </div>

        <div className="h-screen flex mb-4  items-center flex-col ">
          <div
            onClick={() => router.push("/polychromatic")}
            className="m-4 w-max p-2 rounded bg-indigo-900 hover:scale-105 transition-all"
          >
            <h3 className="bold pointer-events-none  text-xl text-navyBlue-100">
              POLYCHROMATIC
            </h3>
          </div>
          {data &&
            data.results.map((tech, index) => {
              return (
                <div
                  className="pb-4 flex-wrap justify-center items-center"
                  key={index}
                >
                  {tech &&
                    tech.map((t, ind) => {
                      if (ind === 10) {
                        return (
                          <div key={ind} className="bg-indigo-800 w-80  p-2 flex mb-1 rounded justify-center items-center flex-wrap flex-col hover:scale-105  transition-all">
                            <Image
                              className="rounded"
                              src={t}
                              alt={t}
                              key={ind}
                              width={320}
                              height={320}
                            />
                            <div className=" p-2 flex justify-center flex-col items-center">
                              <p className="text-navyBlue-100 text-center bold text-xl">{tech[1]}</p>
                              <p className="text-navyBlue-100 text-center">{tech[2]}</p>
                            </div>
                          </div>
                        );
                      }
                    })}
                </div>
              );
            })}
        </div>
       
      </main>
    </>
  );
}
