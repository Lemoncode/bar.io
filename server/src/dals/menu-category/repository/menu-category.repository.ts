import { MenuCategory, menuCategoryContext, Product } from 'dals';
import { mongo, UpdateQuery, Types } from 'mongoose';

export const getMenuCategories = async (): Promise<Array<MenuCategory>> =>
  await menuCategoryContext.find().lean();

export const getMenuCategoryById = async (
  id: string
): Promise<MenuCategory> => {
  if (!id) throw 'id cannot be empty';
  return await menuCategoryContext.findById(id).lean();
};

export const getMenuCategoryByProductId = async (
  productId: string
): Promise<MenuCategory> => {
  if (!productId) throw 'productId cannot be empty';
  return await menuCategoryContext
    .findOne({
      products: { $elemMatch: { _id: { $eq: productId } } },
    })
    .lean();
};

export const saveMenuCategory = async (
  menuCategory: MenuCategory
): Promise<void> => {
  if (!menuCategory) throw 'menuCategory cannot be null or undefined';
  if (!menuCategory._id) menuCategory._id = Types.ObjectId();
console.log(menuCategory._id );
  await menuCategoryContext.findByIdAndUpdate(menuCategory._id, menuCategory, {
    new: true,
    upsert: true,
  });
};

export const saveMenuCategories = async (
  menuCategories: MenuCategory[]
): Promise<void> => {
  await menuCategoryContext.deleteMany({});
  await menuCategoryContext.insertMany(menuCategories);
};

export const deleteMenuCategory = async (id: string): Promise<void> => {
  if (!id) throw 'id cannot be empty';
  await menuCategoryContext.findByIdAndDelete(id);
  await getMenuCategories();
};

export const getProductById = async (id: string): Promise<Product> => {
  if (!id) throw 'id cannot be empty';
  const result: MenuCategory = await menuCategoryContext
    .findOne(
      { products: { $elemMatch: { _id: { $eq: id } } } },
      { products: { $elemMatch: { _id: { $eq: id } } } }
    )
    .lean();

  return !!result ? result.products[0] : null;
};

export const saveProduct = async (
  product: Product,
  categoryId?: string
): Promise<void> => {
  if (!product) throw 'product cannot be null or undefined';
  if (!!categoryId) {
    if (!!product._id) {
      await menuCategoryContext.findOneAndUpdate(
        {
          _id: categoryId,
          products: { $elemMatch: { _id: { $eq: product._id } } },
        },
        {
          $set: {
            'products.$': { ...product, _id: product._id },
          },
        },
        {
          new: true,
        }
      );
    } else {
      product._id = Types.ObjectId();
      await menuCategoryContext.findByIdAndUpdate(
        categoryId,
        {
          $push: {
            products: { ...product },
          },
        },
        {
          new: true,
        }
      );
    }
  } else {
    await menuCategoryContext.findOneAndUpdate(
      { products: { $elemMatch: { _id: { $eq: product._id } } } },
      {
        $set: {
          'products.$': { ...product, _id: product._id },
        },
      },
      {
        new: true,
      }
    );
  }
};

export const saveProducts = async (
  categoryId: string,
  products: Array<Product>
): Promise<void> => {
  if (!categoryId) throw 'categoryId cannot be empty';
  if (!products) throw 'products cannot be null or undefined';
  const updatedProducts = products.map((p) => ({ ...p, _id: p._id }));
  await menuCategoryContext.findOneAndUpdate(
    {
      _id: categoryId,
    },
    {
      $set: {
        products: [...updatedProducts],
      },
    },
    {
      new: true,
    }
  );
};

export const deleteProduct = async (id: string): Promise<void> => {
  if (!id) throw 'id cannot be empty';
  const result = await menuCategoryContext.findOneAndUpdate(
    { products: { $elemMatch: { _id: { $eq: id } } } },
    {
      $pull: {
        products: { _id: { $eq: id } },
      },
    } as UpdateQuery<MenuCategory & Document>,
    {
      new: true,
    }
  );
};

export const removeProductPortionFromProducts = async (
  productPortionId: string
): Promise<void> => {
  const result = await menuCategoryContext.updateMany(
    {
      products: {
        $elemMatch: {
          portions: { $elemMatch: { _id: { $eq: productPortionId } } },
        },
      },
    },
    {
      $pull: {
        'products.$.portions': { _id: productPortionId },
      },
    }
  );
};

export const removeProductPortionTypeFromProducts = async (
  productPortionTypeId: string
): Promise<void> => {
  const result = await menuCategoryContext.updateMany(
    {
      products: {
        $elemMatch: {
          portionTypeId: { $eq: productPortionTypeId },
        },
      },
    },
    {
      $set: {
        'products.$.portionTypeId': null,
        'products.$.portions': [],
      },
    }
  );
};
