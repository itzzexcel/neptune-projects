import { LunaUnload, Tracer, ftch } from "@luna/core";

export const { trace } = Tracer("[OLED Theme]");

const themeUrl = "https://raw.githubusercontent.com/ItzzExcel/neptune-projects/refs/heads/main/themes/black-neptune-theme.css";

// called when plugin is unloaded.
// clean up resources
export const unloads = new Set<LunaUnload>();

function ApplyCSS(style: string): HTMLStyleElement {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.textContent = style;
    document.head.appendChild(styleElement);
    return styleElement;
}

// Added Top-level async since Luna plugins are modules <3
const style = await ftch.text(themeUrl).catch((error: Error) => {
    trace.msg.err(`Failed to fetch theme CSS: ${error.message}`);
    return null;
});

let styleElement: HTMLStyleElement | null = null;

// Tried using StyleTag Class but it didn't work. and Manually adding the style element to the head, seems to work.
// TODO: Try using StyleTag Class again.
if (style) {
    styleElement = ApplyCSS(style);
    unloads.add(() => {
        if (styleElement && styleElement.parentNode) {
            styleElement.parentNode.removeChild(styleElement);
        }
    });
} 