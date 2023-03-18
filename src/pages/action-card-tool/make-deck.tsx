import type { NextPage } from "next";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Head } from "~/components/Layout";
import { useActionDeck } from "~/contexts/ActionDeckContext";

const DownloadDeck: NextPage = () => {
  const { state, downloadDeck, generateDeck, reset } = useActionDeck();
  const router = useRouter();

  useEffect(() => {
    if (!state.art || !state.overlays) {
      router.push("/action-card-tool");
    }
  }, [router, state.art, state.overlays]);
  return (
    <>
      <Head
        title="Omen | Action Card Tool"
        meta="Omen: Action Card Generator Tool"
      />

      <div className="flex flex-col items-center gap-4 p-16">
        {state.art && state.overlays && (
          <button
            className="btn-primary btn w-full max-w-sm"
            disabled={!state.art || !state.overlays}
            onClick={() => {
              void (async () => {
                await generateDeck();
              })();
            }}
          >
            Generate Deck
          </button>
        )}
        {state.deck && (
          <div className="rounded-xl bg-base-300 p-4">
            <h2 className="pb-4 text-xl">Deck Preview</h2>
            <div className="flex flex-wrap gap-2">
              {state.deck.map(
                (card) =>
                  card && (
                    <Image
                      src={card}
                      alt="card image"
                      height={300}
                      width={200}
                      key={card}
                    />
                  )
              )}
            </div>
          </div>
        )}
        {state.deck && (
          <>
            <button
              className="btn-primary btn w-full max-w-sm"
              disabled={!state.deck}
              onClick={() => {
                void (async () => {
                  await downloadDeck();
                })();
              }}
            >
              Download Deck
            </button>
            <button
              className="btn-secondary btn w-full max-w-sm"
              disabled={!state.deck}
              onClick={() => {
                reset();
                router.push("/action-card-tool/choose-art");
              }}
            >
              New Deck
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DownloadDeck;
