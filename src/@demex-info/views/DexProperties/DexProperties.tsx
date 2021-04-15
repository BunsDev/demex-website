import { HomeBorder1 as HomeBorder } from "@demex-info/assets/icons";
import { TypographyLabel, withLightTheme } from "@demex-info/components";
import { getDemexLink, Paths } from "@demex-info/constants";
import { RootState } from "@demex-info/store/types";
import { Box, Button, Grid, Hidden, makeStyles, Theme, Typography, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { PropertyBox } from "./components";
import { DexProp, dexPropsArr } from "./dexPropsConfig";

const DexProperties: React.FC = () => {
  const classes = useStyles();
  const widthSmall = useMediaQuery("@media (max-width: 1279px)");

  const network = useSelector((state: RootState) => state.app.network);

  const goToLink = (link: string) => {
    if (!link) return;
    window.open(link, "_blank");
  };

  const [sectionRef, sectionView] = useInView({
    threshold: 0.4,
    triggerOnce: true,
  });

  const handleResizeWindow = () => {
    const titleEl = document.querySelector("#dexTitleBox");
    const borderEl = document.querySelector(".homeBorder");
    if (borderEl) {
      if (window?.innerWidth > 1440) {
        if (titleEl && titleEl?.clientWidth >= 608) {
          borderEl.setAttribute("style", `width: ${titleEl?.clientWidth + 48}px`);
        } else {
          borderEl.setAttribute("style", `width: ${titleEl?.clientWidth}px`);
        }
      } else if (window?.innerWidth <= 1440 && window?.innerWidth >= 1280) {
        borderEl.setAttribute("style", `width: ${(window?.innerWidth / 2) - 10}px`);
      } else {
        borderEl.setAttribute("style", "width: unset");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  return (
    <div ref={sectionRef} className={classes.root}>
      <Box position="relative">
        <Box className={classes.innerDiv}>
          <Box id="dexTitleBox" className={classes.titleBox}>
            <Box className={clsx(classes.slide, "leftBox", { open: sectionView })}>
              <Typography variant="h3">
                A Derivatives DEX&nbsp;
                <Hidden mdDown>
                  <br />
                </Hidden>
                Built Right
              </Typography>
              <TypographyLabel color="textSecondary">
                Demex is powered by a layer 2 blockchain solution for&nbsp;
                <Hidden mdDown>
                  <br />
                </Hidden>
                an unrivalled trading experience.
              </TypographyLabel>
              <Button
                className={classes.tradeBtn}
                onClick={() => goToLink(getDemexLink(Paths.Trade, network))}
                color="secondary"
              >
                Start Trading
              </Button>
            </Box>
            <Hidden smDown>
              <HomeBorder
                className={clsx(classes.decoration, "homeBorder")}
                style={{
                  width: (widthSmall ? "unset" : 656),
                }}
              />
            </Hidden>
          </Box>
          <Box className={classes.infoBox}>
            <Grid className={clsx(classes.slide, "rightBox", { open: sectionView })} container>
              {
                dexPropsArr.map((dexProp: DexProp, index: number) => (
                  <Grid
                    key={dexProp.title}
                    item
                    className={clsx(classes.mobileGridItem,
                      classes.slide, {
                      [classes.gridItem]: !(index === dexPropsArr.length - 1 || index === dexPropsArr.length - 2),
                      [classes.oddItem]: index % 2 === 1,
                      [classes.evenItem]: index % 2 === 0,
                      rightFirst: !(index === dexPropsArr.length - 1 || index === dexPropsArr.length - 2),
                      rightSecond: (index === dexPropsArr.length - 1 || index === dexPropsArr.length - 2),
                      open: sectionView,
                    })}
                    xs={12}
                    sm={6}
                  >
                    <PropertyBox
                      index={index}
                      sectionView={sectionView}
                      {...dexProp}
                    />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  decoration: {
    position: "absolute",
    bottom: "2.25rem",
    right: 0,
  },
  evenItem: {
    paddingRight: theme.spacing(1.75),
    [theme.breakpoints.only("xs")]: {
      paddingRight: 0,
    },
  },
  gridItem: {
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
  infoBox: {
    backgroundColor: theme.palette.background.default,
    maxWidth: "calc(100% / 12 * 7)",
    minHeight: "100%",
    padding: theme.spacing(8, 0, 8, 6),
    width: "100%",
    zIndex: 10,
    [theme.breakpoints.only("lg")]: {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "calc((100% / 12) * 8)",
      padding: theme.spacing(5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(6, 4.5, 7),
      margin: theme.spacing(0, 5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(6, 4),
      margin: theme.spacing(0, 4),
    },
    "@media (max-width: 360px)": {
      margin: theme.spacing(0, 2.5),
      padding: theme.spacing(6, 2.5),
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "unset",
    },
  },
  innerDiv: {
    display: "flex",
    height: "100%",
    margin: theme.spacing(0, "auto"),
    maxWidth: "84rem",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      maxWidth: "100%",
    },
  },
  mobileGridItem: {
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(8),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
  oddItem: {
    paddingLeft: theme.spacing(1.75),
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: theme.spacing(8, 0),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  slide: {
    opacity: 0,
    transform: "translate(0px, 20px)",
    "&.leftBox": {
      transition: "opacity ease-in 0.3s, transform ease-in 0.4s",
    },
    "&.rightFirst": {
      transform: "translate(0px, 30px)",
      transition: "opacity ease-in 0.6s, transform ease-in 0.7s",
    },
    "&.rightSecond": {
      transform: "translate(0px, 30px)",
      transition: "opacity ease-in 1.1s, transform ease-in 1.2s",
    },
    "&.open": {
      opacity: 1,
      transform: "translate(0px,0px)",
    },
  },
  titleBox: {
    minHeight: "100%",
    maxWidth: "calc((100% / 12) * 5)",
    padding: theme.spacing(8, 6, 8, 0),
    position: "relative",
    width: "100%",
    "& h3": {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2),
      },
    },
    "& p": {
      ...theme.typography.subtitle1,
    },
    "@media (min-width: 1280px) and (max-width: 1440px)": {
      padding: theme.spacing(8, 6),
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "calc((100% / 12) * 4)",
      padding: theme.spacing(5),
    },
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(8, 5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(8, 4),
    },
    "@media (max-width: 360px)": {
      padding: theme.spacing(8, 2.5),
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
      width: "unset",
    },
  },
  tradeBtn: {
    ...theme.typography.button,
    marginTop: theme.spacing(6),
    padding: theme.spacing(1.75, 3.5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
}));

export default withLightTheme()(DexProperties);
