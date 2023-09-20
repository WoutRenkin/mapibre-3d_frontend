import { styled } from "@mui/material";
import { MapContent } from "components/map/MapContent";

export function AppPage() {
  return (
    <StyledMain>
      <MapContent />
    </StyledMain>
  );
}

const StyledMain = styled("main")``;
