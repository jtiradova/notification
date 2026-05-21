import { Box } from "@singlestore/fusion/components/layout";
import { useLocalStorage } from "@singlestore/fusion/react-utils/use-local-storage";

export default {
    title: "Utilities / useLocalStorage",
};

export const BasicUsage = () => {
    const [value, setValue] = useLocalStorage(
        "fusion-use-local-storage-basic-usage-story",
        ""
    );

    return (
        <Box>
            <label htmlFor="basic-usage-input__field">Persistent input</label>
            <input
                id="basic-usage-input__field"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <p id="basic-usage-input__helper-text">
                This input's value will persist across page reloads and browser
                sessions, because it is stored in local storage.
                <br /> Try it by changing the input value and opening this story
                in a new tab!
            </p>
        </Box>
    );
};
