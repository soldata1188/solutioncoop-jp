import Image, { type StaticImageData } from "next/image";

/**
 * 写真（next/image）。静的 import の width/height を使い、レイアウトのずれを防ぎます。
 * priority はヒーロー画像のみで指定してください。
 */
export function Photo({
  photo,
  sizes,
  caption,
  priority = false,
  className = "",
  imgClassName = "",
}: {
  photo: { src: StaticImageData; alt: string };
  sizes: string;
  caption?: React.ReactNode;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={className}>
      <Image
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={`h-auto w-full object-cover ${imgClassName}`}
      />
      {caption ? <figcaption className="mt-2 text-[13px] leading-relaxed text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
