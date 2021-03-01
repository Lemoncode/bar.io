import {
  ProductPortion,
  ProductPortionType,
  ProductPortionTypeContext,
} from 'dals';
import { Types } from 'mongoose';

export const getProductPortionTypes = async (): Promise<
  Array<ProductPortionType>
> => ProductPortionTypeContext.find().lean();

export const getProductPortionTypeById = async (
  id: string
): Promise<ProductPortionType> => {
  if (!id) throw 'id cannot be empty';
  return await ProductPortionTypeContext.findById(id).lean();
};

export const saveProductPortionType = async (
  productPortionType: ProductPortionType
): Promise<void> => {
  if (!productPortionType)
    throw 'productPortionType cannot be null or undefined';
  if (!productPortionType._id)
    productPortionType._id = Types.ObjectId().toHexString();
  await ProductPortionTypeContext.findByIdAndUpdate(
    productPortionType._id,
    productPortionType,
    {
      new: true,
      upsert: true,
    }
  );
};

export const saveProductPortionTypes = async (
  productPortionTypes: Array<ProductPortionType>
) => {
  await ProductPortionTypeContext.deleteMany({});
  await ProductPortionTypeContext.insertMany(productPortionTypes);
};

export const saveProductPortion = async (
  productPortion: ProductPortion,
  productPortionTypeId?: string
): Promise<void> => {
  if (!productPortion) throw 'productPortioncannot be null or undefined';
  let result: ProductPortionType;
  if (!!productPortionTypeId) {
    if (!!productPortion._id) {
      await ProductPortionTypeContext.findOneAndUpdate(
        {
          _id: productPortionTypeId,
          portions: { $elemMatch: { _id: { $eq: productPortion._id } } },
        },
        {
          $set: {
            'portions.$': { ...productPortion, _id: productPortion._id },
          },
        },
        {
          new: true,
        }
      );
    } else {
      await ProductPortionTypeContext.findOneAndUpdate(
        { _id: productPortionTypeId },
        {
          $push: {
            portions: { ...productPortion, _id: productPortion._id },
          },
        },
        {
          new: true,
        }
      );
    }
  } else {
    await ProductPortionTypeContext.findOneAndUpdate(
      { portions: { $elemMatch: { _id: { $eq: productPortion._id } } } },
      {
        $set: {
          'portions.$': { ...productPortion, _id: productPortion._id },
        },
      },
      {
        new: true,
      }
    );
  }
};

export const deleteProductPortionType = async (id: string): Promise<void> => {
  if (!id) throw 'id cannot be empty';
  await ProductPortionTypeContext.findByIdAndDelete(id);
  await getProductPortionTypes();
};

export const deleteProductPortion = async (id: string): Promise<void> => {
  if (!id) throw 'id cannot be empty';
  const _id = Types.ObjectId(id).toHexString();
  await ProductPortionTypeContext.findOneAndUpdate(
    { portions: { $elemMatch: { _id: { $eq: { _id } } } } },
    {
      $pull: {
        portions: { _id: _id },
      },
    },
    {
      new: true,
    }
  );
};
