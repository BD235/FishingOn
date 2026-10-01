// Semua path aset terpusat di sini
// Kalau ganti nama file, cukup ubah di sini saja

export const ASSETS = {
  // Background
  bg: {
    scene: "/assets/backgrounds/scene_river.png",
    water: "/assets/backgrounds/water_strip.png",
  },

  // Karakter
  character: {
    idle:    "/assets/character/player_idle.png",
    cast:    "/assets/character/player_cast.png",
    fishing: "/assets/character/player_fishing.png",
    pull:    "/assets/character/player_pull.png",
  },

  // Rod
  rod: {
    bamboo:   "/assets/items/rod_bamboo.png",
    fiber:    "/assets/items/rod_fiber.png",
    carbon:   "/assets/items/rod_carbon.png",
    titanium: "/assets/items/rod_titanium.png",
  },

  // Pelampung
  float: {
    idle: "/assets/items/float_idle.png",
    bite: "/assets/items/float_bite.png",
  },

  // Ikan — key sama dengan fish id di fishData.ts
  fish: {
    ikan_mas:     "/assets/fish/ikan_mas.png",
    lele:         "/assets/fish/lele.png",
    nila:         "/assets/fish/nila.png",
    mujair:       "/assets/fish/mujair.png",
    sepat:        "/assets/fish/sepat.png",
    betok:        "/assets/fish/betok.png",
    gurami:       "/assets/fish/gurami.png",
    tawes:        "/assets/fish/tawes.png",
    patin:        "/assets/fish/patin.png",
    baung:        "/assets/fish/baung.png",
    gabus:        "/assets/fish/gabus.png",
    nilem:        "/assets/fish/nilem.png",
    hampala:      "/assets/fish/hampala.png",
    jelawat:      "/assets/fish/jelawat.png",
    tambakan:     "/assets/fish/tambakan.png",
    toman:        "/assets/fish/toman.png",
    betutu:       "/assets/fish/betutu.png",
    belida:       "/assets/fish/belida.png",
    arwana_hijau: "/assets/fish/arwana_hijau.png",
    lais:         "/assets/fish/lais.png",
    sengarat:     "/assets/fish/sengarat.png",
    tapah:        "/assets/fish/tapah.png",
    arwana_red:   "/assets/fish/arwana_red.png",
    pari_sungai:  "/assets/fish/pari_sungai.png",
    arapaima:     "/assets/fish/arapaima.png",
  },

  // UI
  ui: {
    btnCast:         "/assets/ui/btn_cast.png",
    btnSell:         "/assets/ui/btn_sell.png",
    btnShop:         "/assets/ui/btn_shop.png",
    btnBag:          "/assets/ui/btn_bag.png",
    btnRank:         "/assets/ui/btn_rank.png",
    btnQuest:        "/assets/ui/btn_quest.png",
    panelBg:         "/assets/ui/panel_bg.png",
    coinIcon:        "/assets/ui/coin_icon.png",
    avatarFrame:     "/assets/ui/avatar_frame.png",
    rarityCommon:    "/assets/ui/rarity_common.png",
    rarityUncommon:  "/assets/ui/rarity_uncommon.png",
    rarityRare:      "/assets/ui/rarity_rare.png",
    rarityEpic:      "/assets/ui/rarity_epic.png",
    rarityLegendary: "/assets/ui/rarity_legendary.png",
    btnCastDisabled: "/assets/ui/btn_cast_disabled.png",
    btnPull:         "/assets/ui/btn_pull.png",
  },
} as const;