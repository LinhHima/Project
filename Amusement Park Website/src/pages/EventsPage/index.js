import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Empty from "src/components/Empty";
import { useSelector } from "react-redux";
import EventDisplay from "src/components/EventDisplay";
import BookingAction from "src/pages/EventsPage/BookingAction";

const EventsPage = () => {
    const event = useSelector((state) => state.eventSliceV2.event);

    return (
        <Fragment>
            <Helmet>
                <title>Tinkerbell Garden - Events</title>
            </Helmet>
            <Box py={2}></Box>
            {!event ? (
                <Box py={3} textAlign="center">
                    <Empty color="black" />
                </Box>
            ) : (
                <EventDisplay>
                    <BookingAction />
                </EventDisplay>
            )}
            <Box py={2}></Box>
        </Fragment>
    );
};

export default EventsPage;
