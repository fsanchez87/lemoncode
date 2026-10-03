import React from "react";
import { RickMortyDetailComponent } from "./rick-morty-detail.component";
import { getCharacterDetail } from "./rick-morty-detail.repository";
import { CharacterDetail } from "./rick-morty-detail.vm";

interface Props {
  id: string;
}

export const RickMortyDetailContainer: React.FC<Props> = (props) => {
  const { id } = props;
  const [character, setCharacter] = React.useState<CharacterDetail | null>(
    null
  );
  const [loading, setLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;

    setLoading(true);

    getCharacterDetail(id)
      .then((characterDetail) => {
        if (ignore) {
          return;
        }

        setCharacter(characterDetail);
        setNotFound(false);
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
    <RickMortyDetailComponent
      character={character}
      loading={loading}
      notFound={notFound}
    />
  );
};
