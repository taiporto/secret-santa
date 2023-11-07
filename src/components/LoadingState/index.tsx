import { Flex, Spacer, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";

type LoadingStateProps = {
  phrases: string[];
};

export const LoadingState = ({ phrases }: LoadingStateProps) => {
  const [shownPhrase, setShownPhrase] = React.useState(phrases[0]);

  useEffect(() => {
    const switchPhrases = setInterval(() => {
      const index = Math.floor(Math.random() * phrases.length);
      setShownPhrase(phrases[index]);
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
