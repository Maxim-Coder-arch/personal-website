import { useState } from "react";

export const useNoticeDisclosure = () => {
    const [expanded, setExpanded] = useState(false);

    return { expanded, toggle: () => setExpanded((current) => !current) };
};