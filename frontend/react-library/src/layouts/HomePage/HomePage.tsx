import { Carousel } from "./components/Carousel";
import { ExploreBooks } from "./components/ExploreBooks";
import { Services } from "./components/Services";
import { SignUpOption } from "./components/SignUpOption";

export const HomePage = () => {
  return (
    <>
      <ExploreBooks />
      <Carousel />
      <SignUpOption />
      <Services />
    </>
  );
};
