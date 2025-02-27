require("./tracer");
import { Tracer } from "./tracer";
import * as ui from "./ui";
import { intercept, store, utils } from "@neptune"

const trace = Tracer("[Clean View]");

const styles = `
[data-test="footer-player"], [class*="tabItems"] {
    opacity: 0 !important;
    transition: opacity 0.3s ease-in-out;
}

[class*="imageContainer"] {
    margin-top: 140px;
}

[data-test="footer-player"]:hover, [class*="tabItems"]:hover {
    opacity: 1 !important;
}

[data-test="header-container"] {
    opacity: 0;
    margin: -40px;
}

[class*="nowPlayingContainer"] {
    padding-left: 6%;
}

[class^="bar--"] {
    background-color: transparent;
}

[class^="bar--"]>* {
    opacity: 0;
}
`;

function ApplyCSS(style) {
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) styleElement.styleSheet.cssText = style;
    else styleElement.appendChild(document.createTextNode(style));

    document.head.appendChild(styleElement);
    return styleElement;
}

async function HttpGet(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        return content;
    } catch (error) {
        trace.msg.err(`Failed to fetch URL: ${error.message}`);
        return null;
    }
}

var isCleanView = false;
var appliedStyle;
const toggleCleanButton = ui.NewPlayerButton(() => {
    if (isCleanView) {
        if (appliedStyle) {
            appliedStyle.remove();
        }
    } else {
        appliedStyle = ApplyCSS(styles);
    }
    isCleanView = !isCleanView;
}, "https://cdn.discordapp.com/attachments/1286571643807731783/1344515636675612712/image.png?ex=67c13143&is=67bfdfc3&hm=1573e29efdf882292922736e5ae2df6a87b7ad316add6fc498eee8ce799fb8e4&"
, 2);

// STYLES FOR THE LYRICS
const themeUrl = "https://raw.githubusercontent.com/itzzexcel/neptune-projects/refs/heads/main/plugins/plugins/not-actual-fullscreen/src/separated-lyrics.css";

var style;
var styleElement;

(async () => {
    style = await HttpGet(themeUrl);
    styleElement = ApplyCSS(style);
})();


function observeTrackTitle() {
    const trackTitleElement = document.querySelector('[class^="trackTitleContainer"]');
    if (trackTitleElement) {
        trackTitleElement.addEventListener('DOMSubtreeModified', () => {
            setTimeout(() => {
                // console.log("Track changed: " + trackTitleElement.querySelector("span").innerHTML + "\n")
                onTrackChanged();
            }, 300);
        });
    }
}

const onTrackChanged = function (method = 0) {
    // Tu amor tan liminal, tu amor tan liminal
    // - Ghouljaboy, 2021

    if (method === 1) {
        setTimeout(() => {
            onTrackChanged();
            return;
        }, 2000);
    }

    let albumImageElement = document.querySelector('figure[class*="albumImage"] > div > div > div > img');
    let albumImageSrc;

    if (albumImageElement) {
        albumImageSrc = albumImageElement.src;

        // Set res to 1280x1280
        albumImageSrc = albumImageSrc.replace(/\d+x\d+/, '1280x1280');
        albumImageElement.src = albumImageSrc;
    }

    // Setting background to the *="nowPlayingContainer" element
    let nowPlayingContainerElement = document.querySelector('[class*="nowPlayingContainer"]');
    if (nowPlayingContainerElement && albumImageSrc) {
        // Remove existing corner images if they exist
        const existingImages = nowPlayingContainerElement.querySelectorAll('.corner-image');
        existingImages.forEach(img => img.remove());

        // Create and append center image
        const centerImg = document.createElement('img');
        centerImg.src = albumImageSrc;
        centerImg.className = 'corner-image';
        centerImg.style.position = 'absolute';
        centerImg.style.left = '50%';
        centerImg.style.top = '50%';
        centerImg.style.transform = 'translate(-50%, -50%)';
        centerImg.style.width = '75vw';
        centerImg.style.height = '150vh';
        centerImg.style.objectFit = 'cover';
        centerImg.style.zIndex = '-1';
        centerImg.style.filter = 'blur(100px) brightness(0.6) contrast(1.2) saturate(1)';
        centerImg.style.animation = 'spin 35s linear infinite';
        nowPlayingContainerElement.appendChild(centerImg);

        const centerImg2 = document.createElement('img');
        centerImg2.src = albumImageSrc;
        centerImg2.className = 'corner-image';
        centerImg2.style.position = 'absolute';
        centerImg2.style.left = '50%';
        centerImg2.style.top = '50%';
        centerImg2.style.transform = 'translate(-50%, -50%)';
        centerImg2.style.width = '75vw';
        centerImg2.style.height = '150vh';
        centerImg2.style.objectFit = 'cover';
        centerImg2.style.zIndex = '-1';
        centerImg2.style.filter = 'blur(100px) brightness(0.6) contrast(1.2) saturate(1)';
        centerImg2.style.animation = 'spin 35s linear infinite';
        nowPlayingContainerElement.appendChild(centerImg2);

        // Add keyframe animation if it doesn't exist
        if (!document.querySelector('#spinAnimation')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'spinAnimation';
            styleSheet.textContent = `
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
};

const cleanUpDynamicArt = function () {
    [...document.getElementsByClassName("corner-image")].forEach((element) => {
        element.remove();
    });
};

const PLAYBACK_EVENTS = [
    "playbackControls/PREFILL_MEDIA_PRODUCT_TRANSITION",
    "playbackControls/MEDIA_PRODUCT_TRANSITION"
];

const unsubscribeFunctions = PLAYBACK_EVENTS.map(event =>
    intercept(event, () => {
        onTrackChanged(1);
    })
);

observeTrackTitle();
observeTrackTitle();
observeTrackTitle();
observeTrackTitle();

onTrackChanged(1);

function CleanUpCSS() {
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
    }

    if (appliedStyle && appliedStyle.parentNode) {
        appliedStyle.parentNode.removeChild(appliedStyle);
    }
}

export function onUnload() {
    CleanUpCSS();
    ui.CleanupButtons();
    unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    cleanUpDynamicArt();

    const trackTitleElement = document.querySelector('div[class^="trackTitleContainer"]');
    if (trackTitleElement) {
        trackTitleElement.removeEventListener('DOMSubtreeModified', onTrackChanged);
    }
}