import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import KnobbedThemeProvider from "@hig/storybook/storybook-support/decorators/KnobbedThemeProvider";
import Banner from "../index";
import Typography from "@hig/typography";
import Button from "@hig/button";
import { motion, AnimatePresence } from "framer-motion";

storiesOf("Motion|Banner", module).add("default", () =>
  React.createElement(() => {
    // const [isVisible, setVisible] = useState(true);

    // const handleClose = () => setVisible(false);
    // const handleShow = () => setVisible(true);

    const [isToggled, setToggle] = useState(true);

    const handleClose = () => setToggle(false);
    const handleOpen = () => setToggle(true);
    return (
      <KnobbedThemeProvider>
        <AnimatePresence>
          {isToggled && (
            <motion.div
              //EXPRESSIVE
              initial={{ opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
              exit={{ opacity: 0, y: -100 }}
              // MINIMAL
              // initial={{ opacity: 1 }}
              // animate={{ y: 0, opacity: 1 }}
              // exit={{ opacity: 0.3 }}
            >
              <Banner
                type="primary"
                // isVisible={isVisible}
                actions={({ isWrappingActions }) => (
                  <Banner.Interactions isWrappingActions={isWrappingActions}>
                    <Banner.Action>
                      <Button
                        type="secondary"
                        size="small"
                        width={isWrappingActions ? "grow" : "shrink"}
                        title="Accept"
                        onClick={handleClose}
                      />
                    </Banner.Action>
                    <Banner.Action>
                      <Button
                        type="secondary"
                        size="small"
                        width={isWrappingActions ? "grow" : "shrink"}
                        title="Reject"
                        onClick={handleClose}
                      />
                    </Banner.Action>
                  </Banner.Interactions>
                )}
              >
                Make sure you know these changes will effect your project status
              </Banner>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NO ANIMATION */}
        {/* {isToggled && (
          <Banner
            type="primary"
            // isVisible={isVisible}
            actions={({ isWrappingActions }) => (
              <Banner.Interactions isWrappingActions={isWrappingActions}>
                <Banner.Action>
                  <Button
                    type="secondary"
                    size="small"
                    width={isWrappingActions ? "grow" : "shrink"}
                    title="Accept"
                    onClick={handleClose}
                  />
                </Banner.Action>
                <Banner.Action>
                  <Button
                    type="secondary"
                    size="small"
                    width={isWrappingActions ? "grow" : "shrink"}
                    title="Reject"
                    onClick={handleClose}
                  />
                </Banner.Action>
              </Banner.Interactions>
            )}
          >
            Make sure you know these changes will effect your project status
          </Banner>
        )} */}
        <Button title="Open Banner" onClick={handleOpen} />
      </KnobbedThemeProvider>
    );
  })
);
