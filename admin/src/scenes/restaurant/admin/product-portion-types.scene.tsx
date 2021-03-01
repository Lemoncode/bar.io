import React, { FC } from 'react';
import { CenteredLayout } from 'layouts';
import { ProductPortionTypesContainer } from 'pods/product-portion-types';

export const ProductPortionTypesScene: FC = () => {
  return (
    <>
      <CenteredLayout>
        <ProductPortionTypesContainer />
      </CenteredLayout>
    </>
  );
};
