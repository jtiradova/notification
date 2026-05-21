import { Box } from "@singlestore/fusion/components/layout";
import {
    Pagination,
    PaginationItems,
    PaginationNextButton,
    PaginationPreviousButton,
} from "@singlestore/fusion/components/pagination";

export default {
    title: "Components / Pagination",
};

export function BasicUsage() {
    return (
        <Box>
            <Pagination total={10}>
                <PaginationPreviousButton />
                <PaginationItems />
                <PaginationNextButton />
            </Pagination>
        </Box>
    );
}
