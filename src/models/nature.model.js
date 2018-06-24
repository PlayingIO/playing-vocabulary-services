import { plugins } from 'mostly-feathers-mongoose';

const options = {
  timestamps: true
};

/**
 * Nature vocabularies
 */
const fields = {
  id: { type: String, unique: true, required: true  },
  label: { type: String, required: true  },
  value: { type: String }, // optional value
  obsolete: { type: Boolean, default: false }
};

export default function model (app, name) {
  const mongoose = app.get('mongoose');
  const schema = new mongoose.Schema(fields, options);
  schema.plugin(plugins.softDelete);
  schema.plugin(plugins.sortable, { classify: 'parent', delete: 'destroyedAt' });
  return mongoose.model(name, schema);
}

model.schema = fields;