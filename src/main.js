import { StudyPlanner } from "./services/StudyPlanner.js";
import { StudyPlannerApp } from "./ui/StudyPlannerApp.js";

const planner = new StudyPlanner();
const app = new StudyPlannerApp(planner);

app.start();
