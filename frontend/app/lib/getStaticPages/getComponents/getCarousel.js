export function getCarousel(fields) {
    return {
        type: 'carousel',
        fields: {
            bottomBorderColor: fields.bottomBorderColor,
            selectedCardColor: fields.selectedCardColor,
            unselectedCardColor: fields.unselectedCardColor,
            hoverCardColor: fields.hoverCardColor,
            title: fields.title,
            carouselCards: fields.carouselCards.map((entry) => {
                return {
                    title: entry.fields.title,
                    description: entry.fields.description,
                    button: { ...entry.fields.button.fields },
                    image: {
                        src: 'https:' + entry.fields.image.fields.image.fields.file.url,
                        alt: entry.fields.image.fields.alt
                    }
                }
            })
        }
    }
}