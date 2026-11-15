import { TechStackCardLayout } from "../../model/types";

export const getCardLayout = (id: string): TechStackCardLayout => {
    switch (id) {
        case "frontend":
            return "card-1";
        case "backend":
            return "card-2";
        case "tools":
            return "card-3";
        default:
            return "default";
    }
}