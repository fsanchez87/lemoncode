import React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "@/core";
import { CharacterDetail } from "./rick-morty-detail.vm";
import css from "./rick-morty-detail.module.css";

interface Props {
  character: CharacterDetail | null;
  loading: boolean;
  notFound: boolean;
}

export const RickMortyDetailComponent: React.FC<Props> = (props) => {
  const { character, loading, notFound } = props;

  return (
    <Card className={css.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Hello from Rick & Morty detail page
        </Typography>
        {character ? (
          <Stack spacing={2}>
            <Avatar
              src={character.image}
              alt={character.name}
              className={css.avatar}
            />
            <Typography variant="h6" component="h3">
              {character.name}
            </Typography>
            <Divider />
            <Typography className={css.meta}>Id: {character.id}</Typography>
            <Typography className={css.meta}>
              Status: {character.status}
            </Typography>
            <Typography className={css.meta}>
              Species: {character.species}
            </Typography>
            <Typography className={css.meta}>
              Type: {character.type || "unknown"}
            </Typography>
            <Typography className={css.meta}>
              Gender: {character.gender}
            </Typography>
            <Typography className={css.meta}>
              Origin: {character.origin}
            </Typography>
            <Typography className={css.meta}>
              Location: {character.location}
            </Typography>
            <Typography className={css.meta}>
              Episodes: {character.episodeCount}
            </Typography>
          </Stack>
        ) : (
          !loading &&
          notFound && (
            <Alert severity="warning">No se encuentra el personaje</Alert>
          )
        )}
        <Stack direction="row" className={css.actions}>
          <Button
            component={RouterLink}
            to={routes.rickMorty}
            variant="contained"
            nativeButton={false}
          >
            Back to list page
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
