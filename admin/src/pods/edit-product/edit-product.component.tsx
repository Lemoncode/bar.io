import { Button, Card, CardContent, CardHeader, MenuItem } from '@material-ui/core';
import { DropDownComponent, TextFieldComponent } from 'common/components';
import { Field, Form, Formik } from 'formik';
import React, { FunctionComponent } from 'react';
import { formValidation } from './edit-product.validation';
import { MenuCategory } from './menu-category.vm';
import { ProductPortionType } from './product-portion.vm';
import { Product } from './product.vm';

interface EditProductProps {
  categories: Array<MenuCategory>;
  portionTypes: Array<ProductPortionType>;
  product: Product;
  onSave: (product: Product) => void;
  onChangeName: (name: string) => void;
  onChangeDescription: (description: string) => void;
  onChangePortionPrice: (portionId: string, price: number) => void;
  onChangeCategory: (categoryId: string) => void;
  onChangePortionType: (portionTypeId: string) => void;
  onCancel: () => void;
}

export const EditProductComponent: FunctionComponent<EditProductProps> = (props) => {
  const {
    categories,
    portionTypes,
    product,
    onChangeName,
    onChangeDescription,
    onChangePortionPrice,
    onChangeCategory,
    onChangePortionType,
    onSave,
    onCancel,
  } = props;
  const handleChangeCategory = (e) => onChangeCategory(e.target.value);
  const handlePortionTypeChange = (e) => onChangePortionType(e.target.value);
  const handleChangeName = (e) => onChangeName(e.target.value);
  const handleChangeDescription = (e) => onChangeDescription(e.target.value);
  const handleChangePortionPrice = (e) =>
    onChangePortionPrice(e.target.getAttribute('name'), e.target.value);

  return (
    <Card>
      <CardHeader
        component='h1'
        title={!!product?.id ? `Editar '${product.name}'` : 'Añadir producto'}
      />
      <CardContent>
        <Formik
          enableReinitialize
          onSubmit={onSave}
          initialValues={product}
          validate={formValidation.validateForm}>
          {() => (
            <Form>
              <Field type='hidden' name='id' />
              <Field type='hidden' name='visible' />
              <TextFieldComponent name='name' label='Nombre' onKeyUp={handleChangeName} />
              <TextFieldComponent
                name='description'
                label='Descripción'
                onKeyUp={handleChangeDescription}
              />
              <DropDownComponent
                label='Categoría'
                labelId='categoryIdLabel'
                name='categoryId'
                onChange={handleChangeCategory}
                disabled={!!product?.id}
                value={!!categories && !!product.categoryId ? product.categoryId ?? '' : ''}>
                {categories.map((c) => (
                  <MenuItem key={`category-${c.id}`} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </DropDownComponent>
              <DropDownComponent
                label='Ración'
                labelId='portionTypeIdLabel'
                name='portionTypeId'
                onChange={handlePortionTypeChange}
                value={!!portionTypes && !!product.portionTypeId ? product.portionTypeId : ''}>
                {portionTypes?.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))}
              </DropDownComponent>
              {!!product.portions &&
                product.portions.map((p, index) => (
                  <TextFieldComponent
                    key={`portions[${index}].price`}
                    name={`portions[${index}].price`}
                    label={`Precio - ${p.name}`}
                    type='number'
                    inputProps={{ step: 0.01 }}
                    onKeyUp={handleChangePortionPrice}
                  />
                ))}
              <Button type='submit'>Guardar</Button>
              <Button type='button' onClick={onCancel}>
                Cancelar
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
