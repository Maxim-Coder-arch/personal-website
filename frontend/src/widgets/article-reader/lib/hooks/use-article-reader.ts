import { useCallback, useState } from "react";

export const useArticleReader = () => {
    const [reading, setReading] = useState(false);

    const enterReading = useCallback(() => setReading(true), []);
    const exitReading = useCallback(() => setReading(false), []);

    return { reading, enterReading, exitReading };
};