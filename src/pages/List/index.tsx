import React, { useMemo, useState, useEffect } from "react";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinnanceCard from "../../components/HistoryFinnanceCard";
import SelectInput from "../../components/SelectInput";
import { Container, Content, Filters } from "./styles";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from '../../utils/formatCurrency';
import formatDate from "../../utils/formatDate";

interface IRouteParams {
  match: {
    params: {
      type: string;
    };
  };
}

//retonos da API false
interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormated: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {
  // estado dos dados da API
  const [data, setData] = useState<IData[]>([]);

  // distingua as cores da entrada e saída e lista tbm
  const { type } = match.params;
  const title = useMemo(() => {
    return type === "entry-balance" ? "Entradas" : "Saídas";
  }, [type]);
  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#F7931B" : "#E44C4E";
  }, [type]);
  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]);

  const months = [
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
  ];
  const years = [
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
  ];

  useEffect(() => {
    const response = listData.map((item) => {
      return {
        id: String(Math.random() * data.length),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)) ,
        frequency: item.frequency,
        dateFormated: formatDate(item.date) ,
        tagColor: item.frequency === 'recorrente' ? "#4E41F0" : "#E44C4E"
      };
    });
    setData(response);
  }, []);

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput options={months} />
        <SelectInput options={years} />
      </ContentHeader>

      <Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>
        <button type="button" className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </Filters>

      <Content>
        {data.map((item) => (
          <HistoryFinnanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormated}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
};

export default List;
