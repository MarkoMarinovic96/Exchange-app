import { Header, HeaderDate } from "@/types";

export const sidebarLinks = [
  {
    route: "/tecaj",
    label: "Tecaj",
  },
  {
    route: "/povijest/USD",
    label: "Povijest",
  },
];

export function todayDate() {
  const date = new Date();
  let currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return currentDate;
}

export const headers: Header[] = [
  { id: "drzava", label: "Država", numeric: false },
  { id: "drzava_iso", label: "ISO", numeric: false },
  { id: "kupovni_tecaj", label: "Kupovni Tečaj", numeric: true },
  { id: "prodajni_tecaj", label: "Prodajni Tečaj", numeric: true },
  { id: "sifra_valute", label: "Šifra Valute", numeric: true },
  { id: "srednji_tecaj", label: "Srednji Tečaj", numeric: true },
  { id: "valuta", label: "Valuta", numeric: false },
];
export const headersDate: HeaderDate[] = [
  { label: "Datum primjene" },
  { label: "Broj tečajnice" },
  { label: "Država" },
  { label: "ISO" },
  { label: "Kupovni Tečaj" },
  { label: "Prodajni Tečaj" },
  { label: "Srednji Tečaj" },
  { label: "Valuta" },
];
