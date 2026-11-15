import { CreateRepeatedIconsProps, IIcon } from "../../model/types";



export const createRepeatedIcons = (icons: CreateRepeatedIconsProps[]): IIcon[] => {
    const createdIcons: IIcon[] = [];

    icons.forEach(( icon ) => {
        const createdicon: IIcon = {
            id: crypto.randomUUID(),
            svgImage: icon.svgImage,
            pointerLabel: icon.pointerLabel,
        }

        createdIcons.push(createdicon);
    });

    return createdIcons;
}