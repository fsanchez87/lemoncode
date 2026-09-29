import React from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useParams } from "react-router-dom";

interface CharacterEntity {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  image: string;
  episode: string[];
}

export const RickMortyDetailPage: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = React.useState<CharacterEntity | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);

    // El endpoint devuelve un único personaje a partir de su id.
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        if (!response.ok) {
          // Un id inexistente provoca un 404 en la API.
          return { ok: false, data: null };
        }

        return { ok: true, data: response.json() };
      })
      .then(async ({ ok, data }) => {
        if (ignore) {
          return;
        }

        setCharacter(ok ? await data : null);
        setNotFound(!ok);
        setLoading(false);
      })
      .catch(() => {
        if (ignore) {
          return;
        }

        setCharacter(null);
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      // Evita que una respuesta anterior sobrescriba el resultado más reciente.
      ignore = true;
    };
  }, [id]);

  return (
    <Card sx={{ maxWidth: 480 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Hello from Rick & Morty detail page
        </Typography>
        {character ? (
          <Stack spacing={2}>
            <Avatar
              src={character.image}
              alt={character.name}
              sx={{ width: 160, height: 160 }}
            />
            <Typography variant="h6" component="h3">
              {character.name}
            </Typography>
            <Divider />
            <Typography sx={{ color: "text.secondary" }}>
              Id: {character.id}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Status: {character.status}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Species: {character.species}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Type: {character.type || "unknown"}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Gender: {character.gender}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Origin: {character.origin.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Location: {character.location.name}
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Episodes: {character.episode.length}
            </Typography>
          </Stack>
        ) : (
          !loading && notFound && <Alert severity="warning">No se encuentra el personaje</Alert>
        )}
        <Stack direction="row" sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to="/rick-morty"
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
