import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useParams } from "react-router-dom";

export const DetailPage: React.FC = () => {
  const {id} = useParams();

  return (
    <Card sx={{ maxWidth: 480 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Hello from Detail page
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{ color: "text.secondary", mb: 2 }}
        >
          User Id: {id}
        </Typography>
        <Button
          component={RouterLink}
          to="/list"
          variant="contained"
          nativeButton={false}
        >
          Back to list page
        </Button>
      </CardContent>
    </Card>
  );
};
