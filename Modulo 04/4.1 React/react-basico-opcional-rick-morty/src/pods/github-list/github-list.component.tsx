import React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
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
import { MemberCollection, perPageOptions } from "./github-list.vm";
import css from "./github-list.module.css";

interface Props {
  collection: MemberCollection;
  filter: string;
  onFilterChange: (value: string) => void;
  page: number;
  perPage: number;
  onPerPageChange: (value: number) => void;
  loading: boolean;
  notFound: boolean;
  onGoToPage: (page: number) => void;
}

export const GithubListComponent: React.FC<Props> = (props) => {
  const {
    collection,
    filter,
    onFilterChange,
    page,
    perPage,
    onPerPageChange,
    loading,
    notFound,
    onGoToPage,
  } = props;
  const { members, lastPage, canGoPrev, canGoNext } = collection;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Hello from List page
      </Typography>
      <TextField
        label="Search members"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        fullWidth
        className={css.searchField}
      />
      <Divider className={css.divider} />
      {members.length > 0 ? (
        <>
          <TableContainer
            component={Paper}
            variant="outlined"
            className={css.tableContainer}
          >
            <Table
              size="small"
              stickyHeader
              aria-label="Miembros de la organización"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Avatar
                        src={member.avatar_url}
                        alt={member.login}
                        className={css.avatar}
                      />
                    </TableCell>
                    <TableCell>{member.id}</TableCell>
                    <TableCell>
                      <Link
                        component={RouterLink}
                        to={routes.details(member.login)}
                      >
                        {member.login}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            className={css.paginationRow}
          >
            <PaginationComponent
              page={page}
              lastPage={lastPage}
              loading={loading}
              canGoPrev={canGoPrev}
              canGoNext={canGoNext}
              onGoToPage={onGoToPage}
            />
            <TextField
              select
              size="small"
              label="Per page"
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className={css.perPageField}
            >
              {perPageOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </>
      ) : (
        !loading && notFound && (
          <Alert severity="warning">No se encuentra la organización</Alert>
        )
      )}
      <Stack direction="row" className={css.actions}>
        {/* Ruta del ejercicio original: apunta al detalle sin id. */}
        <Button component={RouterLink} to="/detail" nativeButton={false}>
          Navigate to detail page
        </Button>
      </Stack>
    </>
  );
};
