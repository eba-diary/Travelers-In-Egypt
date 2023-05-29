import { Stack, HStack, Text, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useComponentHeight from "../../lib/hooks/useComponentHeight";
import { motion } from "framer-motion";
import { forwardRef, useState } from "react";

export default function Carousel({ data }) {
    const router = useRouter()
    const MotionStack = motion(Stack)

    const [ref, height] = useComponentHeight()

    const [currentSlide, setCurrentSlide] = useState(0)
    const [direction, setDirection] = useState('right')

    const slideVariants = {
        hidden: { x: direction === 'right' ? '15%' : '-15%', opacity: 0, transition: { type: "tween" } },
        visible: { x: '0%', opacity: 1, transition: { type: "tween" } },
        exit: { x: direction === 'right' ? '-15%' : '15%', opacity: 0, transition: { type: "tween" } },
    };

    const totalSlides = data.fields.carouselCards.length
    const handleNextSlide = (index) => {
        setDirection('right');
        if (isNaN(index)) {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
        } else {
            setCurrentSlide(index)
        }
    };

    const handlePrevSlide = () => {
        setDirection('left');
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const slides = data.fields.carouselCards.map((entry, index) => {
        return (
            <CarouselCard
                key={index}
                ref={ref}
                entry={entry}
                slideVariants={slideVariants}
                handleNextSlide={handleNextSlide}
                handlePrevSlide={handlePrevSlide}
                router={router}
                height={height}
            />
        )
    })

    return (
        <Stack width='100%' alignItems='center' position='relative'>
            <HStack
                borderBottom='15px solid #C58A22'
                width='100%'
                alignItems='flex-start'
                spacing='0px'
            >
                <MotionStack
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={slideVariants}
                    width="100%"
                    height="100%"
                    overflow="hidden"
                    flex={4}
                >
                    {slides[currentSlide]}
                </MotionStack>
                <Stack
                    flex={1}
                    height={height}
                    spacing='0px'
                    zIndex={1}
                >
                    {data.fields.carouselCards.map((entry, index) => (
                        <Stack
                            key={index}
                            height={height / totalSlides}
                            padding='10px'
                            tabIndex={4}
                            borderBottom='1px'
                            backgroundColor={currentSlide == index ? '#c58922' : '#f8c66c'}
                            onClick={() => {
                                handleNextSlide(index)
                            }}
                            _hover={{
                                cursor: 'pointer',
                                transition: '0.3s',
                                backgroundColor: currentSlide !== index ? '#deab52' : ''
                            }}
                        >
                            <Text
                                fontSize={{ base: '14px' }}
                                fontWeight={700}
                            >
                                {entry.title}
                            </Text>
                            <Text
                                fontSize={{ base: '14px' }}
                                fontWeight={400}
                                noOfLines={2}
                            >
                                {entry.description}
                            </Text>
                        </Stack>
                    ))}
                </Stack>
            </HStack>
        </Stack>
    )
}

const CarouselCard = forwardRef((
    {
        entry,
        slideVariants,
        handleNextSlide,
        handlePrevSlide,
        router,
        height
    },
    ref
) => {
    return (
        <motion.div variants={slideVariants}>
            <Stack
                position='relative'
                height={height}
                border='1px solid #c58922'
            >
                <Stack>
                    <Image
                        ref={ref}
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width='100%'
                        height='400px'
                        objectFit='fill'
                        position='absolute'
                        top={0}
                    />
                    <Stack
                        position="absolute"
                        width="100%"
                        height={`calc(${height}px - 8px)`}
                        backgroundImage="linear-gradient(180deg, rgba(240,240,240,0) 55%, rgba(20,20,20,0.95) 75%)"
                    />
                </Stack>
                <Stack
                    zIndex={1}
                    height='100%'
                    color='#f2f2f2'
                    justifyContent='flex-end'
                    padding='10px'

                >
                    <HStack
                        width={{ base: '96%', lg: '98%' }}
                        position='absolute'
                        height='fit-content'
                        bottom='50%'
                        justifyContent='space-between'
                        color='#000'
                    >
                        <Button onClick={handlePrevSlide}>&lt;</Button>
                        <Button onClick={handleNextSlide}>&gt;</Button>
                    </HStack>
                    <HStack width='100%' justifyContent='space-between' padding='10px'>
                        <Stack>
                            <Text>
                                {entry.title}
                            </Text>
                            <Text>
                                {entry.description}
                            </Text>
                        </Stack>
                        <Stack>
                            <Button
                                color='#2f2f2f'
                                onClick={() => {
                                    router.push(entry.button.url)
                                }}
                            >
                                {entry.button.title}
                            </Button>
                        </Stack>
                    </HStack>
                </Stack>
            </Stack>
        </motion.div>
    )
})

CarouselCard.displayName = 'CarouselCard'