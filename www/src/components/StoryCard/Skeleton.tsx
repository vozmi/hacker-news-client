import { Skeleton as MuiSkeleton } from "@mui/material";

export const Skeleton = () => {
    return (
        <MuiSkeleton
            aria-label="skeleton"
            aria-busy="true"
            aria-live="polite"
            variant="rounded"
            sx={{ maxWidth: 500, width: "100%", height: 76 }}
        />
    );
};
