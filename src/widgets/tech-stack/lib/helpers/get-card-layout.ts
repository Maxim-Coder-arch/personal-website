import { TechStackCardLayout } from "../../model/types";

export const getCardLayout = (id: string): TechStackCardLayout => {
    switch (id) {
        case "1":
            return "card-1";
        case "2":
            return "card-2";
        case "3":
            return "card-3";
        default:
            return "default";
    }
}