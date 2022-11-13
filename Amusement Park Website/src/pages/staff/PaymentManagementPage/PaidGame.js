import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import GameItem from "src/pages/staff/PaymentManagementPage/GameItem";
import Empty from "src/components/Empty";

const PaidGame = () => {
    const imgGameData = useSelector((state) => state.gameSlice.data);
    var imgPaidGame = imgGameData
        .filter((ele) => {
            return ele.type == 2;
        })
        .map((ele) => {
            return {
                url: ele.image.url,
                title: ele.name,
                description: ele.description,
                type: ele.type,
                price: ele.price,
                id: ele._id,
            };
        });
    return (
        <Fragment>
            {imgPaidGame.length > 0 ? (
                imgPaidGame.map((game, index) => (
                    <Box key={index}>
                        <Box py={1}></Box>
                        <GameItem data={game} />
                        <Box py={1}></Box>
                    </Box>
                ))
            ) : (
                <Box py={3} textAlign="center">
                    <Empty color="green" text="There is no Paid Game available now!!" />
                </Box>
            )}
        </Fragment>
    );
};

export default PaidGame;
