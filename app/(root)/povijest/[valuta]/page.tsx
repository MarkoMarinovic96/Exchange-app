"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { format, subDays } from "date-fns";
import { Tecaj } from "@/types";
import { headersDate } from "@/constants";

import tecajApi from "@/api/endpoints/tecaj";
import Loading from "@/app/(root)/loading";
import Chart from "@/components/Chart";

const Datum = ({ params }: { params: { valuta: string; datum: string } }) => {
  const [tecajData, setTecajData] = useState<Tecaj[]>([]);
  const initialDate = params.datum
    ? params.datum.toString()
    : format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useState<string>(initialDate);
  const [days, setDays] = useState<number>(2);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchTecajHistory = async () => {
      try {
        const datumDo = date;
        const datumOd = format(subDays(new Date(datumDo), days), "yyyy-MM-dd");
        const data = await tecajApi.getTecajByRange(datumOd, datumDo);
        setTecajData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTecajHistory();
  }, [params.valuta, date, days]);

  const sortedData = useMemo(() => {
    const filteredData = tecajData.filter(
      (item) => item.valuta === params.valuta
    );
    const uniqueData = Array.from(
      new Map(filteredData.map((item) => [item.broj_tecajnice, item])).values()
    );
    return uniqueData.sort(
      (a, b) =>
        new Date(b.datum_primjene).getTime() -
        new Date(a.datum_primjene).getTime()
    );
  }, [tecajData, params.valuta]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1 || value > 61) {
      setErrorMessage("Broj dana mora biti između 2 i 60.");
      setDays(0);
    } else {
      setErrorMessage("");
      setDays(value);
    }
  };
  const stringToFloat = (value: string) => parseFloat(value.replace(",", "."));
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex size-full flex-col px-1 lg:px-11">
      <div className="flex justify-between items-center py-4">
        <header>
          <h1>Povijest tečaja za valutu: {params.valuta}</h1>
        </header>
        <div className="flex flex-col gap-3">
          {!params.datum && (
            <div className="flex flex-col">
              {" "}
              <p>Odaberite datum</p>
              <Input type="date" value={date} onChange={handleDateChange} />
            </div>
          )}
          <div className="flex flex-col">
            {" "}
            <p>Odaberite broj dana</p>
            <Input
              type="number"
              min="2"
              max="60"
              value={days}
              onChange={handleDaysChange}
              placeholder="Broj dana"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {headersDate.map((item, index) => (
              <TableCell key={index}>{item.label}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => {
            const nextItem = sortedData[index + 1];

            const kupovniColor =
              !nextItem ||
              stringToFloat(item.kupovni_tecaj) ===
                stringToFloat(nextItem.kupovni_tecaj)
                ? "inherit"
                : stringToFloat(item.kupovni_tecaj) >
                  stringToFloat(nextItem.kupovni_tecaj)
                ? "green"
                : "red";
            const prodajniColor =
              !nextItem ||
              stringToFloat(item.prodajni_tecaj) ===
                stringToFloat(nextItem.prodajni_tecaj)
                ? "inherit"
                : stringToFloat(item.prodajni_tecaj) >
                  stringToFloat(nextItem.prodajni_tecaj)
                ? "green"
                : "red";
            const srednjiColor =
              !nextItem ||
              stringToFloat(item.srednji_tecaj) ===
                stringToFloat(nextItem.srednji_tecaj)
                ? "inherit"
                : stringToFloat(item.srednji_tecaj) >
                  stringToFloat(nextItem.srednji_tecaj)
                ? "green"
                : "red";

            return (
              <TableRow key={item.broj_tecajnice}>
                <TableCell>{item.datum_primjene}</TableCell>
                <TableCell>{item.broj_tecajnice}</TableCell>
                <TableCell>{item.drzava}</TableCell>
                <TableCell>{item.drzava_iso}</TableCell>
                <TableCell style={{ color: kupovniColor }}>
                  {item.kupovni_tecaj}
                </TableCell>
                <TableCell style={{ color: prodajniColor }}>
                  {item.prodajni_tecaj}
                </TableCell>
                <TableCell style={{ color: srednjiColor }}>
                  {item.srednji_tecaj}
                </TableCell>
                <TableCell>{item.valuta}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Chart data={sortedData} />
    </div>
  );
};

export default Datum;
