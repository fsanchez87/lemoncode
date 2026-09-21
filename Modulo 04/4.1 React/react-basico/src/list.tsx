import React from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useFilterContext } from "./filter.context";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const { filter, setFilter } = useFilterContext();
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

  const debouncedFilter = useDebounce(filter, 500);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${debouncedFilter}/members`)
      .then((response) => (response.ok ? response.json() : []))
      .then((json) => setMembers(Array.isArray(json) ? json : []))
      .catch(() => setMembers([]));
  }, [debouncedFilter]);

  return (
    <>
      <h2>Hello from List page</h2>
      <label>
        Search members:
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
        />
      </label>
      <hr />
      {members.length > 0 ? (
        <div className="list-user-list-container">
          <span className="list-header">Avatar</span>
          <span className="list-header">Id</span>
          <span className="list-header">Name</span>
          {members.map((member) => (
            <React.Fragment key={member.id}>
              <img src={member.avatar_url} />
              <span>{member.id}</span>
              <Link to={`/detail/${member.login}`}>{member.login}</Link>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>No se encuentra la organización</p>
      )}
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
