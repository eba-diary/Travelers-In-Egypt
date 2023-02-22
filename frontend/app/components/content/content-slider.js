// Neil Morgan's (https://github.com/neil-morgan) Chakra Carousel
import {
    Stack,
    Flex,
    Box,
    VStack,
    useMediaQuery,
    // useColorModeValue,
    IconButton
} from "@chakra-ui/react";
import { IoTriangleSharp } from "react-icons/io5"
import {
    useCallback,
    useEffect,
    useState,
    useMemo,
    useRef,
    Children,
} from 'react';
import useBoundingRect from '../../lib/useBoundingRect';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { useRouter } from 'next/router';

const MotionFlex = motion(Flex)

const transitionProps = {
    stiffness: 400,
    type: "spring",
    damping: 60,
    mass: 3
};

// Replace color with paddingBg when dark mode is set up
// const paddingBg = useColorModeValue("#C58A22", "white");

export default function CardSlider({ children, gap }) {
    const [trackIsActive, setTrackIsActive] = useState(false);
    const [multiplier, setMultiplier] = useState(0.35);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [activeItem, setActiveItem] = useState(0);
    const [constraint, setConstraint] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

    const initSliderWidth = useCallback((width) => setSliderWidth(width), []);

    const positions = useMemo(
        () => Children.toArray(children).map((_, index) => -Math.abs((itemWidth + gap) * index)),
        [children, 
            itemWidth, gap]
    );
    const [isBetweenBaseAndMd] = useMediaQuery(
        `(min-width: 0em) and (max-width: 46.25em)`
    );

    const [isBetweenMdAndXl] = useMediaQuery(
        `(min-width: 46.25em) and (max-width: 78.125em)`
    );

    const [isGreaterThanXL] = useMediaQuery(`(min-width: 78.125em)`);

    useEffect(() => {
        if (isBetweenBaseAndMd) {
            setItemWidth(sliderWidth - gap);
            setMultiplier(0.65);
            setConstraint(1);
        }
        if (isBetweenMdAndXl) {
            setItemWidth(sliderWidth / 3 - gap);
            setMultiplier(0.5);
            setConstraint(3);
        }
        if (isGreaterThanXL) {
            setItemWidth(sliderWidth / 3 - gap);
            setMultiplier(0.35);
            setConstraint(3);
        }
    }, [isBetweenBaseAndMd, isBetweenMdAndXl, isGreaterThanXL, sliderWidth, gap]);
    const sliderProps = {
        setTrackIsActive,
        initSliderWidth,
        setActiveItem,
        activeItem,
        constraint,
        itemWidth,
        positions,
        gap
    };

    const trackProps = {
        setTrackIsActive,
        trackIsActive,
        setActiveItem,
        sliderWidth,
        activeItem,
        constraint,
        multiplier,
        itemWidth,
        positions,
        gap
    };

    const itemProps = {
        setTrackIsActive,
        trackIsActive,
        setActiveItem,
        activeItem,
        constraint,
        itemWidth,
        positions,
        gap
    };

    const router = useRouter()

    return (
        <Stack width='100%' alignItems='center' padding='60px 0px' gap='25px'>
            <Stack width='85%'>
                <Stack>
                    <Slider {...sliderProps}>
                        <Track {...trackProps}>
                            {Children.toArray(children).map((child, index) => (
                                <Item key={index} index={index} {...itemProps}>
                                    {child}
                                </Item>
                            ))}
                        </Track>
                    </Slider>
                </Stack>
            </Stack>
        </Stack>
    );
};

const Slider = ({
    setTrackIsActive,
    initSliderWidth,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    children,
    gap
}) => {
    const [ref, { width }] = useBoundingRect();


    useEffect(() => initSliderWidth(Math.round(width)), [
        width,
        initSliderWidth
    ]);

    const handleFocus = () => setTrackIsActive(true);

    useEffect(() => {
        const interval = setInterval(() => {
            handleIncrementClick()
        }, 20000)
        return () => clearInterval(interval)
    })

    const handleDecrementClick = () => {
        setTrackIsActive(true);
        if (activeItem === positions.length - positions.length) {
            setActiveItem(positions.length - constraint)
        } else {
            setActiveItem((prev) => prev - 1);
        }
    };

    const handleIncrementClick = () => {
        setTrackIsActive(true);
        if (activeItem >= positions.length - constraint) {
            setActiveItem(0)
        } else {
            setActiveItem((prev) => prev + 1)
        }
    };

    return (
        <>
        <Flex direction="row" 
            justifyContent="center" 
            rowGap='20px'
            columnGap='20px'
            width='100%' 
            marginTop='-85px'
            marginBottom='-25px'
            mx="auto"
        >
            <IconButton 
                aria-label='test'
                marginTop='95px' 
                transform='rotate(270deg)'
                icon={<IoTriangleSharp color="#C58A22"/>}
                borderRadius='full'
                border='5px solid' 
                borderColor='#C58A22'
                onClick={handleDecrementClick}
                onFocus={handleFocus}
            />
            <Box
                ref={ref}
                w={{ base: "100%", md: `calc(100% + ${gap}px)` }}
                ml={{ base: 0, md: `-${gap / 2}px` }}
                px={`${gap / 2}px`}
                position="relative"
                overflow="hidden"
                _before={{
                    bgGradient: "linear(to-r, base.d400, transparent)",
                    position: "absolute",
                    w: `${gap / 2}px`,
                    content: "''",
                    zIndex: 1,
                    h: "100%",
                    left: 0,
                    top: 0
                }}
                _after={{
                    bgGradient: "linear(to-l, base.d400, transparent)",
                    position: "absolute",
                    w: `${gap / 2}px`,
                    content: "''",
                    zIndex: 1,
                    h: "100%",
                    right: 0,
                    top: 0
                }}
            >
               
                {children}
                
            </Box>
            <IconButton 
                aria-label='test'
                marginTop='95px' 
                transform='rotate(90deg)'
                icon={<IoTriangleSharp color="#C58A22"/>}
                borderRadius='full'
                border='5px solid' 
                borderColor='#C58A22'
                onClick={handleDecrementClick}
                onFocus={handleFocus}
            />
        </Flex>
        </>
    );
};

const Track = ({
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
    children
}) => {
    const [dragStartPosition, setDragStartPosition] = useState(0);
    const controls = useAnimation();
    const x = useMotionValue(0);
    const node = useRef(null);

    const handleDragStart = () => setDragStartPosition(positions[activeItem]);

    const handleDragEnd = (_, info) => {
        const distance = info.offset.x;
        const velocity = info.velocity.x * multiplier;
        const direction = velocity < 0 || distance < 0 ? 1 : -1;

        const extrapolatedPosition =
            dragStartPosition +
            (direction === 1
                ? Math.min(velocity, distance)
                : Math.max(velocity, distance));

        const closestPosition = positions.reduce((prev, curr) => {
            return Math.abs(curr - extrapolatedPosition) <
                Math.abs(prev - extrapolatedPosition)
                ? curr
                : prev;
        }, 0);

        if (!(closestPosition < positions[positions.length - constraint])) {
            setActiveItem(positions.indexOf(closestPosition));
            controls.start({
                x: closestPosition,
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        } else {
            setActiveItem(positions.length - constraint);
            controls.start({
                x: positions[positions.length - constraint],
                transition: {
                    velocity: info.velocity.x,
                    ...transitionProps
                }
            });
        }
    };

    const handleResize = useCallback(
        () =>
            controls.start({
                x: positions[
                    activeItem >= positions.length - constraint ?
                        positions.length - constraint : activeItem
                ],
                transition: {
                    ...transitionProps
                }
            }),
        [activeItem, controls, positions]
    );

    const handleClick = useCallback(
        (event) => {
            if (node.current) {
                node.current.contains(event.target)
                    ? setTrackIsActive(true)
                    : setTrackIsActive(false)
            }
        },
        [setTrackIsActive]
    );

    const handleKeyDown = useCallback(
        (event) => {
            if (trackIsActive) {
                if (activeItem < positions.length - constraint) {
                    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                        event.preventDefault();
                        setActiveItem((prev) => prev + 1);
                    }
                }
                if (activeItem > positions.length - positions.length) {
                    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                        event.preventDefault();
                        setActiveItem((prev) => prev - 1);
                    }
                }
            }
        },
        [trackIsActive, setActiveItem, activeItem, constraint, positions.length]
    );

    useEffect(() => {
        handleResize()

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClick);
        };
    }, [handleClick, handleResize, handleKeyDown, positions]);

    return (
        <>
            {itemWidth && (
                <VStack ref={node} spacing={5} alignItems="stretch">
                    <MotionFlex
                        dragConstraints={node}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ x }}
                        drag="x"
                        _active={{ cursor: "grabbing" }}
                        minWidth="min-content"
                        flexWrap="nowrap"
                        cursor="grab"
                    >
                        {children}
                    </MotionFlex>
                </VStack>
            )}
        </>
    );
};

const Item = ({
    setTrackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    children,
    index,
    gap
}) => {
    const [userDidTab, setUserDidTab] = useState(false);

    const handleFocus = () => setTrackIsActive(true);

    const handleBlur = () => {
        userDidTab && index + 1 === positions.length && setTrackIsActive(false);
        setUserDidTab(false);
    };

    const handleKeyUp = (eventKey) =>
        eventKey === "Tab" &&
        !(activeItem === positions.length - constraint) &&
        setActiveItem(index);

    const handleKeyDown = (eventKey) => eventKey === "Tab" && setUserDidTab(true);

    return (
        <Flex
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={(event) => handleKeyUp(event.key)}
            onKeyDown={(event) => handleKeyDown(event.key)}
            w={`${itemWidth}px`}
            _notLast={{
                mr: `${gap}px`
            }}
            py="4px"
            justifyContent='center'
        >
            {children}
        </Flex>
    );
};