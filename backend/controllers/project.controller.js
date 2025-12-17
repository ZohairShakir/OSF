import Project from "../models/Project.js";

export const submitProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({
    message: "Project request submitted",
    data: project
  });
};
