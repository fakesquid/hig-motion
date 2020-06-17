import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import KnobbedThemeProvider from "@hig/storybook/storybook-support/decorators/KnobbedThemeProvider";
import Modal from "../index";
import Typography from "@hig/typography";
import Button from "@hig/button";
import { motion, AnimatePresence } from "framer-motion";

storiesOf("Motion|Modal", module).add("default", () =>
  React.createElement(() => {
    // const [open, setShow] = useState(true);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [isToggled, setToggle] = useState(true);

    const handleClose = () => setToggle(false);
    const handleOpen = () => setToggle(true);

    return (
      <KnobbedThemeProvider>
        <Button title="Open Modal" onClick={handleOpen} />
        <AnimatePresence>
          {isToggled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: "fixed",
                top: "30px",
                //left 50 transform -50 will center it
                left: "50%",
                transform: "translate3d(-50%, 0, 0)",
              }}
            >
              <motion.div
                //EXPRESSIVE
                animate={{
                  y: 20,
                  transition: { duration: 0.2, type: "tween" },
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { duration: 0.1 },
                }}
                //MINIMAL
                // initial={{ scale: 0.98 }}
                // animate={{ scale: 1 }}
                // exit={{
                //   opacity: 0,
                //   transition: { duration: 0.1 },
                // }}
              >
                <Modal
                  title="Motion Modal"
                  open={open}
                  onCloseClick={handleClose}
                >
                  <Typography>This action is irreversible.</Typography>
                </Modal>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NO ANIMATION */}
        {/* {isToggled && (
          <Modal title="Motion Modal" open={open} onCloseClick={handleClose}>
            <Typography>This action is irreversible.</Typography>
          </Modal>
        )} */}
      </KnobbedThemeProvider>
    );
  })
);
