import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const MyChart = ({ data }: any) => {
  const stringToFloat = (value: string) => parseFloat(value.replace(",", "."));

  const chartData = data.map(
    (item: {
      kupovni_tecaj: string;
      prodajni_tecaj: string;
      srednji_tecaj: string;
    }) => ({
      ...item,
      kupovni_tecaj: stringToFloat(item.kupovni_tecaj),
      prodajni_tecaj: stringToFloat(item.prodajni_tecaj),
      srednji_tecaj: stringToFloat(item.srednji_tecaj),
    })
  );

  return (
    <>  
    <h2 className="mt-4">Grafikon tecaja</h2>
      <LineChart className="mt-4" width={450} height={300} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="datum_primjene" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="kupovni_tecaj" stroke="#8884d8" />
      <Line type="monotone" dataKey="prodajni_tecaj" stroke="#82ca9d" />
      <Line type="monotone" dataKey="srednji_tecaj" stroke="#ffc658" />
    </LineChart></>

  );
};

export default MyChart;
