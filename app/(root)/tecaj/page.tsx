"use client";
import React, { useEffect, useState } from "react";

import { format, addDays, subDays, isAfter } from "date-fns";
import { Tecaj } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableSortLabel,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { tecajApi } from "@/api";
import { headers } from "@/constants";
import Link from "next/link";
import Loading from "../loading";

const Page = () => {
  const [tecajData, setTecajData] = useState<Tecaj[]>([]);
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Tecaj>("drzava");
  const [filter, setFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTecajData = async (selectedDate: string) => {
    try {
      const data = await tecajApi.getAllTecajDatum(selectedDate);
      setTecajData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTecajData(date);
  }, [date]);

  const handleSort = (property: keyof Tecaj) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePrevDate = () => {
    setDate(format(subDays(new Date(date), 1), "yyyy-MM-dd"));
  };

  const handleNextDate = () => {
    setDate(format(addDays(new Date(date), 1), "yyyy-MM-dd"));
  };

  const filteredData = tecajData.filter(
    (item) =>
      item.drzava.toLowerCase().includes(filter.toLowerCase()) ||
      item.drzava_iso.toLowerCase().includes(filter.toLowerCase()) ||
      item.sifra_valute.toLowerCase().includes(filter.toLowerCase()) ||
      item.valuta.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (
      orderBy === "kupovni_tecaj" ||
      orderBy === "prodajni_tecaj" ||
      orderBy === "srednji_tecaj"
    ) {
      return (
        (parseFloat(a[orderBy].replace(",", ".")) <
        parseFloat(b[orderBy].replace(",", "."))
          ? -1
          : 1) * (order === "asc" ? 1 : -1)
      );
    } else {
      return (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1);
    }
  });

  const isFutureDate = isAfter(new Date(date), new Date());
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex size-full flex-col px-1 lg:px-11">
      <div className="flex justify-between	items-center py-4">
        {" "}
        <header className="min-w-[250px] min-h-[50px]">
          <h1>Broj tečajnice: {tecajData[0]?.broj_tecajnice}</h1>
          <h2>Datum primjene: {tecajData[0]?.datum_primjene}</h2>
        </header>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePrevDate}>
              {"<"}
            </Button>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {!isFutureDate && (
              <Button
                variant="outline"
                onClick={handleNextDate}
                disabled={isFutureDate}
              >
                {">"}
              </Button>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Filtriraj tečaj"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isFutureDate ? (
        <div>
          <p>
            Odabrali ste datum koji je veći od današnjeg. Molimo odaberite drugi
            datum.
          </p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((item) => (
                  <TableCell key={item.id}>
                    <TableSortLabel
                      active={orderBy === item.id}
                      direction={orderBy === item.id ? order : "asc"}
                      onClick={() => handleSort(item.id)}
                    >
                      {item.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow key={item.sifra_valute}>
                  <TableCell>{item.drzava}</TableCell>
                  <TableCell>{item.drzava_iso}</TableCell>
                  <TableCell>{item.kupovni_tecaj}</TableCell>
                  <TableCell>{item.prodajni_tecaj}</TableCell>
                  <TableCell>{item.sifra_valute}</TableCell>
                  <TableCell>{item.srednji_tecaj}</TableCell>
                  <TableCell>
                    <Link href={`/povijest/${item.valuta}/${date}`}>
                      <Button variant="outline">{item.valuta}</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Page;
