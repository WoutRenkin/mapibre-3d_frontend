import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  Typography,
  styled,
  CardHeader,
  Avatar,
  alpha,
} from "@mui/material";
import { FallbackProps } from "react-error-boundary";
import JSONPretty from "react-json-pretty";
import axios from "axios";

import { useTranslation } from "react-i18next";

export function GlobalErrorFallBack(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);

  return (
    <StyledCard>
      <CardHeader
        avatar={<Avatar>😕</Avatar>}
        title={
          <Typography variant="h4" component="h1">
            {t("label.somethingWentWrong")}
          </Typography>
        }
        subheader={
          <Typography variant="body1" component="p">
            {t("label.tryAgainAndOtherOptions")}
          </Typography>
        }
      />
      <CardActions>
        <Button onClick={() => resetErrorBoundary()} color="primary">
          {t("label.tryAgain")}
        </Button>
        <Button onClick={() => setExpanded(!expanded)}>
          {t("label.errorDetails")}
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto">
        <CardContent className="error-details">
          {axios.isAxiosError(error) && (
            <JSONPretty data={JSON.stringify(error.response)} />
          )}
          {!axios.isAxiosError(error) && (
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <Typography variant="h5" className="detail-title">
                  {t("label.name")}
                </Typography>
                <JSONPretty data={error.name} />
              </Grid>
              <Grid item>
                <Typography variant="h5" className="detail-title">
                  {t("label.message")}
                </Typography>
                <JSONPretty data={error.message} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" className="detail-title">
                  {t("label.stacktrace")}
                </Typography>
                <JSONPretty data={error.stack} />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing(3, "auto")};
  ${({ theme }) => theme.breakpoints.up("md")} {
    max-width: 70vw;
  }
  ${({ theme }) => theme.breakpoints.up("xs")} {
    max-width: 90vw;
  }

  height: fit-content;
  max-height: calc(100vh - ${({ theme }) => theme.spacing(5)});
  overflow: auto;

  .error-details {
    background-color: ${({ theme }) => alpha(theme.palette.error.main, 0.1)};
    color: ${({ theme }) => theme.palette.error.main};

    & pre {
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
      word-break: break-word;
      white-space: pre-wrap;
      hyphens: auto;
    }
  }
  .detail-title {
    color: ${({ theme }) => alpha(theme.palette.error.main, 0.5)};
  }
`;
