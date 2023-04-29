import { Skeleton as MuiSkeleton, SkeletonTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/types";

export const Skeleton: OverridableComponent<
    // eslint-disable-next-line @typescript-eslint/ban-types
    SkeletonTypeMap<{}, "span">
> = () => {
    return (
        <MuiSkeleton
            aria-label="skeleton"
            aria-busy="true"
            aria-live="polite"
            variant="rounded"
            sx={{ minWidth: 200, maxWidth: 500, width: "100%", height: 76 }}
        />
    );
};
