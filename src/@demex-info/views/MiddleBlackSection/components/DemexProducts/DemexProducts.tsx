import { Box, Button, Hidden, Theme, makeStyles } from "@material-ui/core";
import { ProductCarousel, ProductScroll, SlideCategory, SlideItem } from "./components";
import React, { useEffect } from "react";

import clsx from "clsx";
import { useInView } from "react-intersection-observer";

const DemexProducts: React.FC = () => {
  const classes = useStyles();

  const [slide, setSlide] = React.useState<SlideCategory | null>(null);

  const [liquidityRef, liquidityView] = useInView({
    threshold: 0.1,
  });
  const [stakingRef, stakingView] = useInView({
    threshold: 0.2,
  });
  const [insuranceRef, insuranceView] = useInView({
    threshold: 0.4,
  });

  const changeTab = (tab: SlideCategory | null) => {
    setSlide(tab);
    if (tab) {
      const slideItem = document.querySelector(`#${tab}`);
      slideItem?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (liquidityView && !insuranceView && !stakingView) {
      setSlide("liquidityPools");
      return;
    }
    if (stakingView && !insuranceView && !liquidityView) {
      setSlide("staking");
      return;
    }
    if (insuranceView && !liquidityView && !stakingView) {
      setSlide("insuranceFund");
      return;
    }
  }, [liquidityView, stakingView, insuranceView]);

  useEffect(() => {
    if (slide === "liquidityPools") {
      changeTab("liquidityPools");
      return;
    }
    if (slide === "staking") {
      changeTab("staking");
      return;
    }
    if (slide === "insuranceFund") {
      changeTab("insuranceFund");
      return;
    }
  }, [slide])

  const SlideTabs: SlideItem[] = [{
    label: "Liquidity Pools",
    value: "liquidityPools",
  }, {
    label: "Staking",
    value: "staking",
  }, {
    label: "Insurance Fund",
    value: "insuranceFund",
  }];

  return (
    <div className={classes.root}>
      <Box>
        <Hidden smDown>
          <div className={classes.buttonDiv}>
            {SlideTabs.map((slidetab: SlideItem) => (
              <Button
                key={slidetab.value}
                className={clsx(classes.tab, { selected: slide === slidetab.value })}
                variant="text"
                onClick={() => changeTab(slidetab.value)}
              >
                {slidetab.label}
              </Button>
            ))}
          </div>
        </Hidden>
        <Hidden smDown>
          <ProductCarousel
            liquidityRef={liquidityRef}
            stakingRef={stakingRef}
            insuranceRef={insuranceRef}
            liquidityView={liquidityView}
          />
        </Hidden>
        <Hidden mdUp>
          <ProductScroll />
        </Hidden>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  buttonDiv: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "center",
    zIndex: 40,
    width: "100%",
    padding: theme.spacing("8vh", 0, 1.25),
    position: "sticky",
    top: "4vh",
  },
  root: {
    maxWidth: "84rem",
    padding: theme.spacing(5, 2.5, 1.25),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(0, "auto"),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(5, 2.5, 9),
    },
  },
  tab: {
    ...theme.typography.button,
    color: theme.palette.text.secondary,
    fontSize: "1.5rem",
    marginLeft: theme.spacing(2.5),
    "&:first-child": {
      marginLeft: 0,
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.selected": {
      color: theme.palette.secondary.main,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.25rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1rem",
      lineHeight: 1.3,
      width: "calc(100% / 3)",
    },
  },
}));

export default DemexProducts;
