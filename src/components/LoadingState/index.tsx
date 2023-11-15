import { Flex, Spacer, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type LoadingStateProps = {
  phrases: string[];
};

export const LoadingState = ({ phrases }: LoadingStateProps) => {
  const [shownPhrase, setShownPhrase] = useState(phrases[0]);

  useEffect(() => {
    let index = 0;
    const switchPhrases = setInterval(() => {
      setShownPhrase(phrases[index]);

      if (index === phrases.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
    }, 1000);

    return () => clearInterval(switchPhrases);
  }, [phrases]);

  return (
    <Flex>
      <Spinner />
      <Spacer />
      {shownPhrase}
    </Flex>
  );
};
