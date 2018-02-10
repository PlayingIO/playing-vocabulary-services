import timestamps from 'mongoose-timestamp';
import { plugins } from 'mostly-feathers-mongoose';

const fields = {
  id: { type: String, unique: true, required: true  },
  label_en: { type: String, required: true  },
  label_zh: { type: String, required: true  },
  value: { type: String }, // optional value
  obsolete: { type: Boolean, default: false },
  parent: { type: String, default: null }
};

export default function model (app, name) {
  const mongoose = app.get('mongoose');
  const schema = new mongoose.Schema(fields);
  schema.plugin(timestamps);
  schema.plugin(plugins.softDelete);
  schema.plugin(plugins.sortable, { classify: 'parent' });
  return mongoose.model(name, schema);
}

model.schema = fields;