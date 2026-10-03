import React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { PaginationComponent } from "@/common/components";
import { routes } from "@/core";
import { CharacterCollection } from "./rick-morty-list.vm";
import css from "./rick-morty-list.module.css";

interface Props {
  collection: CharacterCollection;
  filter: string;
  onFilterChange: (value: string) => void;
  page: number;
  loading: boolean;
  notFound: boolean;
  onGoToPage: (page: number) => void;
}

export const RickMortyListComponent: React.FC<Props> = (props) => {
  const {
    collection,
    filter,
    onFilterChange,
    page,
    loading,
    notFound,
    onGoToPage,
  } = props;
  const { characters, totalPages } = collection;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Hello from Rick & Morty list page
      </Typography>
      <TextField
        label="Search characters"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        fullWidth
        className={css.searchField}
      />
      <Divider className={css.divider} />
      {characters.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
            className={css.tableContainer}
          >
            <Table size="small" stickyHeader aria-label="Personajes de la serie">
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Species</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {characters.map((character) => (
                  <TableRow key={character.id}>
                    <TableCell>
                      <Avatar
                        src={character.image}
                        alt={character.name}
                        className={css.avatar}
                      />
                    </TableCell>
                    <TableCell>{character.id}</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={routes.rickMortyDetails(character.id)}
                      >
                        {character.name}
                      </Link>
                    </TableCell>
                    <TableCell>{character.status}</TableCell>
                    <TableCell>{character.species}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" className={css.paginationRow}>
            <PaginationComponent
              page={page}
              lastPage={totalPages}
              loading={loading}
              canGoPrev={page > 1}
              canGoNext={page < totalPages}
              onGoToPage={onGoToPage}
            />
          </Stack>
        </>
      ) : (
        !loading && notFound && (
          <Alert severity="warning">No se encuentran personajes</Alert>
        )
      )}
    </>
  );
};
