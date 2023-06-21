import Grid from "@mui/material/Grid";
import { TrainingCard } from "entities/training/ui";
import { TrainingCardAdd } from "entities/training/ui/TrainingCard/TrainingCardAdd";
import { useAppSelector } from "shared/libs/redux";
const data = [
  {
    id: "asdasds",
    name: "testname",
    description: "testdesc",
    date: "",
    mentor: { fullName: "Тестовый Мегатест Мфывфапрфывпри" },
    participants: [
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "asdasasdasgsshsdasdas1dadkshs11d1",
      },
      { fullName: "Тестовый Мегатест Мфывфапрфыафвпри", username: "ssahj1" },
    ],
    linkMeet: "sad",
    linkTelegram: "sd",
    level: 1,
    group: "s",
  },
  {
    id: "asdasds",
    name: "testname2фывфывфы ывффффффывввфыв фывфывфывфывфыв adsdasasasas asdsdsdsd",
    description: "testdesc2",
    date: "",
    mentor: { fullName: "Тестовый Мегатест Мфывфапрфывпри" },
    participants: [
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "asdasdasdasdasdasdasdasdasdasd",
      },
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "asdaasdasdasdsdasdasdasdasdasdasdasdasd",
      },
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "asda123dasdasdasdasdasdasdasdasd",
      },
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "asasdh`1sdasdasdasdasdasdasdasdasd",
      },
      {
        fullName: "Тестовый Мегрфыафвпри",
        username: "ashjsdasdasdasdasd1dasdasd",
      },
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "as1da1sasdasg1dasdasdasda1sdasdassdadhsd",
      },
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "as1da1sasdasg1dasdasdasda1sdasdassdadhsd",
      },
      {
        fullName: "Тестовый Мегатест Мфывфапрфыафвпри",
        username: "as1da1sasdasg1dasdasdasda1sdasdassdadhsd",
      },
    ],
    maxParticipants: 1,
    linkMeet: "sad",
    linkTelegram: "sd",
    level: 1,
    group: "s",
  },
];
export const TrainingsGrid = () => {
  const user = useAppSelector((state) => state.user);
  return (
    <Grid justifyContent="center" container spacing={2}>
      {data &&
        data.map((training) => [
          <Grid key={training.id} item>
            <TrainingCard training={training as any} />
          </Grid>,
        ])}

      {(user.role === "SUPERVISOR" || user.role === "MENTOR") && (
        <Grid item>
          <TrainingCardAdd />
        </Grid>
      )}
    </Grid>
  );
};
