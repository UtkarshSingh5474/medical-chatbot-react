// apiFunctions.js

//var apiUrlBase = "http://127.0.0.1:8000/"
var apiUrlBase = "https://outfitgeneratorapi-i3odb6kjxq-em.a.run.app/";

// apiFunctions.js

export async function getOverviewText(input) {
  const apiUrl = apiUrlBase + `outfit_text?input=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function getOverviewTextFlipkartResults(input) {
  const apiUrl =
    apiUrlBase +
    `items_flipkart_results?overviewText=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export async function getCombinedOutfitTextWithSearchResultsApiRequest(
  messages,
  userInfo
) {
  var outfitOverview = await getOverviewText(JSON.stringify(messages));
  var clothingItems = {};
  var pattern = /\d+\./;


  if (pattern.test(JSON.stringify(outfitOverview))) {
    clothingItems = await getOverviewTextFlipkartResults(
      `{'userInfo':"${userInfo}",'outfitOverview':"${outfitOverview}"}`
    );
  }
  return { outfitOverview: outfitOverview, clothingItems: clothingItems };
}


export async function testFunction(messages, userInfo) {
  const data = {
    outfitOverview:
      "For your visit to your brother's for Rakshabandhan, I would recommend a traditional and festive outfit that is comfortable and stylish. Based on your Medical History, I suggest the following outfit:\n\n1. Anarkali Suit: A beautiful Anarkali suit in a vibrant color like deep red or royal blue would be a perfect choice. The suit should have intricate embroidery or embellishments on the bodice and a flowy flare. It should be made of comfortable and breathable fabric like silk or georgette.\n\n2. Statement Earrings: Pair the Anarkali suit with a stunning pair of statement earrings. Opt for long chandelier earrings or jhumkas with intricate designs. Choose a color that complements your outfit, such as gold or silver.\n\n3. Embellished Sandals: Complete your outfit with a pair of embellished sandals. Look for sandals with embroidered details or embellishments like stones or pearls. Choose a color that matches or complements your Anarkali suit, such as gold or silver.\n\n4. Ethnic Clutch: Carry a stylish ethnic clutch to keep your essentials close by. Look for a clutch with traditional designs or embroidery that matches the color scheme of your outfit. A gold or silver clutch would go well with the overall look.\n\n5. Mehndi: Enhance your traditional look by applying beautiful mehndi designs on your hands. Opt for intricate patterns and motifs that symbolize the festival of Rakshabandhan.\n\nRemember to style your hair in a neat bun or braid and apply a subtle makeup look with a focus on the eyes. Enjoy your time with your brother and celebrate the bond of love and protection on Rakshabandhan!",
    clothingItems: {
      "Anarkali Suit": {
        searchLink:
          "https://www.flipkart.com/search?marketplace=FLIPKART&q=Anarkali%20suit%20for%20women,%20deep%20red%20silk",
        topResults: [
          {
            name: "Women Viscose Rayon Kurta, Pant And Dupatta Set",
            current_price: 949,
            link:
              "https://www.flipkart.com/tanvifashion-women-kurta-pant-dupatta-set/p/itm4864564158ed2",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/z/l/7/l-shiv08-skyblue-zari-tanvifashion-original-imagnshan98ukrkw.jpeg?q=70",
          },
          {
            name: "Solid Rayon Blend Stitched Anarkali Gown",
            current_price: 779,
            link:
              "https://www.flipkart.com/panjurli-anarkali-gown/p/itm2781aae3fd047",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/gown/u/4/o/na-3xl-short-sleeve-stitched-miss-10-miss-clothing-na-original-imagm6t7deafgkyr.jpeg?q=70",
          },
          {
            name: "Women Fit and Flare Multicolor Dress",
            current_price: 299,
            link:
              "https://www.flipkart.com/maruti-fab-women-fit-flare-multicolor-dress/p/itm70d8692c7ac7e",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/k66sh3k0/dress/8/n/b/xxl-02-nidhi-creation-original-imafzkby6cegbbfp.jpeg?q=70",
          },
          {
            name: "Self Design Anarkali Kurta, Bottom &amp; Dupatta Set",
            current_price: 499,
            link:
              "https://www.flipkart.com/bruno-self-design-anarkali-kurta-bottom-dupatta-set/p/itm92c64db21f96d",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/salwar-kurta-dupatta/h/k/7/l-haar-bruno-original-imagfxezvdbfeaw4-bb.jpeg?q=70",
          },
          {
            name: "Women Georgette Kurta and Dupatta Set",
            current_price: 499,
            link:
              "https://www.flipkart.com/vidya-fashion-mart-women-kurta-dupatta-set/p/itmd09be3c60ca67",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/n/r/n/xl-purplegown-m-nejadhari-original-imaggurhbptfyt8u.jpeg?q=70",
          },
        ],
      },
      "Statement Earrings": {
        searchLink:
          "https://www.flipkart.com/search?marketplace=FLIPKART&q=Long%20chandelier%20earrings%20for%20women,%20gold",
        topResults: [
          {
            name: "Combo of 12 pair Small Colorful Traditional South India...",
            current_price: 289,
            link:
              "https://www.flipkart.com/fashion-fusion-combo-12-pair-small-colorful-traditional-south-indian-temple-enamel-meena-alloy-jhumki-earring/p/itmebcabb7e1f3a5",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kzrbiq80/earring/o/k/f/na-ffc1206-fashion-fusion-original-imagbp9qf6muna5t.jpeg?q=70",
          },
          {
            name: "100 Golden and 100 Silver Earrings Hooks combo for jewe...",
            current_price: 299,
            link:
              "https://www.flipkart.com/store-of-arts-pp-creations-100-golden-silver-earrings-hooks-combo-jewelry-making-pack-2-metal-drops-danglers/p/itmc0d942fdb2972",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/earring/e/d/u/na-gsjhen-store-of-arts-pp-creations-original-imaggbr8uhwbwh8k.jpeg?q=70",
          },
          {
            name: "TILAK DESIGN LONG KUNDAN LONG EARRINGS SET IN LITE GOLD...",
            current_price: 388,
            link:
              "https://www.flipkart.com/knigght-angel-jewels-tilak-design-long-kundan-earrings-set-lite-gold-polish-metal-drops-danglers/p/itm125215f1669df",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/l3os4280/earring/l/y/s/na-er56-tilak-long-kundan-long-earrings-set-knigght-angel-jewels-original-imagercrbexgtgzh.jpeg?q=70",
          },
          {
            name: "NEW! Touchstone Indian Bollywood Desire Trendy Filigree...",
            current_price: 599,
            link:
              "https://www.flipkart.com/touchstone-new-indian-bollywood-desire-trendy-filigree-white-rhinestone-faux-tourmaline-designer-jewelry-chandelier-earrings-silver-tone-women-alloy-drops-danglers/p/itm10d582020e6d2",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kll7bm80/earring/b/p/e/pwetl349-05az-w-touchstone-original-imagynsksp5vhyfg.jpeg?q=70",
          },
          {
            name: "PANCHI LONG KUNDAN LONG EARRINGS SET IN LITE GOLD POLIS...",
            current_price: 360,
            link:
              "https://www.flipkart.com/knigght-angel-jewels-panchi-long-kundan-earrings-set-lite-gold-polish-metal-drops-danglers/p/itm0b3a0ad8b76d9",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/l3os4280/earring/8/y/u/na-er55-panchi-long-kundan-long-earrings-set-knigght-angel-original-imagerctdcgfemkd.jpeg?q=70",
          },
        ],
      },
      "Embellished Sandals": {
        searchLink:
          "https://www.flipkart.com/search?marketplace=FLIPKART&q=Embellished%20sandals%20for%20women,%20gold",
        topResults: [
          {
            name: "Women Gold Flats Sandal",
            current_price: 749,
            link:
              "https://www.flipkart.com/marc-loire-women-gold-flats/p/itm8087f04a02d8c",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kylvr0w0/sandal/r/i/v/8-ml000338-marc-loire-gold-original-imagassexehth5hh.jpeg?q=70",
          },
          {
            name: "Women Gold Casual Sandal",
            current_price: 735,
            link:
              "https://www.flipkart.com/marc-loire-women-gold-casual/p/itm6a993a5a55254",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/c/i/k/5-ml10010437-marc-loire-rose-gold-original-imaghnygbgnxqfbd.jpeg?q=70",
          },
          {
            name: "Women Gold Heels Sandal",
            current_price: 499,
            link:
              "https://www.flipkart.com/denill-women-gold-heels/p/itmf8y7yyn7zs8tq",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/y/u/z/-original-imagg5ubq8knsjnm.jpeg?q=70",
          },
          {
            name: "Women Gold Flats Sandal",
            current_price: 499,
            link:
              "https://www.flipkart.com/kliev-paris-women-gold-flats/p/itmc2b8d32558239",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/i/g/k/3-1003-golden-3-kliev-paris-golden-original-imagseky7kf5jkxd.jpeg?q=70",
          },
          {
            name: "Women Gold Flats Sandal",
            current_price: 499,
            link:
              "https://www.flipkart.com/strasse-paris-women-gold-flats/p/itmef31c84bfa55d",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/sandal/i/g/k/3-1003-golden-3-kliev-paris-golden-original-imagseky7kf5jkxd.jpeg?q=70",
          },
        ],
      },
      "Ethnic Clutch": {
        searchLink:
          "https://www.flipkart.com/search?marketplace=FLIPKART&q=Ethnic%20clutch,%20gold%20or%20silver",
        topResults: [
          {
            name: "Casual, Party, Formal, Sports Maroon  Clutch  - Regular...",
            current_price: 379,
            link:
              "https://www.flipkart.com/yessbenza-casual-party-formal-sports-maroon-clutch/p/itm83d9bdd1039b2",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kle24cw0/clutch/k/z/k/women-s-and-girls-handclutch-mobile-handbag-ykfc-105-503-ladies-original-imagyj26u4tg2qge.jpeg?q=70",
          },
          {
            name: "Casual Blue  Clutch",
            current_price: 419,
            link:
              "https://www.flipkart.com/gm-creations-casual-blue-clutch/p/itm3775802a30c78",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kx6fwcw0/clutch/m/i/v/cl-002b-002-clutch-gm-creations-original-imag9p7kxehz4yvy.jpeg?q=70",
          },
          {
            name: "Casual Silver  Clutch",
            current_price: 949,
            link:
              "https://www.flipkart.com/shakuntla-handicraft-casual-silver-clutch/p/itm96ab2cb33c6cb",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/clutch/s/p/p/women-girls-bridal-metal-sea-shell-clutch-party-sling-bag-ethnic-original-imagrrvhcr8zfkhg.jpeg?q=70",
          },
          {
            name: "Party Silver  Clutch",
            current_price: 599,
            link:
              "https://www.flipkart.com/nehd-party-silver-clutch/p/itm550ea5dd5468c",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/clutch/t/h/5/the-beautiful-women-s-handbag-silver-nehd0075-clutch-nehd-original-imaggugh37cx3nwf.jpeg?q=70",
          },
          {
            name: "Casual Silver  Clutch",
            current_price: 299,
            link:
              "https://www.flipkart.com/andaria-casual-silver-clutch/p/itm17d87ce22ee11",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/clutch/r/r/5/c131-c131-clutch-andaria-original-imagrbd7jrvfjyaa.jpeg?q=70",
          },
        ],
      },
      Mehndi: {
        searchLink:
          "https://www.flipkart.com/search?marketplace=FLIPKART&q=Intricate%20mehndi%20designs",
        topResults: [
          {
            name: "OZONE Ayurvedics Henna Conditioner - 100 g - Pack of 8",
            current_price: 359,
            link:
              "https://www.flipkart.com/ozone-ayurvedics-henna-conditioner-100-g-pack-8/p/itmf7a637db1c0b4",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/xif0q/conditioner/n/n/v/800-ayurvedics-henna-conditioner-100-g-pack-of-8-ozone-original-imagm6y27g4yjndd.jpeg?q=70",
          },
          {
            name: "IVANA'S Heena Mehandi Tatto Stencil Set for | Hand | Bo...",
            current_price: 259,
            link:
              "https://www.flipkart.com/ivana-s-heena-mehandi-tatto-stencil-set-hand-body-fingure-face-art-temporary-kids-girls-women-design-596/p/itm1b653d493abcb",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kqfj1jk0/tattoo/2/0/y/design-596-ivana-s-original-imag4gyj2thjhtjf.jpeg?q=70",
          },
          {
            name: "IVANA'S Henna Tattoo Stencil (Set of 2) Temporary (Desi...",
            current_price: 140,
            link:
              "https://www.flipkart.com/ivana-s-henna-tattoo-stencil-set-2-temporary-design-75/p/itmfhv3shnkfxgag",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/jxf05u80/tattoo/y/b/v/design-75-ivana-s-original-imafhuhtqxhmweht.jpeg?q=70",
          },
          {
            name: "IVANA'S Ivana's Stencil Premium Collection DIY Kit For ...",
            current_price: 140,
            link:
              "https://www.flipkart.com/ivana-s-stencil-premium-collection-diy-kit-hand-full-design-henna-tattoo-set-women-girls-kids-attractive-temporary-prh-49/p/itmbe4d6ce52c021",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/kr58yvk0/tattoo/s/g/n/prh-49-ivana-s-original-imag4zywghzyv2eh.jpeg?q=70",
          },
          {
            name: "IVANA'S Henna Tattoo Stencil Set for 2 Women Girls Hand...",
            current_price: 169,
            link:
              "https://www.flipkart.com/ivana-s-henna-tattoo-stencil-set-2-women-girls-hand-finger-body-paint-temporary-body-art/p/itmff2rkmn2gugz4",
            thumbnail:
              "https://rukminim2.flixcart.com/image/612/612/l19m93k0/tattoo/r/5/b/5-10-design-4-ivana-s-2-original-imagcvaqgh8z8xca.jpeg?q=70",
          },
        ],
      },
    },
  };

  return data;
}



export async function getFlipkartSearch(input) {
  const apiUrl =
    apiUrlBase + `flipkart_search?input=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
