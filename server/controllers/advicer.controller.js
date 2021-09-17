import Adviser from '../models/adviser';

const getAdvisersByCat = async (req, res) => {
  try {
    const cat = parseInt(req.params.id);
    const advisers = await Adviser.find({ cat })
      .populate('postedBy', 'id name')
      .exec();
    res.status(200).json(advisers);
  } catch (e) {
    console.log(e.message);
    res.status(500).send(e.message);
  }
};

export { getAdvisersByCat };
