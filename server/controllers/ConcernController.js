import Concern from '../models/concerns';
import Adviser from '../models/adviser';

const create = async (req, res) => {
  try {
    if (req.file) {
      req.body.concern_file = req.file.filename;
    }

    if (
      typeof req.body.concern_file !== 'undefined' &&
      req.body.concern_file.length === 0
    ) {
      delete req.body.concern_file;
    }

    const concern = new Concern(req.body);
    concern.postedBy = req.user._id;
    concern.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send(err.message);
      }
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
  }
};

const index = async (_, res) => {
  try {
    const concerns = await Concern.find({})
      .populate('postedBy', '-password')
      .exec();
    return res.json(concerns);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};

const edit = async (req, res) => {
  try {
    const concern = await Concern.findById(req.params.id)
      .populate('postedBy', '-password')
      .exec();
    if (!concern) {
      return res.status(400).send('Concern information not found!');
    }
    return res.json(concern);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send('Something goes wrong!');
  }
};

const update = async (req, res) => {
  try {
    const updated = await Concern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();

    return res.json(updated);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send('Something goes wrong!');
  }
};

const destroy = async (req, res) => {
  try {
    const removeConcern = await Concern.findByIdAndDelete(req.params.id).exec();
    return res.json(removeConcern);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send('Something goes wrong!');
  }
};

const updateReAssign = async (req, res) => {
  try {
    const { adviserId, concernId } = req.params;
    const concern = await Concern.findByIdAndUpdate(
      concernId,
      { assignBy: adviserId },
      {
        new: true,
      }
    ).exec();
    return res.json(concern);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

const changeStatus = async (req, res) => {
  try {
    const { adviserId } = req.params;
    const adviser = await Adviser.findById(adviserId);
    adviser.adviser_status = !adviser.adviser_status;
    await adviser.save();
    return res.send(
      `Adviser account has been ${
        adviser.adviser_status ? 'activited!' : 'un-active'
      }`
    );
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export { index, create, edit, update, destroy, updateReAssign, changeStatus };
