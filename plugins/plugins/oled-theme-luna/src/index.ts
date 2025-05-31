import { LunaUnload, Tracer } from "@luna/core";

export const { trace, errSignal } = Tracer("[OLED Theme]");
errSignal!._ = "OLED Theme plugin error signal";

const themeUrl = "https://raw.githubusercontent.com/ItzzExcel/neptune-projects/refs/heads/main/themes/black-neptune-theme.css";

let style: string | null;
let styleElement: HTMLStyleElement | null;

// Functions in unloads are called when plugin is unloaded.
// Used to clean up resources, even listener dispose etc should be added here
export const unloads = new Set<LunaUnload>();

function ApplyCSS(style: string): HTMLStyleElement {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if ((styleElement as any).styleSheet) (styleElement as any).styleSheet.cssText = style;
    else styleElement.appendChild(document.createTextNode(style));

    document.head.appendChild(styleElement);
    return styleElement;
}

function CleanUpCSS() {
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
    }
}

async function HttpGet(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        trace.msg.err(`Failed to fetch URL: ${(error as Error).message}`);
        return null;
    }
}

// Since HttpGet is async, we need to await its result
(async () => {
    style = await HttpGet(themeUrl);
    if (style) {
        styleElement = ApplyCSS(style);
    }
})();

// Add cleanup function to unloads
unloads.add(() => {
    CleanUpCSS();
    
    const trackTitleElement = document.querySelector('div[class^="trackTitleContainer"]');
    if (trackTitleElement) {
        // Note: DOMSubtreeModified is deprecated, but keeping for compatibility
        // trackTitleElement.removeEventListener('DOMSubtreeModified', onTrackChanged);
    }
}); 