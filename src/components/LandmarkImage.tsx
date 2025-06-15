
import React, { useState } from "react";

// Placeholder for failed images (local or Unsplash, etc.)
const DEFAULT_PLACEHOLDER = "/placeholder.svg"; // Could also use Unsplash etc.

type LandmarkImageProps = {
  imageUrl: string | undefined;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  // Allow consumers to get notified if fallback triggers
  onFallback?: () => void;
  // For debug/test
  retryLabel?: string;
};

function tryEncodeCommasOnly(url: string): string {
  // Don't double encode: encode raw , to %2C, but never touch existing %2C.
  return url.replace(/,/g, "%2C");
}

function getWikimediaPage(url: string) {
  // For Wikimedia, links are like:
  // "https://upload.wikimedia.org/wikipedia/commons/0/06/Cristo_Redentor_-_Rio_de_Janeiro%2C_Brasil.jpg"
  // becomes
  // "https://commons.wikimedia.org/wiki/File:Cristo_Redentor_-_Rio_de_Janeiro,_Brasil.jpg"
  const filename = url.split("/").pop();
  if (!filename) return undefined;
  return `https://commons.wikimedia.org/wiki/File:${filename.replace(/%2C/g,',')}`;
}

/**
 * Robust image loader for landmark images, gracefully handling encoding errors/fallbacks.
 */
export const LandmarkImage: React.FC<LandmarkImageProps> = ({
  imageUrl,
  alt,
  className,
  style,
  onLoad,
  onFallback,
  retryLabel
}) => {
  const [failed, setFailed] = useState(false);
  const [triedOnce, setTriedOnce] = useState(false);
  const [src, setSrc] = useState(() => {
    if (!imageUrl) return DEFAULT_PLACEHOLDER;
    return tryEncodeCommasOnly(imageUrl);
  });

  // Logging + retry logic
  const handleError = async (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Only try once: if first attempt with encoded commas failed, try the raw URL!
    if (!triedOnce && imageUrl) {
      setTriedOnce(true);
      setSrc(imageUrl); // try original (possibly already encoded) URL
      console.warn("[LandmarkImage] Image load failed; re-trying with original raw URL", {
        alt,
        triedSrc: src,
        rawSrc: imageUrl,
        len: src.length,
      });
      return;
    }
    // Fallback to placeholder
    setFailed(true);
    setSrc(DEFAULT_PLACEHOLDER);
    if (onFallback) onFallback();

    // Log details
    const img = e.currentTarget;
    // Try to get HTTP status via fetch (not always possible! CORS)
    let status = undefined, headers = undefined;
    try {
      const resp = await fetch(src, { method: "HEAD" });
      status = resp.status;
      headers = Object.fromEntries(resp.headers.entries());
    } catch {}
    console.error("[LandmarkImage] All image loading attempts failed.", {
      alt,
      src,
      urlLen: src.length,
      status,
      headers,
    });
  };

  React.useEffect(() => {
    setFailed(false);
    setTriedOnce(false);
    setSrc(
      imageUrl
        ? tryEncodeCommasOnly(imageUrl)
        : DEFAULT_PLACEHOLDER
    );
  }, [imageUrl]);

  // Don't show error alt on working fallback
  const showWikimedia =
    failed &&
    imageUrl &&
    imageUrl.includes("wikimedia.org") &&
    getWikimediaPage(imageUrl);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className={
          className +
          " transition border-2 " +
          (failed
            ? "border-red-400 opacity-65"
            : triedOnce
            ? "border-yellow-300"
            : "border-green-300")
        }
        style={style}
        loading="lazy"
        draggable={false}
        onLoad={onLoad}
        onError={handleError}
        data-testid="landmark-img"
      />
      {/* Enhanced error UX overlay */}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 z-10 rounded">
          <span className="text-sm text-red-700 font-medium px-2 pb-2">
            Image unavailable. {retryLabel || "Trying fallback…"}
          </span>
          {showWikimedia && (
            <a
              href={getWikimediaPage(imageUrl!)}
              className="px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-semibold text-xs shadow border border-indigo-200"
              rel="noopener noreferrer"
              target="_blank"
            >
              View on Wikimedia
            </a>
          )}
        </div>
      )}
    </div>
  );
};
