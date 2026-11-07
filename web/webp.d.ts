declare module "*.webp" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}

declare module "*.jpg" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}
