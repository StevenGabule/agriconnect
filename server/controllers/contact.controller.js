import Contact from '../models/contact.model';
export const createContactHandler = async (req, res) => {
  try {
    const { _id } = req.user;
    req.body.sendBy = _id;
    const createAccount = await Contact.create(req.body);
    return res.status(201).json(createAccount);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export const updateContactHandler = async (req, res) => {
  try {
    const { _id: receivedBy } = req.user;
    const { id } = req.params;
    const contact = await Contact.findOne({ receivedBy, _id: id });
    if (contact) {
      contact.readAt = Date.now();
      contact.status = true;
      await contact.save();
    }
    return res.status(201).json(contact);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export const getContactsHandler = async (req, res) => {
  try {
    const { _id: receivedBy } = req.user;
    const contacts = await Contact.find({ receivedBy }).populate('sendBy');
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};

export const getContactsAllHandler = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    return res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
};
