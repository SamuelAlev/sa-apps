import { Loader2 } from "lucide-react";
import type { VideoHTMLAttributes } from "react";
import { forwardRef, useRef, useState } from "react";

import { prepareImageUrl } from "./helpers";
import styles from "./Video.module.scss";

export const Video = forwardRef<HTMLVideoElement, VideoHTMLAttributes<HTMLVideoElement>>(({ style, ...props }, ref) => {
	const [state, setState] = useState<"init" | "loading" | "ready">("init");

	const timeoutId = useRef<number | null>(null);

	const handleLoadStart = () => {
		timeoutId.current = window.setTimeout(() => {
			if (state === "init") {
				setState("loading");
			}
		}, 300);
	};

	const handleLoadedData = () => {
		setState("ready");
		timeoutId.current !== null && clearTimeout(timeoutId.current);
	};

	return (
		<>
			{state === "init" && (
				// biome-ignore lint/a11y/useAltText: <explanation>
				<img draggable={false} className={styles.coverImage} src={props?.src ? prepareImageUrl(props.src) : undefined} />
			)}

			{state === "loading" && (
				<div className={styles.loadingState}>
					{/* biome-ignore lint/a11y/useAltText: <explanation> */}
					<img draggable={false} className={styles.blurredCover} src={props?.src ? prepareImageUrl(props.src) : undefined} />
					<div className={styles.loadingOverlay}>
						<Loader2 className={styles.spinner} size={32} />
					</div>
				</div>
			)}

			<video
				poster={props?.src ? prepareImageUrl(props.src) : undefined}
				/* Using `style` as the `block` class is used in Clarify */
				style={{
					display: state === "ready" ? "block" : "none",
					...style,
				}}
				{...props}
				ref={ref}
				onLoadStart={handleLoadStart}
				onLoadedData={handleLoadedData}
			/>
		</>
	);
});
Video.displayName = "SAVideo";
