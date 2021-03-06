import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Container,
  ChartContainer,
  Header,
  LegendContainer,
  Legend,
} from "./styles";

import formatCurrency from '../../utils/formatCurrency'

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutPut: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutPut: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutPut,
}) =>  (
    <Container>
      <Header>
        <h2>Histórico de Saldo</h2>
        <LegendContainer>
          <Legend color={lineColorAmountEntry}>
            <div>{}</div>
            <span>Entradas</span>
          </Legend>
          <Legend color={lineColorAmountOutPut}>
            <div>{}</div>
            <span>Saídas</span>
          </Legend>
        </LegendContainer>
      </Header>

      <ChartContainer>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
            <XAxis dataKey="month" stroke="#Cecece" />
            <Tooltip formatter={ formatCurrency } />
            <Line
              type="monotone"
              dataKey="amountEntry"
              name="Entradas"
              stroke={lineColorAmountEntry}
              strokeWidth={5}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="amountOutPut"
              name="Saídas"
              stroke={lineColorAmountOutPut}
              strokeWidth={5}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );

export default HistoryBox;
