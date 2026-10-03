import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import css from "./pagination.module.css";

interface Props {
  page: number;
  lastPage?: number;
  loading: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  onGoToPage: (page: number) => void;
}

/**
 * Controles de paginación agnósticos al origen de los datos: el contenedor
 * decide qué páginas existen y este componente solo las dibuja.
 */
export const PaginationComponent: React.FC<Props> = (props) => {
  const { page, lastPage, loading, canGoPrev, canGoNext, onGoToPage } = props;
  // La última página solo se ofrece cuando se conoce el total.
  const canGoLast = lastPage !== undefined && page < lastPage;

  const handleGoToLast = () => {
    if (lastPage !== undefined) {
      onGoToPage(lastPage);
    }
  };

  return (
    <Stack direction="row" className={css.container}>
      <Button
        variant="outlined"
        size="small"
        disabled={loading || !canGoPrev}
        onClick={() => onGoToPage(1)}
      >
        « First
      </Button>
      <Button
        variant="outlined"
        size="small"
        disabled={loading || !canGoPrev}
        onClick={() => onGoToPage(page - 1)}
      >
        ‹ Prev
      </Button>
      <Typography className={css.pageInfo}>
        Page {page}
        {lastPage !== undefined ? ` of ${lastPage}` : ""}
      </Typography>
      <Button
        variant="outlined"
        size="small"
        disabled={loading || !canGoNext}
        onClick={() => onGoToPage(page + 1)}
      >
        Next ›
      </Button>
      <Button
        variant="outlined"
        size="small"
        disabled={loading || !canGoLast}
        onClick={handleGoToLast}
      >
        Last »
      </Button>
    </Stack>
  );
};
