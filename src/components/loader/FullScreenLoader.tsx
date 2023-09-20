import { Box, CircularProgress, styled } from "@mui/material";

import { useTranslation } from "react-i18next";

export function FullScreenLoader() {
  const { t } = useTranslation();
  return (
    <StyledBox>
      <CircularProgress />
      {t("label.loading")}
    </StyledBox>
  );
}

const StyledBox = styled(Box)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;
