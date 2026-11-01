/**
 * サイトで使用する写真（既存リポジトリ images/ から選定し、WebP に変換・縮小・EXIF/位置情報を削除済み）。
 * 静的 import により width/height が自動で付与され、レイアウトのずれを防ぎます。
 * faces: 人物の顔が写っている写真（掲載の同意確認が必要。restyle3-notes.md の一覧を参照）
 */
import siteSteel from "@/public/images/site-steel-workshop.webp";
import siteExcavation from "@/public/images/site-excavation.webp";
import siteInterior from "@/public/images/site-building-interior.webp";
import officeExterior from "@/public/images/office-exterior.webp";
import trainingPlate from "@/public/images/training-center-plate.webp";
import sakaiLighthouse from "@/public/images/sakai-lighthouse.webp";
import fireDrill from "@/public/images/training-fire-drill.webp";
import practice from "@/public/images/training-practice.webp";

export const photos = {
  siteSteel: { src: siteSteel, alt: "鋼材が積まれ、工具や脚立が並ぶ金属加工の作業場", faces: false },
  siteExcavation: { src: siteExcavation, alt: "土留めの木製矢板と配管が見える、掘削中の土木工事の現場", faces: false },
  siteInterior: { src: siteInterior, alt: "照明や資材、作業台が置かれた、内装工事中の広い建物内部", faces: false },
  office: { src: officeExterior, alt: "「ソリューション協同組合」の縦型看板が掲げられた建物の入口", faces: false },
  trainingPlate: { src: trainingPlate, alt: "観葉植物の横の壁に掲げられた「ソリューション協同組合 研修センター」の表札", faces: false },
  sakai: { src: sakaiLighthouse, alt: "青空の下、堺の海辺に立つ白い木造の灯台", faces: false },
  fireDrill: { src: fireDrill, alt: "屋内の訓練場で、受講者が消火器を手に火元に向かって並ぶ消火訓練の様子", faces: true },
  practice: { src: practice, alt: "講習会場で、受講者が床に置いたシートを使って実技の練習をしている様子", faces: true },
} as const;
