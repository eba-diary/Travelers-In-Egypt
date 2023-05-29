import { Stack, HStack, Text, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useComponentHeight from "../../lib/hooks/useComponentHeight";
import { motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";

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
    const handleNextSlide = () => {
        setDirection('right');
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const handlePrevSlide = () => {
        setDirection('left');
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    const slides = data.fields.carouselCards.map((entry, index) => {
        return (
            <CarouselCard
                key={index}
                entry={entry}
                slideVariants={slideVariants}
                handleNextSlide={handleNextSlide}
                handlePrevSlide={handlePrevSlide}
                router={router}
                ref={ref}
            />
        )
    })

    return (
        <Stack width='100%' alignItems='center' position='relative'>
            <HStack borderBottom='15px solid #C58A22' width='100%' alignItems='flex-start'>
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
                    border='1px solid'
                >
                    <Text>Selection Tab</Text>
                    <Text>Selection Tab</Text>
                    <Text>Selection Tab</Text>
                    <Text>Selection Tab</Text>
                </Stack>
            </HStack>
        </Stack>
    )
}

function CarouselCard({
    entry,
    slideVariants,
    handleNextSlide,
    handlePrevSlide,
    router,
}) {
    const [ref, height] = useComponentHeight()

    return (
        <motion.div variants={slideVariants}>
            <Stack
                position='relative'
                height={height}
            >
                <HStack
                    width='100%'
                    position='absolute'
                    border='1px solid'
                    height={height}
                    justifyContent='space-between'
                    padding='10px'
                    zIndex={3}
                >
                    <Button onClick={handlePrevSlide}>&lt;</Button>
                    <Button onClick={handleNextSlide}>&gt;</Button>
                </HStack>
                <Stack>
                    <Image
                        ref={ref}
                        src={entry.image.src}
                        alt={entry.image.alt}
                        width='100%'
                        height='400px'
                        objectFit='cover'
                        position='absolute'
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
                    <HStack width='100%' justifyContent='space-between'>
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
}