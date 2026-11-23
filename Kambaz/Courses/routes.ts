import CoursesDao from "./dao";
import enrollmentsDao from "../Enrollments/dao";
import EnrollmentsDao from "../Enrollments/dao";

export default function CourseRoutes(app, db) {
  const Courses_dao = CoursesDao(db);
  const enrollments_dao = EnrollmentsDao(db);
  const findAllCourses = (req, res) => {
    res.json(Courses_dao.findAllCourses());
  };
  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    res.json(Courses_dao.findCoursesForEnrolledUser(userId));
  };
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = Courses_dao.createCourse(req.body);
    enrollments_dao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    Courses_dao.deleteCourse(courseId);
    res.sendStatus(200);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const status = Courses_dao.updateCourse(courseId, req.body);
    res.json(status);
  };
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
}
