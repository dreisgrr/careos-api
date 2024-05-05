import ContactForm from "../models/ContactForm.js";

export const submitContactForm = async (req, res, next) => {
  const newContactForm = new ContactForm(req.body);
  try {
    const savedForm = await newContactForm.save();
    res.status(200).json(savedForm);
  } catch (err) {
    next(err);
  }
};
