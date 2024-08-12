import { Box, useMediaQuery, useTheme } from "@mui/material";
import {
  compareAsc,
  compareDesc,
  format,
  formatDistanceStrict,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { itens } from "../../shared";
import { Events, EventsOfYearCalendario } from "../../types";
import CalendarioComponente from "./CalendarioComponente";
import ListEvents from "./ListEvents";

export default function Calendario() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [filters, setFilters] = useState({} as any);
  const [year, setYear] = useState(new Date().getFullYear());
  const [eventsOfCalendario, setEventsOfCalendario] = useState(
    {} as EventsOfYearCalendario
  );
  const [events, setEvents] = useState<Events[]>([]);

  useEffect(() => {
    if (itens?.eventos?.length) {
      let eventsOfYearCurrent: any = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: [],
      };

      const orderEvents = itens?.eventos?.sort((a, b) =>
        compareAsc(new Date(a.data), new Date(b.data))
      );

      const splitForYear = orderEvents.filter(
        (evento) => new Date(evento?.data).getFullYear() === year
      );

      const orderItemsByLatest = splitForYear?.length
        ? splitForYear?.sort((a, b) =>
            compareDesc(new Date(a?.data), new Date(b?.data))
          )
        : [];

      const formatEvents = orderItemsByLatest.map((evento) => {
        const mesEvento = evento?.data ? new Date(evento?.data).getMonth() : 0;
        const diaEvento = evento?.data ? new Date(evento?.data).getDate() : 0;
        eventsOfYearCurrent[mesEvento].push(diaEvento);

        const statusEvento = formatDistanceStrict(
          new Date(evento?.data),
          new Date(),
          {
            locale: ptBR,
            addSuffix: true,
          }
        );

        const eventToday =
          format(new Date(evento?.data), "dd-MM-yyyy") ===
          format(new Date(), "dd-MM-yyyy");

        return {
          ...evento,
          data: new Intl.DateTimeFormat("pt-BR").format(new Date(evento?.data)),
          status: statusEvento,
          eventoAtrasado: statusEvento.includes("há") ? true : false,
          eventoToday: eventToday,
        };
      });

      if (filters?.dateSelected) {
        setEvents(
          formatEvents.filter(
            (event) =>
              event.data ===
              new Intl.DateTimeFormat("pt-BR").format(
                new Date(filters?.dateSelected)
              )
          )
        );
      } else {
        setEvents(formatEvents);
        setEventsOfCalendario(eventsOfYearCurrent);
      }
    }
  }, [filters?.dateSelected, year]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: smDown ? "column" : "row",
        width: smDown ? "35rem" : "70rem",
        height: smDown ? "45rem" : "25rem",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "1rem",
        backgroundColor: "#FFF",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
      }}
    >
      <CalendarioComponente
        setFilters={setFilters}
        setYearCurrent={setYear}
        eventsOfCalendario={eventsOfCalendario}
        yearCurrent={year}
      />
      <ListEvents events={events} />
    </Box>
  );
}
