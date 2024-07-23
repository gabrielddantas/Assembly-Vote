import express, { Request, Response } from "express";
import cors from "cors";
import BodyParser from "body-parser";
import { getRandomInt } from "./random.service";
import { isValidCPF } from "./validate-cpf.service";

const Vote = {
  ableToVote: "ABLE_TO_VOTE",
  unableToVote: "UNABLE_TO_VOTE",
};

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.get("/api/cpf/valid/:cpf", (req: Request, res: Response) => {
  const { cpf } = req.params;
  console.log(cpf);

  if (!cpf || cpf === "" || cpf.length < 11) {
    return res.status(404).json({ status: Vote.unableToVote });
  }

  if (!isValidCPF(cpf)) {
    return res.status(404).json({ status: Vote.unableToVote });
  }

  let randomNumber = getRandomInt(0, 10);

  if (randomNumber < 3) {
    return res.status(404).json({ status: Vote.unableToVote });
  }

  return res.status(200).json({ status: Vote.ableToVote });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
