import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({}) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#E5E5E5",
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha("#445861", ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha("#445861", ODD_OPACITY + 0.2),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha("#445861", ODD_OPACITY + 0.4),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha("#445861", ODD_OPACITY + 0.2),
        },
      },
    },
  },
}));

export default StripedDataGrid;
