import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const Icon = () =>
    new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    background: "#0f0f0f",
                    color: "rgb(237,237,150)",
                    fontSize: 24,
                    fontWeight: 800,
                    borderRadius: 8,
                }}
            >
                M
            </div>
        ),
        size,
    );

export default Icon;