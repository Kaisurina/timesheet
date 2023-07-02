import { useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TrainingEdit,
  TrainingCard,
  TrainingView,
  TrainingCardAdd,
} from "entities/training/ui";
import { useGetTrainingsQuery } from "entities/training/api/trainingService";
import { useAppSelector } from "shared/libs/redux";
import { ITraining } from "entities/training/model";

export const TrainingsGrid = () => {
  const [cardTraining, setCardTraining] = useState<ITraining | null>(null);
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const { data, isLoading, isUninitialized, error } = useGetTrainingsQuery();

  const user = useAppSelector((state) => state.user);
  const handleEditOpen = (training: ITraining) => {
    setCardTraining(training);
    setEditModal(true);
  };
  const handleEditClose = () => {
    setEditModal(false);
  };
  const handleViewOpen = (training: ITraining) => {
    setCardTraining(training);
    setViewModal(true);
  };
  const handleViewClose = () => {
    setViewModal(false);
  };
  if (isLoading || isUninitialized) {
    return (
      <div>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "33%",
            left: "50%",
            ml: "-3rem",
            mt: "-3rem",
          }}
          size={"6rem"}
        />
      </div>
    );
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <>
      <Grid justifyContent="center" container spacing={2}>
        {data.map((training) => [
          <Grid key={training.trainingId} item>
            <TrainingCard
              handleEditOpen={handleEditOpen}
              handleViewOpen={handleViewOpen}
              training={training}
            />
          </Grid>,
        ])}
        {(user.role === "SUPERVISOR" || user.role === "MENTOR") && (
          <Grid item>
            <TrainingCardAdd />
          </Grid>
        )}
      </Grid>
      {cardTraining && (
        <>
          <TrainingEdit
            training={cardTraining}
            open={editModal}
            handleClose={handleEditClose}
          />
          <TrainingView
            training={cardTraining}
            open={viewModal}
            handleClose={handleViewClose}
          />
        </>
      )}
    </>
  );
};
