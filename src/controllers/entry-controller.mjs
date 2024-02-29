import {
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  // Destruct properties from req.body to separate variables,
  // convert property names with underscores to camelCase variable names
  const userId = req.user.user_id;
  const {
    entry_date: entryDate,
    mood,
    weight,
    sleep_hours: sleepHours,
    notes,
  } = req.body;
  if (entryDate && (weight || mood || sleepHours || notes) && userId) {
    const result = await addEntry(req.body);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const entryId = req.params.id;
  // Destruct properties from req.body to separate variables,
  // convert property names with underscores to camelCase variable names
  const {
    entry_date: entryDate,
    mood,
    weight,
    sleep_hours: sleepHours,
    notes,
  } = req.body;
  // check that all needed fields are included in request
  if ((entryDate || weight || mood || sleepHours || notes) && entryId) {
    const result = await updateEntryById({entry_id: entryId, ...req.body});
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.status(201).json(result);
  } else {
    return res.status(400).json({error: 400, message: 'bad request'});
  }
};

const deleteEntry = async (req, res) => {
  const result = await deleteEntryById(req.params.id);
  if (result.error) {
    return res.status(result.error).json(result);
  }
  return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
