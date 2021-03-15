import React, { useMemo, useState, useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinnanceCard from "../../components/HistoryFinnanceCard";
import SelectInput from "../../components/SelectInput";
import { Container, Content, Filters } from "./styles";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

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
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedFilterFrequency, setSelectedFilterFrequency] = useState([
    "recorrente",
    "eventual",
  ]);

  // distingua as cores da entrada e saída e lista tbm
  const movimentType = match.params.type;
  const pageData = useMemo(() => {
    return movimentType === "entry-balance"
      ? {
          title: "Entradas",
          lineColor: "#4E41F0",
          data: gains,
        }
      : {
          title: "Saídas",
          lineColor: "#E44C4E",
          data: expenses,
        };
  }, [movimentType]);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const { data } = pageData;

    data.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });
    return uniqueYears.map((year) => {
      return {
        value: year,
        label: year,
      };
    });
  }, [pageData]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFilterFrequency.findIndex(
      (item) => item === frequency
    );
    if (alreadySelected >= 0) {
      const filtered = selectedFilterFrequency.filter(
        (item) => item !== frequency
      );
      setSelectedFilterFrequency(filtered);
    } else {
      setSelectedFilterFrequency((prev) => [...prev, frequency]);
    }
  };

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error("invalid month value. Is accept 0 - 24.");
    }
  };
  const handleYearSelected = (year: string) => {
    try {
      const parseMonth = Number(year);
      setYearSelected(parseMonth);
    } catch (error) {
      throw new Error("invalid year value. Is accept 0 - 12.");
    }
  };

  useEffect(() => {
    const { data } = pageData;
    const filteredData = data.filter((item) => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFilterFrequency.includes(item.frequency)
      );
    });

    const formattedData = filteredData.map((item) => {
      return {
        id: uuid_v4(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormated: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
      };
    });

    setData(formattedData);
  }, [
    pageData,
    monthSelected,
    yearSelected,
    data.length,
    selectedFilterFrequency,
  ]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
        <SelectInput
          options={months}
          onChange={(e) => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={(e) => handleYearSelected(e.target.value)}
          defaultValue={yearSelected}
        />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className={`
          tag-filter 
          tag-filter-recurrent
          ${selectedFilterFrequency.includes("recorrente") && "tag-actived"}
          `}
          onClick={() => handleFrequencyClick("recorrente")}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`
          tag-filter 
          tag-filter-eventual
          ${selectedFilterFrequency.includes("eventual") && "tag-actived"}
          `}
          onClick={() => handleFrequencyClick("eventual")}
        >
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
