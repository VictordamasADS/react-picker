import { Box, Typography } from "@mui/material";
import { Events } from "../../../types";
import * as S from "./styles/index";

interface ListEvents {
  events: Events[];
}

export default function ListEvents({ events }: ListEvents) {
  return (
    <S.Container>
      <S.Header>
        <Typography fontSize="1.6rem">Minha agenda</Typography>

        <Typography sx={{ color: "#9c9a9a", fontSize: "0.8rem" }}>
          Selecione um dia no calendário para exibir evento(s) do dia.
        </Typography>
      </S.Header>

      {events?.length ? (
        events.map((event) => (
          <S.Field key={event?.id}>
            <Typography
              sx={{ fontWeight: "600", color: "gray", fontSize: "1.2rem" }}
            >
              {event?.data}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "400", fontSize: "0.8rem" }}>
                {event?.nome}
              </Typography>

              {event?.eventoToday ? (
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "0.7rem",
                    color: "#18FA05",
                  }}
                >
                  Acontece Hoje
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "0.7rem",
                    color: event?.eventoAtrasado ? "#FA1105" : "#9c9a9a",
                  }}
                >
                  {event?.status}
                </Typography>
              )}
            </Box>
          </S.Field>
        ))
      ) : (
        <Typography>Você não possui eventos no momento.</Typography>
      )}
    </S.Container>
  );
}
