// components/RelatedResearchAccordion.tsx
import React, { useMemo } from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Grid, GridItem, Text, Spinner, Alert, AlertIcon, Stack, Heading, HStack, IconButton } from '@chakra-ui/react';
import { useRelatedResearch } from './hooks/use-releated-research';
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../components/styles.config';
import { FaArrowRight } from 'react-icons/fa';

interface RelatedResearchAccordionProps {
  backgroundColor: "primary" | "secondary"
}

export const RelatedResearchAccordion: React.FC<RelatedResearchAccordionProps> = ({ backgroundColor }) => {
  const { data, isLoading, isError } = useRelatedResearch();

  const _backgroundColor = useMemo(() => (
    backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
  ), [backgroundColor])

  if (isLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Alert status="error">
          <AlertIcon />
          There was an error fetching the data.
        </Alert>
      </Box>
    );
  }

  return (
    <Stack
      width="100%"
      backgroundColor={_backgroundColor}
      padding={COMPONENT_PADDING}
      alignItems="center"
    >
      <Stack
        width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
      >
        <Stack bgColor={WHITE} p={COMPONENT_PADDING}>
          <Accordion allowToggle display="flex" flexDir="column" gap={COMPONENT_PADDING} defaultIndex={0}>
            {data.map((categoryData) => (
              <AccordionItem key={categoryData.category} bgColor={PRIMARY_BG_COLOR}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Text fontSize="20px" fontWeight={700}>
                      {categoryData.category}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    {categoryData.items.map((item) => (
                      <GridItem key={item.id} borderWidth="1px" borderRadius="lg" p={4} bg={BLACK} color={WHITE}>
                        <HStack w="100%" justifyContent="space-between">
                          <Text fontSize="xl" fontWeight="bold">{item.title}</Text>
                          <IconButton
                            aria-label={`Click to learn about ${item.title}`}
                            icon={<FaArrowRight color={WHITE} />}
                            bgColor="transparent"
                            _hover={{
                              bgColor: "transparent"
                            }}
                          />
                        </HStack>
                        <Text mt={2}>{item.description}</Text>
                      </GridItem>
                    ))}
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
      </Stack>
    </Stack>
  );
};