export function getCardDeck(fields) {
    return {
        type: 'card-deck',
        fields: {
            title: fields.title,
            cardBgColor: fields.cardBgColor,
            cardBorderColor: fields.cardBorderColor,
            cardBoxShadowColor: fields.cardBoxShadowColor,
            cardTitleFontColor: fields.cardTitleFontColor,
            bgGradientColor1: fields.bgGradientColor1,
            bgGradientColor2: fields.bgGradientColor2,
            sliderCards: fields.sliderCards.map((entry) => {
                return {
                    title: entry.fields.title,
                    description: entry.fields.description,
                    url: entry.fields.url,
                    image: {
                        src: 'https:' + entry.fields.image.fields.image.fields.file.url,
                        alt: entry.fields.image.fields.alt
                    }
                }
            })
        }
    }
}