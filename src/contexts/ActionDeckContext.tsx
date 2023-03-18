import { createContext, type ReactNode, useContext, useReducer } from "react";
import { type Area } from "react-easy-crop";
import mergeImages from "merge-images";
import JSZip from "jszip";

type ActionDeckState = {
  art: string | null;
  overlays: (string | null)[] | null;
  deck: (string | null)[] | null;
  spriteSheet: string | null;
  step: keyof typeof ActionDeckSteps;
};
type Action =
  | { type: "setArt"; payload: ActionDeckState["art"] }
  | { type: "setOverlays"; payload: ActionDeckState["overlays"] }
  | { type: "setDeck"; payload: ActionDeckState["deck"] }
  | { type: "setSpriteSheet"; payload: ActionDeckState["spriteSheet"] }
  | { type: "setStep"; payload: ActionDeckState["step"] }
  | { type: "reset"; payload: ActionDeckState };

type ActionDeckContextType = ReturnType<typeof useCardManager>;

const ActionDeckSteps = {
  1: "chooseArt",
  2: "uploadOverlays",
  3: "downloadDeck",
} as const;

const useCardManager = (initialState: ActionDeckState) => {
  const [state, dispatch] = useReducer(
    (state: ActionDeckState, action: Action) => {
      switch (action.type) {
        case "setArt":
          return { ...state, art: action.payload };
        case "setOverlays":
          return { ...state, overlays: action.payload };
        case "setDeck":
          return { ...state, deck: action.payload };
        case "setSpriteSheet":
          return { ...state, spriteSheet: action.payload };
        case "reset":
          return initialState;

        default:
          return state;
      }
    },
    initialState
  );

  const setArt = (art: ActionDeckState["art"]) => {
    dispatch({ type: "setArt", payload: art });
  };

  const setOverlays = (overlays: ActionDeckState["overlays"]) => {
    dispatch({ type: "setOverlays", payload: overlays });
  };

  const setDeck = (deck: ActionDeckState["deck"]) => {
    dispatch({ type: "setDeck", payload: deck });
  };

  const setSpriteSheet = (spriteSheet: ActionDeckState["spriteSheet"]) => {
    dispatch({ type: "setSpriteSheet", payload: spriteSheet });
  };

  const setStep = (step: ActionDeckState["step"]) => {
    dispatch({ type: "setStep", payload: step });
  };

  const reset = () => {
    dispatch({ type: "reset", payload: initialState });
  };

  const resizeOverlays = async () => {
    if (!state.overlays) return [null];
    const resizedOverlays = await Promise.all(
      state.overlays.map((overlay) => {
        return overlay ? resizeImage(overlay) : null;
      })
    );
    return resizedOverlays;
  };
  const generateDeck = async () => {
    if (!state.art || !state.overlays) return null;

    const art = await resizeImage(state.art);
    const overlays = await resizeOverlays();

    const deck = await Promise.all(
      overlays.map(async (overlay) => {
        if (!art || !overlay) return null;
        return applyOverlay(art, overlay);
      })
    );
    setDeck([art, ...deck]);
    return null;
  };

  const downloadDeck = async () => {
    if (!state.deck) return null;
    const cleanedDeck = state.deck.filter(
      (card) => typeof card === "string"
    ) as string[];
    const zip = await cardsToZip(cleanedDeck);
    const link = document.createElement("a");
    link.download = "action-deck";
    link.href = URL.createObjectURL(zip);
    link.click();

    return null;
  };

  return {
    state,
    setArt,
    setOverlays,
    generateDeck,
    downloadDeck,
    setStep,
    setSpriteSheet,
    reset,
    getCroppedImage,
    resizeImage,
    makeBase64Strings,
  };
};

const ActionDeckContext = createContext<ActionDeckContextType>({
  state: {
    art: null,
    overlays: null,
    deck: null,
    spriteSheet: null,
    step: 1,
  },
  setArt: () => null,
  setOverlays: () => null,
  generateDeck: () => Promise.resolve(null),
  downloadDeck: () => Promise.resolve(null),
  setSpriteSheet: () => null,
  setStep: () => null,
  reset: () => null,
  getCroppedImage: () => Promise.resolve(null),
  resizeImage: () => Promise.resolve(null),
  makeBase64Strings: () => Promise.resolve(null),
});

export const ActionDeckProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ActionDeckContext.Provider
      value={useCardManager({
        art: null,
        overlays: null,
        spriteSheet: null,
        deck: null,
        step: 1,
      })}
    >
      {children}
    </ActionDeckContext.Provider>
  );
};

export const useActionDeck = () => useContext(ActionDeckContext);

// Utils
const makeBase64Strings = async (data: FileList | null) => {
  if (!data) return null;
  const batch = Array.from(data).map((file) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  });
  return await Promise.all(batch);
};

const createImage = async (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

async function getCroppedImage(dataURL: string, pixelCrop: Area) {
  const image = await createImage(dataURL);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return null;

  canvas.height = image.height;
  canvas.width = image.width;

  context.drawImage(image, 0, 0); // draws original image

  const data = context.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  ); // gets cropped image

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  context.putImageData(data, 0, 0); // draws cropped image

  return canvas.toDataURL("image/png");
}

const resizeImage = async (dataUrl: string, targetHeight = 600) => {
  const image = await createImage(dataUrl);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return null;

  const scaleFactor = targetHeight / image.height;
  const targetWidth = image.width * scaleFactor;

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  return canvas.toDataURL("image/png");
};

const applyOverlay = async (image: string, overlay: string) => {
  const result = await mergeImages([image, overlay], {
    width: 400,
    height: 600,
    format: "image/png",
  });
  return result;
};

const cardsToZip = async (cards: string[]) => {
  const zip = new JSZip();
  cards.forEach((card, index) => {
    const data = card.split(",")[1];
    if (data !== undefined) {
      zip.file(`card-${index}.png`, data, { base64: true });
    }
  });
  return await zip.generateAsync({ type: "blob" });
};
