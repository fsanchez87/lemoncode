import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { routes } from "@/core";
import { GithubMemberDetail } from "./github-detail.vm";
import css from "./github-detail.module.css";

interface Props {
  detail: GithubMemberDetail;
}

export const GithubDetailComponent: React.FC<Props> = (props) => {
  const { detail } = props;

  return (
    <Card className={css.card}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Hello from Detail page
        </Typography>
        <Typography variant="h6" component="h3" className={css.userId}>
          User Id: {detail.id}
        </Typography>
        <Button
          component={RouterLink}
          to={routes.list}
          variant="contained"
          nativeButton={false}
        >
          Back to list page
        </Button>
      </CardContent>
    </Card>
  );
};
