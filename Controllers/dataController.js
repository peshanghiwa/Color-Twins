const UserData = require("./../Models/userData");

exports.addData = (req, res) => {
  const userData = UserData.create(req.body)
    .then(response => {
      res.status(200).json({
        status: "successsssssssss",
        response
      });
    })
    .catch(err => {
      res.status(400).json({
        status: "fail",
        err: err.message
      });
    });
};

exports.updateUser = async (req, res) => {
  try {
    const updateUserData = await UserData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updateUserData
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err: err.message
    });
  }
};

exports.getData = async (req, res) => {
  let userData = UserData.find();

  try {
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      userData = userData.sort(sortBy);
    }

    if (req.query.mode == "easy") {
      userData.where("EasyMode.fullReport").gt(0);
    }

    if (req.query.mode == "hard") {
      userData.where("HardMode.fullReport").gt(0);
    }

    if (req.query.limit) {
      const limit = parseInt(req.query.limit, 10);
      userData.limit(limit);
    }

    userDataResult = await userData;
    res.status(200).json({
      status: "success",
      results: userDataResult.length,
      userDataResult
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err
    });
  }
};

exports.getDataCount = async (req, res) => {
  try {
    const count = await UserData.find().select(req.query.field);
    res.status(200).json({
      status: "success",
      count
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err
    });
  }
};

// exports.getData = async (req, res) => {
//   try {
//     const userData = await UserData.find();
//     res.status(200).json({
//       status: "success",
//       userData
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       err
//     });
//   }
// };

exports.getSpecificData = async (req, res) => {
  try {
    const userData = await UserData.findById(req.params.id);
    res.status(200).json({
      status: "success",
      userData
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err
    });
  }
};
