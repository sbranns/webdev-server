import EnrollmentsDao from "./dao";

export default function EnrollmentsRoutes(app, db) {
	const dao = EnrollmentsDao(db);

	const enrollIntoCourse = (req, res) => {
		const { uid, cid } = req.params;
		const newEnrollment = dao.enrollUserInCourse(uid, cid);
		res.json(newEnrollment);
	};

	const unenrollFromCourse = (req, res) => {
		const { uid, cid } = req.params;
		const enrollments = dao.unenrollUserFromCourse(uid, cid);
		res.json(enrollments);
	};

	const fetchAllEnrollments = (req, res) => {
		const enrollments = dao.fetchAllEnrollments();
		res.json(enrollments);
	};

	app.post("/api/users/:uid/courses/:cid", enrollIntoCourse);
	app.delete("/api/users/:uid/courses/:cid", unenrollFromCourse);
	app.get("/api/enrollments", fetchAllEnrollments);
}