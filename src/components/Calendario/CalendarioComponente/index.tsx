import { Box } from "@mui/material";
import Badge from "@mui/material/Badge";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { format, getMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import * as S from "./styles";

interface CalendarioProps {
  setFilters: (value: Object) => void;
  setYearCurrent: (value: number) => void;
  yearCurrent: number;
  eventsOfCalendario: any;
}

const CalendarioComponente = ({
  eventsOfCalendario,
  yearCurrent,
  setYearCurrent,
  setFilters,
}: CalendarioProps) => {
  const [value, setValue] = useState<any | null>(null);
  const [viewEvents, setViewEvents] = useState<number | 0>(
    new Date().getMonth()
  );
  const [typeView, setTypeView] = useState<string>("");

  useEffect(() => {
    setValue(null);
  }, [yearCurrent, viewEvents, typeView]);

  useEffect(() => {
    setFilters((prev: Object) => ({
      ...prev,
      dateSelected: value,
    }));
  }, [value]);

  return (
    <S.Container>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          localeText={{
            previousMonth: "Mês anterior",
            nextMonth: "Próximo mês",
          }}
          slotProps={{
            layout: {
              sx: {
                textTransform: "capitalize",
              },
            },
          }}
          value={value}
          onViewChange={(view: any) => {
            setTypeView(view);
          }}
          onChange={(newValue: any) => {
            setValue(newValue);
          }}
          sx={{
            ".MuiPickersDay-today": {
              backgroundColor: "#dedede",
              border: "none",
            },

            ".Mui-selected": {
              backgroundColor: "rgb(25,118,210)",
            },
          }}
          slots={{
            day: (props) => {
              const eventsOfMonth =
                !props.outsideCurrentMonth &&
                eventsOfCalendario[viewEvents]?.indexOf(
                  props?.day?.getDate()
                ) >= 0;

              let isSelected = false;

              if (value && props?.day) {
                isSelected =
                  !props.outsideCurrentMonth &&
                  format(props?.day, "dd-MM-yyyy") ===
                    format(value, "dd-MM-yyyy")
                    ? true
                    : false;
              }

              if (!props.outsideCurrentMonth) {
                setViewEvents(getMonth(props?.day));
              }

              if (
                new Date(props?.day).getFullYear() &&
                !props.outsideCurrentMonth
              ) {
                setYearCurrent(new Date(props?.day).getFullYear());
              }

              return (
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "flex-end",
                  }}
                >
                  <Badge
                    key={props.day.toString()}
                    overlap="circular"
                    badgeContent={
                      eventsOfMonth && !isSelected ? (
                        <BsDot size={32} color="#1C85BA" />
                      ) : null
                    }
                  >
                    <PickersDay {...props} />
                  </Badge>

                  {isSelected ? (
                    <Box
                      sx={{
                        display: "flex",
                        position: "absolute",
                        top: "-0.2rem",
                        right: "-0.8rem",
                        zIndex: "3",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setValue(null);
                      }}
                    >
                      <AiOutlineClose size={16} cursor="pointer" />
                    </Box>
                  ) : null}
                </Box>
              );
            },
          }}
        />
      </LocalizationProvider>
    </S.Container>
  );
};

export default CalendarioComponente;
