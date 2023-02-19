import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import { useRouter } from "next/router";
import animationData from "../../src/lotties/spaceLoad.json";
import Head from "next/head";

export default function Polychromatic() {
  const [image, setImage] = useState([]);
  const [images, setImages] = useState();
  const [time, setTime] = useState("Loading");
  const [date, setDate] = useState("");
  const [coords, setCoords] = useState({});
  const [index, setIndex] = useState(2);
  
  const router = useRouter();

  const apiKey = process.env.NEXT_PUBLIC_KEY
  const url = `https://epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`;

  const getPolychromaticData = async () => {
    const res = await axios.get(url);
    const info = await res.data;
    setImages([]);

    const caption = info[0].caption;
    const date = info[0].date.split(" ")[0];
    const date_formatted = date.replaceAll("-", "/");
    let times = [];
    let images = [];

    for (let index = 0; index < info.length; index++) {
      let time = info[index].date.split(" ")[1];
      let coords = info[index].centroid_coordinates;
      let imagePath = info[index].image;
      let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imagePath}.png`;
      times.push(time);
      images.push({
        coords: coords,
        image: image,
        time: time,
      });
    }

    setDate(date);
    setImage(images[index].image);
    setImages(images);
    setTime(images[index].time);
    setCoords([images[index].coords.lat, images[index].coords.lon]);
  };

  const rotateRight = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
    console.log(images);
  };

  const rotateLeft = () => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(images.length - 1);
    }
  };

  useEffect(() => {
    getPolychromaticData();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex justify-center items-center flex-col">
        <Head>
        <title>NASA API APP</title>
        <meta name="description" content="A space themed website using API's provided by NASA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="main" />
      <div className="flex justify-center items-center flex-col p-4">
        <div className="text-4xl text-navyBlue-100 font-bold">
          Polychromatic Imaging Camera
        </div>
      </div>

      <div className=" h-screen flex  items-center flex-col ">
        {images ? (
          <>
            <motion.div
              className="flex justify-center items-center flex-col"
              animate={{
                y: [0, 5, 0, -4, 0],
                x: [0, -4, 0, 5, 0],
              }}
              transition={{
                ease: "linear",
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Image
                src={images[index].image}
                alt={images[index].image}
                width={450}
                height={450}
              />
            </motion.div>
            <div></div>
            <div className="text-xl text-navyBlue-100">
              Time Taken: {images[index].time}
            </div>
            <div className=" flex  items-center  ">
              <svg
                onClick={rotateLeft}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12 text-navyBlue-100 hover:scale-95 transition-all"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z"
                  clip-rule="evenodd"
                />
              </svg>
              <div className="text-xl m-2 text-navyBlue-100">
                X: {images[index].coords.lon}
              </div>
              <div className="text-xl m-2 text-navyBlue-100">
                Y: {images[index].coords.lat}
              </div>
              <svg
                onClick={rotateRight}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-12 h-12 text-navyBlue-100 hover:scale-95 transition-all"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </>
        ) : (
          <Lottie options={defaultOptions} height={500} width={400} />
        )}

        <div onClick={() => router.push('/')} className="m-4 w-max p-2 rounded bg-indigo-900 hover:scale-105 transition-all">
          <h3 className="bold pointer-events-none  text-xl text-navyBlue-100">PATENTS</h3>
        </div>
      </div>
    </div>
  );
}
