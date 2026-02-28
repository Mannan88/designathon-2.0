const cdnBase = "https://res.cloudinary.com/dunayy41e";
const img = (id: string, opts = "f_auto,q_auto") =>
  `${cdnBase}/image/upload/${opts}/${id}`;
const vid = (id: string) => `${cdnBase}/video/upload/${id}`;

export const assets = {
  hero: {
    gdgLogo: img("v1769463249/gdg-logo_lwjmhh.png"),
    astronaut: img("v1771742929/astronaut_mr0lus.png"),
    bolt: img("v1771742981/bolt_a7pf3k.png", "f_auto,q_auto,w_400"),
    laptop: img("v1771744434/laptop_utysp1.png"),
    topleftCamera: img("v1771744435/topleft-camera_n18rio.png"),
    toprightCamera: img("v1771742928/topright-camera_vpetvk.png"),
    bottomrightCamera: img("v1771744422/bottomright-camera_i1fv8a.png"),
  },
  missionLogs: {
    drill: vid("v1771837553/drill_nwxdf7.webm"),
    sponge: vid("v1771837553/sponge_os4vab.webm"),
    mesh: img("v1771744612/mesh_xtkjvq.svg"),
    milkyway: img("v1771744447/milkyway_sidata.png", "f_auto,q_auto,w_500"),
    arrowFilled: img("v1771744462/rightArrow_filled_zjlghc.svg"),
    arrowOutline: img("v1771744610/rightArrow_outline_eyqsbg.svg"),
  },
  timeline: {
    path: "/images/timeline/timelinePathFinalv3.svg",
    venueFinal: "/images/timeline/venue_final.png",
    galaxy1: "/images/timeline/galaxy_1.avif",
    galaxy1Details: "/images/timeline/galaxy_1_details.svg",
    galaxy2: "/images/timeline/galaxy_2.avif",
    galaxy2Details: "/images/timeline/galaxy_2_details.svg",
    galaxy3: "/images/timeline/galaxy_3.avif",
    galaxy3Details: "/images/timeline/galaxy_3_details.svg",
    galaxy4: "/images/timeline/galaxy_4.avif",
    galaxy4Details: "/images/timeline/galaxy_4_details.svg",
    galaxy5: "/images/timeline/galaxy_5.avif",
    galaxy5Details: "/images/timeline/galaxy_5_details.svg",
    galaxy6: "/images/timeline/galaxy_6.avif",
    galaxy6Details: "/images/timeline/galaxy_6_details.svg",
    locationPin: "/images/timeline/location-pin.svg",
  },
  guidelines: {
    galaxyImage: "/images/Guidelines/Galaxy-image.jpg",
  },
  faqs: {
    background: "/images/faq/faq_bg.png",
    gif: "/gif/FAQ.gif",
    jupiter: "/images/faq/jupiter.png",
  },
  about: {
    carousel: [
      img("v1772131687/img1_ouenae.jpg", "w_600,f_auto,q_auto"),
      img("v1772131687/img2_riugpx.jpg", "w_600,f_auto,q_auto"),
      img("v1772131687/img3_kunjn4.jpg", "w_600,f_auto,q_auto"),
      img("v1772131687/img4_lc8rex.jpg", "w_600,f_auto,q_auto"),
      img("v1772131687/img5_ops3de.jpg", "w_600,f_auto,q_auto"),
    ],
  },
  footer: {
    gdgLogo: img("v1769463249/gdg-logo_lwjmhh.png", "f_auto,q_auto,w_128"),
  },
} as const;

export const criticalAssets: string[] = [
  assets.hero.gdgLogo,
  assets.hero.astronaut,
  assets.hero.bolt,
  assets.hero.laptop,
  assets.hero.topleftCamera,
  assets.hero.toprightCamera,
  assets.hero.bottomrightCamera,
  assets.missionLogs.mesh,
  assets.missionLogs.milkyway,
];

export const deferredAssets: string[] = [
  assets.missionLogs.drill,
  assets.missionLogs.sponge,
  assets.guidelines.galaxyImage,
  assets.faqs.gif,
  assets.timeline.venueFinal,
];
