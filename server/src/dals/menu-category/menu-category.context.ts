import { Document, model, mongo, Schema } from 'mongoose';
import { MenuCategory } from 'dals';

const portionSchema = new Schema({
  price: { type: Schema.Types.Number, required: true },
});

const productSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  visible: { type: Schema.Types.Boolean, required: true },
  description: { type: Schema.Types.String },
  portionTypeId: { type: Schema.Types.ObjectId, required: true },
  portions: [portionSchema], 
});

const menuCategorySchema = new Schema({  
  name: { type: Schema.Types.String, required: true },
  products: [productSchema],
});

export const menuCategoryContext = model<MenuCategory & Document>(
  'MenuCategory',
  menuCategorySchema
);
