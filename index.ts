import express from "express";
import cors from "cors";
import db from "./Kambaz/Database";
import UserRoutes from "./Kambaz/Users/routes";
import "dotenv/config";
import session, { type SessionOptions } from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes";
import ModuleRoutes from "./Kambaz/Modules/routes";
import AssignmentRoutes from "./Kambaz/Assignments/routes";
import EnrollmentsDao from "./Kambaz/Enrollments/dao";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes";
import Hello from "./Hello";
import Lab5 from "./Lab5";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  }),
);
const sessionOptions: SessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
Lab5(app);
UserRoutes(app, db);
CourseRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
EnrollmentsRoutes(app, db);
Hello(app);
app.listen(process.env.PORT || 4000);
