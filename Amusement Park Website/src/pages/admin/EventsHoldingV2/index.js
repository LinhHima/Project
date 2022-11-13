import React, { Fragment } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import tinkerLogo from "src/assets/images/logos/Tinkerbellgarden.png";
import EventOccuringDisplay from "./EventsOccuring/EventOccuringDisplay";
import { styled } from "@mui/system";
import EventManagement from "src/pages/admin/EventsHoldingV2/EventManagement";
import CreateEventButton from "./CreateEventButton";
import { useSelector } from "react-redux";
import { selectAllEvent, selectRunningEvent } from "src/redux/slices/eventSliceV2";

const CustomClass = styled(Box)((theme) => ({
    ".titleEventOccuring": {
        textAlign: "center",
        fontWeight: "bolder",
        fontSize: "larger",
        marginBottom: "10px",
    },
}));

const EventsHoldingV2 = () => {
    const allEvent = useSelector((state) => selectAllEvent(state));
    const runningEvent = useSelector((state) => selectRunningEvent(state));

    return (
        <CustomClass>
            {runningEvent && (
                <Fragment>
                    <Typography className={"titleEventOccuring"}>Ocurring Events</Typography>
                    {runningEvent.map((event) => (
                        <Box key={event._id}>
                            <EventOccuringDisplay event={event} />
                            <Box py={1}></Box>
                        </Box>
                    ))}
                </Fragment>
            )}
            <Box py={1}></Box>
            <Typography className={"titleEventOccuring"}>Event Management</Typography>
            <CreateEventButton />
            <Box py={1}></Box>
            <Grid container spacing={3}>
                {allEvent.map((event) => (
                    <Grid item key={event._id} xs={12} md={6}>
                        <EventManagement event={event} />
                    </Grid>
                ))}
            </Grid>
        </CustomClass>
    );
};

export default EventsHoldingV2;
