import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import ItemGame from "src/pages/admin/GamesManagement/ItemGame";
import Empty from "src/components/Empty";

const ListGame = ({ data }) => {
    return (
        <Box>
            <Grid container spacing={7} style={{ justifyContent: "center" }}>
                {data ? (
                    data.map((ele) => (
                        <Grid item xs={12} md={6} key={ele._id}>
                            <ItemGame data={ele} />
                        </Grid>
                    ))
                ) : (
                    <Box py={3} textAlign="center">
                        <Empty color="black" title="There is no games here" />
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default ListGame;
