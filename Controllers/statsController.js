const gameStats = require("./../Models/gameStats");

exports.updateStat = async (req, res) => {
  try {
    const updateGameStats = await gameStats.findByIdAndUpdate(
      "5e87defaf4fc402260f42ce3",
      req.body,
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      updateGameStats
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err
    });
  }
};

exports.getStats = (req, res) => {
  gameStats
    .findById("5e87defaf4fc402260f42ce3")
    .then(response => {
      res.status(200).json({
        status: "success",
        response
      });
    })
    .catch(err => {
      console.log(err);
    });
};
