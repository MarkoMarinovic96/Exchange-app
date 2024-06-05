export interface Tecaj {
  broj_tecajnice: string;
  datum_primjene: string;
  drzava: string;
  drzava_iso: string;
  kupovni_tecaj: string;
  prodajni_tecaj: string;
  sifra_valute: string;
  srednji_tecaj: string;
  valuta: string;
}

export type TecajList = Tecaj[];

export type Header = {
  id: keyof Tecaj;
  label: string;
  numeric: boolean;
};
export type HeaderDate = {
  label: string;
};
