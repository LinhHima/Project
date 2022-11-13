import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ItemImg from "src/pages/JoinPage/ItemImg";
import Empty from "src/components/Empty";

const ListImg = ({ data }) => {
    return (
        <Box>
            <Grid container spacing={7} style={{ justifyContent: "center" }}>
                {data ? (
                    data.map((ele, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <ItemImg data={ele} />
                        </Grid>
                    ))
                ) : (
                    <Empty color="black" />
                )}
            </Grid>
        </Box>
    );
};

export default ListImg;
