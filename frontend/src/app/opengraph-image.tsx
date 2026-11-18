import { ImageResponse } from "next/og";

export const alt = "Maxim Novikov — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OpengraphImage = () =>
    new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    padding: 80,
                    background: "#0f0f0f",
                    color: "#f7f3f3",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        fontSize: 28,
                        letterSpacing: 8,
                        color: "#8f8e8e",
                    }}
                >
                    PORTFOLIO
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 150,
                            fontWeight: 800,
                            lineHeight: 0.95,
                            letterSpacing: -6,
                            textTransform: "uppercase",
                        }}
                    >
                        Maxim
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 150,
                            fontWeight: 800,
                            lineHeight: 0.95,
                            letterSpacing: -6,
                            textTransform: "uppercase",
                        }}
                    >
                        Novikov
                        <span style={{ color: "rgb(237,237,150)" }}>.</span>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        fontSize: 32,
                        letterSpacing: 4,
                        color: "#8f8e8e",
                    }}
                >
                    FRONTEND DEVELOPER
                </div>
            </div>
        ),
        size,
    );

export default OpengraphImage;