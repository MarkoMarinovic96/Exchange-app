import React from "react";
import Loading from "./loading";
import { Suspense } from "react";
import Link from "next/link";

const Home = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <section className="flex size-full justify-center items-center gap-6 flex-col px-1 lg:px-11">
        <h1 className="text-xl font-bold">
          Dobrodošli u našu aplikaciju za prikaz tečajeva različitih država
        </h1>
        <p>
          Uživajte u pregledu trenutnih tečajeva i korisnih informacija o
          valutama.
        </p>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/tecaj">
            Pregled tečajeve
        </Link>
      </section>
    </Suspense>
  );
};

export default Home;
