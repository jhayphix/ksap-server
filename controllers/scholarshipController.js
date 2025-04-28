let scholarships = [
  { id: 1, title: "Scholarship One" },
  { id: 2, title: "Scholarship Two" },
  { id: 3, title: "Scholarship Three" },
];

// @desc   Get all scholarships
// @route  GET /api/scholarships
export const getScholarships = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(scholarships.slice(0, limit));
  }

  res.status(200).json(scholarships);
};

// @desc    Get single scholarship
// @route   GET /api/scholarships/:id
export const getScholarship = (req, res, next) => {
  const id = parseInt(req.params.id);
  const scholarship = scholarships.find((item) => item.id === id);

  if (!scholarship) {
    const error = new Error(`A scholarship with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(scholarship);
};

// @desc    Create new scholarship
// @route   POST /api/scholarships
export const createScholarship = (req, res, next) => {
  const newScholarship = {
    id: scholarships.length + 1,
    title: req.body.title,
  };

  if (!newScholarship.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  scholarships.push(newScholarship);
  res.status(201).json(scholarships);
};

// @desc    Update scholarship
// @route   PUT /api/scholarships/:id
export const updateScholarship = (req, res, next) => {
  const id = parseInt(req.params.id);
  const scholarship = scholarships.find((item) => item.id === id);

  if (!scholarship) {
    const error = new Error(`A scholarship with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  scholarship.title = req.body.title;
  res.status(200).json(scholarships);
};

// @desc    Delete scholarship
// @route   DELETE /api/scholarships/:id
export const deleteScholarship = (req, res, next) => {
  const id = parseInt(req.params.id);
  const scholarship = scholarships.find((item) => item.id === id);

  if (!scholarship) {
    const error = new Error(`A scholarship with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  scholarships = scholarships.filter((item) => item.id !== id);
  res.status(200).json(scholarships);
};
